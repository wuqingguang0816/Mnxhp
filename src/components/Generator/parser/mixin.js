export default {
  data() {
    return {
      key: +new Date(),
      formConf: {}
    }
  },
  methods: {
    fillFormData(form, data) {
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__) {
            const val = data[item.__vModel__]
            if (val !== undefined) item.__config__.defaultValue = val
          }
          if (item.__config__ && item.__config__.jnpfKey !== 'table' && item.__config__.children && Array.isArray(item.__config__.children)) {
            loop(item.__config__.children)
          }
        }
      }
      loop(form.fields)
    },
    setFormData(prop, value) {
      if (!prop) return
      let dataForm = this.$refs.dynamicForm.dataForm
      this.$set(dataForm, prop, value)
      this.fillFormData(this.formConf, dataForm)
      this.key = +new Date()
    },
    setShowOrHide(prop, visible) {
      if (!prop) return
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__ && item.__vModel__ === prop) {
            item.__config__.noShow = !visible
          }
          if (item.__config__ && item.__config__.jnpfKey !== 'table' && item.__config__.children && Array.isArray(item.__config__.children)) {
            loop(item.__config__.children)
          }
        }
      }
      loop(this.formConf.fields)
      let dataForm = this.$refs.dynamicForm.dataForm
      this.fillFormData(this.formConf, dataForm)
      this.key = +new Date()
    },
  }
}