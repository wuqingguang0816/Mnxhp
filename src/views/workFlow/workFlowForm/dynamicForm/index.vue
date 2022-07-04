<template >
  <div class="flow-form" :style="{margin: '0 auto',width:formConf.fullScreenWidth}">
    <parser :form-conf="formConf" @submit="submitForm" :key="key" ref="dynamicForm"
      v-if="!loading" />
    <candidate-form :visible.sync="candidateVisible" :candidateList="this.candidateList"
      :branchList="branchList" @submitCandidate="selfHandleRequest" :formData="dataForm" />
    <error-form :visible.sync="errorVisible" :nodeList="errorNodeList" @submit="handleError" />
  </div>
</template>
<script>
import { DynamicInfo } from '@/api/workFlow/workFlowForm'
import { createModel, updateModel, getModelInfo } from '@/api/onlineDev/visualDev'
import { Candidates } from '@/api/workFlow/FlowBefore'
import Parser from '@/components/Generator/parser/Parser'
import CandidateForm from '@/views/workFlow/components/CandidateForm'
import ErrorForm from '@/views/workFlow/components/ErrorForm'
export default {
  components: { Parser, CandidateForm, ErrorForm },
  data() {
    return {
      formData: {},
      loading: true,
      eventType: '',
      key: +new Date(),
      formConf: {},
      candidateVisible: false,
      candidateList: [],
      candidateType: 1,
      branchList: [],
      errorVisible: false,
      errorNodeList: [],
      dataForm: {
        id: '',
        data: '',
        flowId: ''
      }
    }
  },
  methods: {
    init(data) {
      this.setting = data
      this.formConf = data.formConf ? JSON.parse(data.formConf) : {}
      this.dataForm.id = data.id || ''
      this.loading = true
      this.$nextTick(() => {
        if (this.dataForm.id) {
          let extra = {
            modelId: data.flowId,
            id: this.dataForm.id,
            type: data.type,
            flowId: data.flowId,
            processId: data.id,
            taskId: data.taskId,
            opType: data.opType
          }
          this.$store.commit('generator/SET_DYNAMIC_MODEL_EXTRA', extra)
          if (data.draftData) {
            this.formData = data.draftData
            this.fillFormData(this.formConf, this.formData)
            this.$nextTick(() => {
              this.loading = false
              this.$emit('setPageLoad')
            })
            return
          }
          if (data.type == 1) {
            getModelInfo(data.flowId, this.dataForm.id).then(res => {
              this.dataForm = res.data
              if (!this.dataForm.data) return
              this.formData = JSON.parse(this.dataForm.data)
              this.fillFormData(this.formConf, this.formData)
              this.$nextTick(() => {
                this.loading = false
                this.$emit('setPageLoad')
              })
            })
          } else {
            DynamicInfo(this.dataForm.id).then(res => {
              this.dataForm = res.data
              if (!this.dataForm.data) return
              this.formData = JSON.parse(this.dataForm.data)
              this.fillFormData(this.formConf, this.formData)
              this.$nextTick(() => {
                this.loading = false
                this.$emit('setPageLoad')
              })
            })
          }
        } else {
          this.$store.commit('generator/SET_DYNAMIC_MODEL_EXTRA', {})
          this.formData = {}
          this.fillFormData(this.formConf, this.formData)
          this.$nextTick(() => {
            this.loading = false
            this.$emit('setPageLoad')
          })
          this.dataForm.flowId = data.flowId
        }
        this.key = +new Date()
      })
    },
    fillFormData(form, data) {
      form.disabled = this.setting.readonly
      const loop = (list, parent) => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__) {
            const val = data[item.__vModel__]
            if (val !== undefined && !item.__config__.isSubTable) item.__config__.defaultValue = val
            let noShow = false, isDisabled = false, required = false
            if (this.setting.formOperates && this.setting.formOperates.length) {
              let id = item.__config__.isSubTable ? parent.__vModel__ + '-' + item.__vModel__ : item.__vModel__
              let arr = this.setting.formOperates.filter(o => o.id === id) || []
              if (arr.length) {
                let obj = arr[0]
                noShow = !obj.read
                isDisabled = !obj.write
                required = obj.required ? obj.required : item.__config__.required
              }
            }
            isDisabled = item.disabled ? item.disabled : isDisabled
            noShow = item.__config__.noShow ? item.__config__.noShow : noShow
            if (this.setting.readonly) isDisabled = true
            this.$set(item, 'disabled', isDisabled)
            this.$set(item.__config__, 'noShow', noShow)
            this.$set(item.__config__, 'required', required || false)
          }
          if (item.__config__ && item.__config__.children && Array.isArray(item.__config__.children)) {
            loop(item.__config__.children, item)
          }
        }
      }
      loop(form.fields)
    },
    submitForm(data, callback) {
      if (!data) return
      this.dataForm.data = JSON.stringify(data)
      if (callback && typeof callback === "function") callback()
      if (this.setting.type == 1) {
        if (this.eventType === 'save' || this.eventType === 'submit') {
          this.selfSubmit()
          return
        }
        this.$emit('eventReceiver', this.dataForm, this.eventType)
      } else {
        this.$emit('eventReceiver', this.dataForm, this.eventType)
      }
    },
    selfSubmit() {
      this.dataForm.status = this.eventType === 'submit' ? 0 : 1
      this.dataForm.flowId = this.setting.flowId
      if (this.eventType === 'save') return this.selfHandleRequest()
      this.$emit('setCandidateLoad', true)
      Candidates(0, { formData: this.dataForm }).then(res => {
        let data = res.data
        this.$emit('setCandidateLoad', false)
        this.candidateType = data.type
        if (data.type == 1) {
          this.branchList = res.data.list
          this.candidateList = []
          this.candidateVisible = true
        } else if (data.type == 2) {
          this.branchList = []
          this.candidateList = res.data.list.filter(o => o.isCandidates)
          this.candidateVisible = true
        } else {
          this.$confirm('您确定要提交当前流程吗, 是否继续?', '提示', {
            type: 'warning'
          }).then(() => {
            this.selfHandleRequest()
          }).catch(() => { });
        }
      }).catch(() => {
        this.$emit('setCandidateLoad', false)
      })
    },
    selfHandleRequest(candidateData) {
      if (candidateData) this.dataForm = { ...this.dataForm, ...candidateData }
      this.dataForm.candidateType = this.candidateType
      if (!this.dataForm.id) delete (this.dataForm.id)
      if (this.eventType === 'save') this.$emit('setLoad', true)
      const formMethod = this.dataForm.id ? updateModel : createModel
      formMethod(this.setting.flowId, this.dataForm).then(res => {
        const errorData = res.data
        if (errorData && Array.isArray(errorData) && errorData.length) {
          this.errorNodeList = errorData
          this.errorVisible = true
        } else {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              if (this.eventType === 'save') this.$emit('setLoad', false)
              this.candidateVisible = false
              this.errorVisible = false
              this.$emit('close', true)
            }
          })
        }
      }).catch(() => {
        if (this.eventType === 'save') this.$emit('setLoad', false)
      })
    },
    handleError(data) {
      if (this.eventType === 'submit') {
        this.dataForm.errorRuleUserList = data
        this.selfHandleRequest()
        return
      }
    },
    dataFormSubmit(eventType) {
      if (this.setting.isPreview) return this.$message({ message: '功能预览不支持数据保存', type: 'warning' })
      this.eventType = eventType
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    }
  }
}
</script>