<template>
  <el-dialog title="提交审核" :close-on-click-modal="false"
    class="JNPF-dialog JNPF-dialog_center form-script-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="600px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
    <el-form label-width="130px" ref="candidateForm" :model="candidateForm">
      <el-form-item label="分支选择" prop="branchList" v-if="branchList && branchList.length"
        :rules="[{ required: true, message: `分支不能为空`, trigger: 'change' }]">
        <el-select v-model="candidateForm.branchList" multiple placeholder="请选择审批分支" clearable
          @change="onBranchChange">
          <el-option v-for="item in branchList" :key="item.nodeId" :label="item.nodeName"
            :value="item.nodeId" />
        </el-select>
      </el-form-item>
      <el-form-item :label="item.nodeName+item.label" :prop="'candidateList.' + i + '.value'"
        v-for="(item,i) in candidateForm.candidateList" :key="i" :rules="item.rules">
        <candidate-user-select v-model="item.value" multiple :placeholder="'请选择'+item.label"
          :taskId="taskId" :formData="formData" :nodeId="item.nodeId" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="submitCandidate()">{{$t('common.confirmButton')}}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import CandidateUserSelect from './CandidateUserSelect'
export default {
  components: { CandidateUserSelect },
  props: ['candidateList', 'branchList', 'taskId', 'formData'],
  data() {
    return {
      candidateForm: {
        branchList: [],
        candidateList: []
      }
    }
  },
  methods: {
    onOpen() {
      if (!this.branchList.length) {
        this.candidateForm.candidateList = this.candidateList.map(o => ({
          ...o,
          label: '审批人',
          value: [],
          rules: [{ required: true, message: `审批人不能为空`, trigger: 'click' }]
        }))
      } else {
        this.candidateForm.candidateList = []
      }
      this.candidateForm.branchList = []
      this.$nextTick(() => {
        this.$refs['candidateForm'].resetFields()
      })
    },
    onBranchChange(val) {
      if (!val.length) return this.candidateForm.candidateList = []
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
      this.candidateForm.candidateList = list
    },
    submitCandidate() {
      this.$refs['candidateForm'].validate((valid) => {
        if (valid) {
          let candidateList = {}
          for (let i = 0; i < this.candidateForm.candidateList.length; i++) {
            candidateList[this.candidateForm.candidateList[i].nodeId] = this.candidateForm.candidateList[i].value
          }
          this.$emit('submitCandidate', {
            candidateList,
            branchList: this.candidateForm.branchList
          })
        }
      })
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
  }
}
</script>
