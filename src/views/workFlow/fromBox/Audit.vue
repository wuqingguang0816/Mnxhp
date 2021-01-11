<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main nohead">
      <div class="btns">
        <el-button type="primary" v-if="setting.isAudit" @click="audit()">通 过
        </el-button>
        <el-button type="danger" v-if="setting.isAudit" @click="reject()">拒 绝
        </el-button>
        <el-button type="danger" v-if="setting.isSelf && setting.status == 1" @click="revoke()">撤 回
        </el-button>
        <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
      </div>
      <div class="approve-result" v-if="setting.showStatus && activeTab==='0'">
        <div class="approve-result-img" :class=" flowTaskInfo.status |flowStatus()"></div>
      </div>
      <el-tabs class="JNPF-el_tabs" v-model="activeTab">
        <el-tab-pane label="流程表单">
          <component :is="currentView" @close="goBack" ref="form" />
        </el-tab-pane>
        <el-tab-pane label="流程视图">
          <Process :conf="flowTemplateJson" :thisStepId="thisStepId"
            v-if="flowTemplateJson.childNode" />
        </el-tab-pane>
        <el-tab-pane label="审批记录">
          <recordList :list='flowTaskOperatorRecordList' :endTime='endTime' />
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="审批通过" :close-on-click-modal="false" :visible.sync="visible"
        class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width='450px'>
        <el-radio-group v-model="handleType" @change="radioChange">
          <el-radio :label="1" class="radio-audit">审核结束</el-radio>
          <el-radio :label="0" class="radio-audit">
            <JNPF-TreeSelect :options="treeData" v-model="handleId" placeholder="选择下一审批人" lastLevel
              lastLevelKey='type' lastLevelValue='user' :disabled="handleType!=0"></JNPF-TreeSelect>
          </el-radio>
        </el-radio-group>
        <el-input v-model="reason" placeholder="请输入审批意见（选填）" type="textarea" :rows="4" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
          <el-button type="primary" @click="dataFormSubmit()">{{$t('common.confirmButton')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
import { FlowBeforeInfo, Audit, Reject } from '@/api/workFlow/FlowBefore'
import { Revoke } from '@/api/workFlow/FlowLaunch'
import recordList from './RecordList'
import Process from '@/components/Process/Preview'
export default {
  components: { recordList, Process },
  data() {
    return {
      currentView: '',
      setting: {},
      flowFormInfo: {},
      flowTaskInfo: {},
      flowTaskNodeList: [],
      flowTemplateJson: {},
      flowTaskOperatorList: [],
      flowTaskOperatorRecordList: [],
      freeApprover: 0,
      endTime: 0,
      visible: false,
      reason: '',
      handleType: 1,
      handleId: '',
      treeData: [],
      firstTest: true,
      fullName: '',
      thisStepId: '',
      activeTab: '0'
    }
  },
  methods: {
    goBack(isRefresh) {
      this.$emit('close', isRefresh)
    },
    init(data) {
      this.activeTab = '0'
      if (data.formType == 1) {
        this.currentView = (resolve) => require([`@/views/workFlow/workFlowForm/${data.enCode}`], resolve)
      } else {
        this.currentView = (resolve) => require([`@/views/workFlow/workFlowForm/dynamicForm`], resolve)
      }
      this.setting = data
      this.getInfo(data)
    },
    getInfo(data) {
      FlowBeforeInfo(data.id).then(res => {
        this.flowFormInfo = res.data.flowFormInfo
        this.flowTaskInfo = res.data.flowTaskInfo
        this.flowTaskNodeList = res.data.flowTaskNodeList
        this.flowTemplateJson = this.flowTaskInfo.flowTemplateJson ? JSON.parse(this.flowTaskInfo.flowTemplateJson) : null
        this.flowTaskOperatorList = res.data.flowTaskOperatorList
        this.flowTaskOperatorRecordList = res.data.flowTaskOperatorRecordList
        this.fullName = this.flowTaskInfo.flowName
        this.thisStepId = this.flowTaskInfo.thisStepId
        this.freeApprover = res.data.freeApprover || 0
        this.endTime = this.flowTaskInfo.completion == 100 ? this.flowTaskInfo.endTime : 0
        data.formConf = res.data.flowFormInfo
        data.formOperates = res.data.formOperates
        if (this.thisStepId && this.flowTaskNodeList.length) {
          for (let i = 0; i < this.flowTaskNodeList.length; i++) {
            const nodeItem = this.flowTaskNodeList[i]
            const loop = data => {
              if (Array.isArray(data)) data.forEach(d => loop(d))
              if (data.nodeId === nodeItem.nodeCode) {
                if (nodeItem.completion) data.state = 'state-past'
                data.content = nodeItem.userName
                return
              }
              if (data.conditionNodes && Array.isArray(data.conditionNodes)) loop(data.conditionNodes)
              if (data.childNode) loop(data.childNode)
            }
            loop(this.flowTemplateJson)
          }
        }
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.form && this.$refs.form.init(data)
          })
        }, 100)
      })
    },
    audit() {
      if (this.freeApprover == 0) {
        this.$prompt('', "审批通过", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: '请输入审批意见（选填）',
          inputType: 'textarea',
          inputValue: "",
          closeOnClickModal: false
        }).then(({ value }) => {
          Audit(this.setting.id, { handleOpinion: value, delegateId: this.setting.delegateId }).then(res => {
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000,
              onClose: () => {
                this.$emit('close', true)
              }
            });
          })
        }).catch(() => { });
      } else {
        this.$store.dispatch('base/getUserTree').then(res => {
          this.treeData = res
          this.visible = true
        })
      }
    },
    reject() {
      this.$prompt('', "审批拒绝", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入审批意见（必填）',
        inputType: 'textarea',
        inputErrorMessage: '审批意见不能为空',
        inputValue: "",
        inputValidator: (val) => { if (!val) { if (this.firstTest) { this.firstTest = false; return true } return false } },
        closeOnClickModal: false
      }).then(({ value }) => {
        Reject(this.setting.id, { handleOpinion: value, delegateId: this.setting.delegateId }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.$emit('close', true)
            }
          });
        })
      }).catch(() => { });
    },
    radioChange(val) {
      if (val != 0) {
        this.handleId = ''
      }
    },
    revoke() {
      this.$prompt('', "撤回流程", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入撤回原因（必填）',
        inputType: 'textarea',
        inputErrorMessage: '原因不能为空',
        inputValue: "",
        inputValidator: (val) => { if (!val) { if (this.firstTest) { this.firstTest = false; return true } return false } },
        closeOnClickModal: false
      }).then(({ value }) => {
        Revoke(this.setting.id, { handleOpinion: value }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.$emit('close', true)
            }
          });

        })
      }).catch(() => { });
    },
    dataFormSubmit() {
      if (this.handleType == 0 && !this.handleId) {
        this.$message({
          type: 'error',
          message: '请选择下一审批人',
          duration: 1000
        });
        return
      }
      let query = {
        delegateId: this.setting.delegateId,
        handleOpinion: this.reason,
        freeApproverUserId: this.handleId
      }
      Audit(this.setting.id, query).then(res => {
        this.$message({
          type: 'success',
          message: res.msg,
          duration: 1000,
          onClose: () => {
            this.visible = false
            this.$emit('close', true)
          }
        });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-audit {
  display: block;
  margin-bottom: 20px;
}
</style>