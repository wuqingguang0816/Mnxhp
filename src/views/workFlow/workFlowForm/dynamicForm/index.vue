<template >
  <div class="flow-form" :style="{margin: '0 auto',width:formConf.fullScreenWidth}">
    <parser :form-conf="formConf" @submit="sumbitForm" :key="key" ref="dynamicForm"
      v-if="!loading" />
    <UserBox v-if="userBoxVisible" ref="userBox" @submit="submit" />
  </div>
</template>
<script>
import { Info, Create, Update } from '@/api/workFlowForm/Dynamic'
import Parser from '@/components/Generator/parser/Parser'
import { deepClone } from '@/utils'
export default {
  components: { Parser },
  data() {
    return {
      formConf: {},
      formData: {},
      key: +new Date(),
      loading: true,
      isSubmit: false,
      userBoxVisible: false,
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
          Info(this.dataForm.id).then(res => {
            this.dataForm = res.data
            if (!this.dataForm.data) return
            this.formData = JSON.parse(this.dataForm.data)
            this.fillFormData(this.formConf, this.formData)
            this.$nextTick(() => {
              this.loading = false
            })
          })
        } else {
          this.formData = {}
          this.loading = false
          this.dataForm.flowId = data.flowId
        }
        this.key = +new Date()
      })
    },
    fillFormData(form, data) {
      form.disabled = this.setting.readonly
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__) {
            const val = data[item.__vModel__]
            if (val) item.__config__.defaultValue = val
            let noShow = false, isDisabled = true
            if (this.setting.formOperates && this.setting.formOperates.length) {
              let arr = this.setting.formOperates.filter(o => o.id === item.__vModel__) || []
              if (arr.length) {
                let obj = arr[0]
                noShow = !obj.read
                isDisabled = !obj.write
              }
            } else {
              isDisabled = false
            }
            this.$set(item, 'disabled', isDisabled)
            this.$set(item.__config__, 'noShow', noShow)
          }
          if (item.__config__ && item.__config__.jnpfKey !== 'table' && item.__config__.children && Array.isArray(item.__config__.children)) {
            loop(item.__config__.children)
          }
        }
      }
      loop(form.fields)
    },
    sumbitForm(data) {
      if (!data) return
      this.dataForm.data = JSON.stringify(data)
      this.dataForm.status = this.isSubmit ? 0 : 1
      if (this.isSubmit) {
        if (this.setting.freeApprover == 0) {
          this.$confirm('您确定要提交当前流程吗, 是否继续?', '提示', {
            type: 'warning'
          }).then(() => {
            this.submit()
          }).catch(() => { });
        } else {
          this.userBoxVisible = true
          this.$nextTick(() => {
            this.$refs.userBox.init()
          })
        }
      } else {
        this.request()
      }
    },
    dataFormSubmit(isSubmit) {
      this.isSubmit = isSubmit ? true : false
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    },
    submit(freeApproverUserId) {
      if (freeApproverUserId) this.dataForm.freeApproverUserId = freeApproverUserId
      this.request()
    },
    request() {
      if (!this.dataForm.id) delete (this.dataForm.id)
      const formMethod = this.dataForm.id ? Update : Create
      formMethod(this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.$emit('close', true)
          }
        })
      })
    }
  }
}
</script>