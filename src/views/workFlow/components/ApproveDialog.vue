<template>
  <el-dialog :title="eventType==='audit'?'审批通过':'审批退回'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body
    width='600px'>
    <el-form ref="dataForm" :model="dataForm"
      :label-width="dataForm.candidateList.length||branchList.length?'130px':'80px'">
      <template v-if="eventType==='audit'">
        <el-form-item label="分支选择" prop="branchList" v-if="branchList.length"
          :rules="[{ required: true, message: `分支不能为空`, trigger: 'change' }]">
          <el-select v-model="dataForm.branchList" multiple placeholder="请选择审批分支" clearable
            @change="onBranchChange">
            <el-option v-for="item in branchList" :key="item.nodeId" :label="item.nodeName"
              :value="item.nodeId" />
          </el-select>
        </el-form-item>
        <el-form-item :label="item.nodeName+item.label" :prop="'candidateList.' + i + '.value'"
          v-for="(item,i) in dataForm.candidateList" :key="i" :rules="item.rules">
          <candidate-user-select v-model="item.value" multiple :placeholder="'请选择'+item.label"
            :taskId="taskId" :formData="formData" :nodeId="item.nodeId" v-if="item.hasCandidates" />
          <user-select v-model="item.value" multiple :placeholder="'请选择'+item.label" title="候选人员"
            v-else />
        </el-form-item>
      </template>
      <template v-if="properties&&properties.rejectType &&eventType!=='audit'&&showReject">
        <el-form-item label="退回节点" prop="rejectStep">
          <el-select v-model="dataForm.rejectStep" placeholder="请选择退回节点"
            :disabled='properties.rejectStep!=="2"'>
            <el-option v-for="item in rejectList" :key="item.nodeCode" :label="item.nodeName"
              :value="item.nodeCode">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <el-form-item label="抄送人员" prop="copyIds" v-if="properties&&properties.isCustomCopy">
        <user-select v-model="copyIds" placeholder="请选择" multiple />
      </el-form-item>
      <el-form-item label="审批意见" prop="handleOpinion" v-if="properties&&properties.hasOpinion">
        <el-input v-model="dataForm.handleOpinion" placeholder="请输入审批意见" type="textarea"
          :rows="4" />
      </el-form-item>
      <el-form-item label="审批附件" prop="fileList" v-if="properties&&properties.hasOpinion">
        <JNPF-UploadFz v-model="dataForm.fileList" :limit="3" />
      </el-form-item>
      <el-form-item label="审批签名" required v-if="properties&&properties.hasSign">
        <div class="sign-main">
          <img :src="signImg" alt="" v-if="signImg" class="sign-img">
          <div @click="addSign" class="sign-style">
            <i class="icon-ym icon-ym-signature add-sign"></i>
            <span class="sign-title" v-if="!signImg">手写签名</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="handleApproval()" :loading="btnLoading">
        {{$t('common.confirmButton')}}
      </el-button>
    </span>
    <SignImgDialog v-if="signVisible" ref="SignImg" :lineWidth='3' :userInfo='userInfo'
      :isDefault='1' @close="signDialog" />
  </el-dialog>
</template>

<script>
import SignImgDialog from '@/components/SignImgDialog'
import { mapGetters } from "vuex"
import CandidateUserSelect from './CandidateUserSelect'
export default {
  components: { SignImgDialog, CandidateUserSelect },
  data() {
    return {
      visible: false,
      branchList: [],
      dataForm: {
        branchList: [],
        candidateList: [],
        handleOpinion: '',
        fileList: [],
        rejectStep: ''
      },
      copyIds: [],
      signVisible: false,
      freeApproverUserId: '',
      signImg: '',
      btnLoading: false,
      properties: {},
      eventType: '',
      taskId: '',
      formData: {
        flowId: '',
        data: '{}'
      },
      showReject: false,
      rejectList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    init(properties, taskId, eventType, branchList, candidateList, flowId) {
      this.visible = true
      this.properties = properties
      this.taskId = taskId
      this.eventType = eventType || ''
      this.branchList = branchList || []
      this.dataForm.candidateList = candidateList || []
      this.dataForm.branchList = []
      this.dataForm.handleOpinion = ''
      this.formData.flowId = flowId
      this.copyIds = []
      this.signImg = ""
      if (this.properties && this.properties.hasSign) this.signImg = this.userInfo.signImg
      this.freeApproverUserId = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })

      this.showReject = properties.showReject
      this.rejectList = properties.rejectList
      this.dataForm.rejectStep = properties.rejectStep
    },
    onBranchChange(val) {
      const defaultList = this.dataForm.candidateList.filter(o => o.isDefault)
      if (!val.length) return this.dataForm.candidateList = defaultList
      let list = []
      for (let i = 0; i < val.length; i++) {
        inner: for (let j = 0; j < this.branchList.length; j++) {
          let o = this.branchList[j]
          if (val[i] === o.nodeId && o.isCandidates) {
            list.push({
              ...o,
              label: '审批人',
              value: [],
              rules: [{ required: true, message: `审批人不能为空`, trigger: 'click' }]
            })
            break inner
          }
        }
      }
      this.dataForm.candidateList = [...defaultList, ...list]
    },
    handleApproval() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.properties.hasSign && !this.signImg) {
            this.$message({
              message: '请签名',
              type: 'error'
            })
            return
          }
          let query = {
            handleOpinion: this.dataForm.handleOpinion,
            signImg: this.signImg,
            copyIds: this.copyIds.join(','),
            branchList: this.dataForm.branchList,
            fileList: this.dataForm.fileList
          }
          if (this.eventType === 'reject') query.rejectStep = this.dataForm.rejectStep
          if (this.dataForm.candidateList.length) {
            let candidateList = {}
            for (let i = 0; i < this.dataForm.candidateList.length; i++) {
              candidateList[this.dataForm.candidateList[i].nodeId] = this.dataForm.candidateList[i].value
            }
            query.candidateList = candidateList
          }
          if (this.eventType === 'audit' && this.properties.hasFreeApprover) {
            query = { freeApproverUserId: this.freeApproverUserId, ...query }
          }
          this.btnLoading = true
          this.$emit('submit', query)
        }
      })
    },
    addSign() {
      this.signVisible = true
      this.$nextTick(() => {
        this.$refs.SignImg.init()
      })
    },
    signDialog(val) {
      this.signVisible = false
      if (val) {
        this.signImg = val
      }
    },
    closeDialog() {
      this.btnLoading = false
      this.visible = false
    }
  }
}
</script>

