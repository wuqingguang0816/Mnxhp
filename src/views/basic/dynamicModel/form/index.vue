<template >
  <div class="JNPF-common-layout">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{formData.confirmButtonText||'确 定'}}</el-button>
          <el-button type="warning" @click="resetForm()">重置</el-button>
        </div>
      </div>
      <div class="dynamic-form-main" :style="{margin: '0 auto',width:formData.fullScreenWidth}">
        <parser :form-conf="formData" @submit="sumbitForm" :key="key" ref="dynamicForm"
          v-if="!loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { createModel } from '@/api/onlineDev/visualDev'
import Parser from '@/components/Generator/parser/Parser'
export default {
  components: { Parser },
  props: ['config', 'modelId', 'isPreview'],
  data() {
    return {
      visible: false,
      dataForm: {
        data: ''
      },
      formData: {},
      key: +new Date(),
      btnLoading: false,
      loading: true,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.formData = JSON.parse(this.config.formData)
      this.loading = true
      this.$nextTick(() => {
        this.visible = true
        this.loading = false
        this.key = +new Date()
      })
    },
    sumbitForm(data) {
      if (!data) return
      this.btnLoading = true
      this.dataForm.data = JSON.stringify(data)
      createModel(this.modelId, this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
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
      this.$refs.dynamicForm && this.$refs.dynamicForm.resetForm()
    }
  }
}
</script>