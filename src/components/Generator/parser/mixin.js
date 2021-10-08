import { dyOptionsList } from '@/components/Generator/generator/comConfig'
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
    setShowOrHide(prop, value) {
      const newVal = !!value
      this.comSet('noShow', prop, !newVal)
    },
    setRequired(prop, value) {
      const newVal = !!value
      this.comSet('required', prop, newVal)
    },
    setDisabled(prop, value) {
      const newVal = !!value
      this.comSet('disabled', prop, newVal)
    },
    setFieldOptions(prop, value) {
      const newVal = Array.isArray(value) ? value : []
      this.comSet('options', prop, newVal)
    },
    comSet(field, prop, value) {
      if (!prop) return
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__ && item.__vModel__ === prop) {
            switch (field) {
              case 'disabled':
                item[field] = value
                break;
              case 'options':
                if (dyOptionsList.indexOf(item.__config__.jnpfKey) > -1) {
                  let isTreeSelect = item.__config__.jnpfKey === 'treeSelect' || item.__config__.jnpfKey === 'cascader'
                  isTreeSelect ? item.options = value : item.__slot__.options = value
                }
                break;
              default:
                item.__config__[field] = value
                break;
            }
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
    }
  }
}