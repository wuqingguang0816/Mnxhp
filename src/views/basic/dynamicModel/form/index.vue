<template >
  <div class="JNPF-common-layout">
    <FlowBox v-if="config.enableFlow " ref="FlowBox" @close="closeFlow" />
    <div class="JNPF-preview-main" v-else>
      <div class="JNPF-common-page-header">
        <p>{{config.fullName}}</p>
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{formConf.confirmButtonText||'确 定'}}</el-button>
          <el-button type="warning" @click="resetForm()">重置</el-button>
        </div>
      </div>
      <div class="dynamic-form-main" :style="{margin: '0 auto',width:formConf.fullScreenWidth}">
        <parser :form-conf="formConf" @submit="submitForm" :key="key" ref="dynamicForm"
          v-if="!loading" />
      </div>
    </div>
  </div>
</template>
<script>
import { createModel } from '@/api/onlineDev/visualDev'
import Parser from '@/components/Generator/parser/Parser'
import FlowBox from '@/views/workFlow/components/FlowBox'
export default {
  components: { Parser, FlowBox },
  props: ['config', 'modelId', 'isPreview'],
  data() {
    return {
      visible: false,
      dataForm: {
        data: ''
      },
      btnLoading: false,
      loading: true,
      key: +new Date(),
      formConf: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.config.enableFlow) {
        let data = {
          id: '',
          enCode: this.config.flowEnCode,
          flowId: this.config.flowId,
          formType: 2,
          type: 1,
          opType: '-1',
          modelId: this.modelId,
          isPreview: this.isPreview,
          fromForm: 1,
          hideCancelBtn: true
        }
        this.$nextTick(() => {
          this.$refs.FlowBox.init(data)
        })
      } else {
        this.formConf = JSON.parse(this.config.formData)
        this.loading = true
        this.$nextTick(() => {
          this.visible = true
          this.loading = false
          this.key = +new Date()
        })
      }
    },
    submitForm(data, callback) {
      if (!data) return
      this.btnLoading = true
      this.dataForm.data = JSON.stringify(data)
      createModel(this.modelId, this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            if (callback && typeof callback === "function") callback()
            this.btnLoading = false
            this.resetForm()
          }
        })
      }).catch(() => { this.btnLoading = false })
    },
    dataFormSubmit() {
      if (this.isPreview) return this.$message({ message: '功能预览不支持数据保存', type: 'warning' })
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    },
    resetForm() {
      this.formConf = JSON.parse(this.config.formData)
      this.$nextTick(() => {
        this.$refs.dynamicForm && this.$refs.dynamicForm.resetForm()
      })
    },
    closeFlow(isRefresh) {
      if (isRefresh) this.init()
    },
  }
}
</script>