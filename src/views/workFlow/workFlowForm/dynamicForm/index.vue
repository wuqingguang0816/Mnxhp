<template >
  <div class="flow-form" :style="{margin: '0 auto',width:formConf.fullScreenWidth}">
    <parser :form-conf="formConf" @submit="submitForm" :key="key" ref="dynamicForm"
      v-if="!loading" />
  </div>
</template>
<script>
import Parser from '@/components/Generator/parser/Parser'
import { mapGetters } from "vuex";
export default {
  props: ['config'],
  components: { Parser },
  data() {
    return {
      setting: {},
      formData: {},
      loading: true,
      eventType: '',
      flowUrgent: 1,
      key: +new Date(),
      formConf: {},
      isCustomCopy: false,
      isAdd: false,
      dataForm: {
        id: '',
        formData: {},
        flowId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted() {
    this.init(this.config)
  },
  methods: {
    init(data) {
      this.setting = data
      this.formConf = data.formConf ? JSON.parse(data.formConf) : {}
      this.formData = {}
      this.dataForm.id = data.id || ''
      this.isCustomCopy = this.setting.flowTemplateJson && this.setting.flowTemplateJson.properties && this.setting.flowTemplateJson.properties.isCustomCopy
      this.loading = true
      this.$nextTick(() => {
        let extra = {}
        if (data.id) {
          this.isAdd = false;
          extra = {
            modelId: data.flowId,
            id: data.id,
            type: data.type,
            flowId: data.flowId,
            processId: data.id,
            taskId: data.taskId,
            opType: data.opType
          }
          const formData = data.draftData || data.formData
          this.formData = { ...formData, flowId: data.flowId }
        } else {
          this.isAdd = true;
        }
        this.$store.commit('generator/SET_DYNAMIC_MODEL_EXTRA', extra)
        this.fillFormData(this.formConf, this.formData)
        this.$nextTick(() => {
          this.loading = false
          this.$emit('setPageLoad')
        })
        this.dataForm.flowId = data.flowId
        this.key = +new Date()
      })
    },
    fillFormData(form, data) {
      form.disabled = this.setting.readonly
      const loop = (list, parent) => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__) {
            let val = data.hasOwnProperty(item.__vModel__) ? data[item.__vModel__] : ((this.isAdd) ? item.__config__.defaultValue : undefined)
            if (!item.__config__.isSubTable) item.__config__.defaultValue = val
            if ((this.isAdd || (!this.isAdd && item.__config__.isSubTable == true)) && item.__config__.jnpfKey === 'date' && item.__config__.defaultCurrent) {
              let format = item.format
              let dateStr = this.jnpf.toDate(new Date().getTime(), format)
              let time = format === 'yyyy' ? '-01-01 00:00:00' : format === 'yyyy-MM' ? '-01 00:00:00' : format === 'yyyy-MM-dd' ?
                ' 00:00:00' : ''
              let value = new Date(dateStr + time).getTime()
              item.__config__.defaultValue = value
            } else if ((this.isAdd || (!this.isAdd && item.__config__.isSubTable == true)) && item.__config__.jnpfKey === 'comSelect' && item.__config__.defaultCurrent) {
              if (this.userInfo.organizeIdList instanceof Array && this.userInfo.organizeIdList.length > 0) {
                val = item.multiple == true ? [this.userInfo.organizeIdList] : this.userInfo.organizeIdList
              } else {
                val = []
              }
              item.__config__.defaultValue = val
            } else if ((this.isAdd || (!this.isAdd && item.__config__.isSubTable == true)) && item.__config__.jnpfKey === 'time' && item.__config__.defaultCurrent) {
              val = this.jnpf.toDate(new Date(), item.format)
              item.__config__.defaultValue = val
            }
            let noShow = false, isDisabled = false, required = item.__config__.required || false
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
      form.formData = data
    },
    submitForm(data, callback) {
      if (!data) return
      const formData = { ...this.formData, ...data }
      this.dataForm.formData = formData
      if (callback && typeof callback === "function") callback()
      this.$emit('eventReceiver', this.dataForm, this.eventType)
    },
    dataFormSubmit(eventType, flowUrgent) {
      if (this.setting.isPreview) return this.$message({ message: '功能预览不支持数据保存', type: 'warning' })
      this.eventType = eventType
      this.flowUrgent = flowUrgent
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    }
  }
}
</script>
