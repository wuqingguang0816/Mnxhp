<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main nohead">
      <div class="btns">
        <el-button type="primary" @click="dataFormSubmit(true)">提交审核
        </el-button>
        <el-button type="warning" @click="dataFormSubmit()" :loading="btnLoading">保存草稿
        </el-button>
        <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
      </div>
      <el-tabs class="JNPF-el_tabs" v-model="activeTab">
        <el-tab-pane label="流程表单">
          <component :is="currentView" @close="goBack" ref="form" @reset="btnLoading=false" />
        </el-tab-pane>
        <el-tab-pane label="流程视图">
          <Process :conf="flowTemplateJson" thisStepId="start" v-if="flowTemplateJson.childNode" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>

<script>
import { FlowEngineInfo } from '@/api/workFlow/FlowEngine'
import Process from '@/components/Process/Preview'
export default {
  components: { Process },
  data() {
    return {
      currentView: '',
      setting: {},
      flowTemplateJson: {},
      activeTab: '0',
      btnLoading: false
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
      FlowEngineInfo(data.flowId).then(res => {
        data.freeApprover = res.data.freeApprover || 0
        data.formConf = res.data.formData
        this.flowTemplateJson = res.data.flowTemplateJson ? JSON.parse(res.data.flowTemplateJson) : null
        setTimeout(() => {
          this.$nextTick(() => {
            this.$refs.form && this.$refs.form.init(data)
          })
        }, 100)
      })
    },
    dataFormSubmit(isSubmit) {
      if (!isSubmit) this.btnLoading = true
      this.$refs.form && this.$refs.form.dataFormSubmit(isSubmit)
    }
  }
}
</script>