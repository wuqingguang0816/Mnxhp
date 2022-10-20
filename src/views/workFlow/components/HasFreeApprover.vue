<template>
  <el-dialog v-bind="$attrs" :close-on-click-modal="false" :modal-append-to-body="false"
    append-to-body v-on="$listeners" @open="onOpen" @close="onClose"
    class="JNPF-dialog JNPF-dialog_center" title="加签" width="600px">
    <el-form ref="hasFreeApproverForm" :rules="rules" :model="hasFreeApproverForm"
      label-width="100px">
      <el-form-item label="加签人员" prop="freeApproverUserId">
        <user-select v-model="hasFreeApproverForm.freeApproverUserId" placeholder="请选择加签人员" />
      </el-form-item>
      <el-form-item label="加签类型">
        <el-radio-group v-model="hasFreeApproverForm.freeApproverType">
          <el-radio-button :label="1">加签前</el-radio-button>
          <el-radio-button :label="2">加签后</el-radio-button>
        </el-radio-group>
        <div v-if='hasFreeApproverForm.freeApproverType==1'>加签后，流程先经过加签审批人，再由我审批</div>
        <div v-else>审批后加签，即表示同意该申请并增加审批人员</div>
      </el-form-item>
      <el-form-item label="分支选择" prop="branchList" v-if="branchList.length">
        <el-select v-model="hasFreeApproverForm.branchList" multiple placeholder="请选择审批分支" clearable
          @change="onBranchChange">
          <el-option v-for="item in branchList" :key="item.nodeId" :label="item.nodeName"
            :value="item.nodeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="加签意见" prop="handleOpinion">
        <el-input v-model="hasFreeApproverForm.handleOpinion" placeholder="请输入加签意见" type="textarea"
          :rows="4" />
      </el-form-item>
      <el-form-item label="审批附件" prop="fileList">
        <JNPF-UploadFz v-model="hasFreeApproverForm.fileList" :limit="3" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close">{{formConf.cancelButtonText||'取 消'}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Parser from '@/components/Generator/parser/Parser'
import { Candidates, Audit } from '@/api/workFlow/FlowBefore'
export default {
  components: { Parser },
  props: ['taskId', 'formData'],
  data() {
    return {
      key: +new Date(),
      formConf: {},
      currentView: '',
      hasFreeApproverForm: {
        freeApproverUserId: "",
        freeApproverType: 1,
        handleOpinion: '',
        fileList: [],
        branchList: []
      },
      branchList: [],
      candidateType: 1,
      btnLoading: false,
      freeApproverUserId: '',
      rules: {
        freeApproverUserId: [
          { required: true, message: '加签人员不能为空', trigger: 'change' }
        ],
        branchList: [{ required: true, message: `分支不能为空`, trigger: 'change' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    onOpen() {
      Candidates(this.taskId, this.formData).then(res => {
        let data = res.data
        this.candidateType = data.type
        this.candidateLoading = false
        this.branchList = []
        if (data.type == 1) {
          this.branchList = res.data.list.filter(o => o.isBranchFlow)
          let list = res.data.list.filter(o => !o.isBranchFlow && o.isCandidates)
          this.hasFreeApproverForm.candidateList = list.map(o => ({
            ...o,
            isDefault: true,
            label: '审批人',
            value: [],
            rules: [{ required: true, message: `审批人不能为空`, trigger: 'click' }]
          }))
          this.$nextTick(() => {
            this.$refs['candidateForm'].resetFields()
          })
          this.isValidate = true
          this.visible = true
        } else if (data.type == 2) {
          let list = res.data.list.filter(o => o.isCandidates)
          this.hasFreeApproverForm.candidateList = list.map(o => ({
            ...o,
            label: '审批人',
            value: [],
            rules: [{ required: true, message: `审批人不能为空`, trigger: 'click' }]
          }))
          this.$nextTick(() => {
            this.$refs['hasFreeApproverForm'].resetFields()
          })
          this.isValidate = true
          this.visible = true
        }
      })
    },
    onClose() {
    },
    close(e) {
      this.$emit('update:visible', false)
    },
    dataFormSubmit() {
      this.$refs['hasFreeApproverForm'].validate((valid) => {
        if (!valid) return
        this.btnLoading = true
        let query = {
          handleOpinion: this.hasFreeApproverForm.handleOpinion,
          fileList: this.hasFreeApproverForm.fileList,
          freeApproverType: this.hasFreeApproverForm.freeApproverType,
          freeApproverUserId: this.hasFreeApproverForm.freeApproverUserId,
          branchList: this.hasFreeApproverForm.branchList
        }
        if (this.hasFreeApproverForm.candidateList.length) {
          let candidateList = {}
          for (let i = 0; i < this.hasFreeApproverForm.candidateList.length; i++) {
            candidateList[this.hasFreeApproverForm.candidateList[i].nodeId] = this.hasFreeApproverForm.candidateList[i].value
          }
          query.candidateList = candidateList
        }
        Audit(this.setting.taskId, query).then(res => {

          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.btnLoading = false
              this.close()
            }
          })
        }).catch(() => { this.btnLoading = false })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  font-size: 14px;
  height: 350px;
  word-break: break-all;
}
</style>