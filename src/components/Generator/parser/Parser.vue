<script>
import { deepClone } from '@/utils'
import render from '@/components/Generator/render/render.js'
import { ruleTrigger, dyOptionsList } from '@/components/Generator/generator/comConfig'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { previewDataInterface } from '@/api/systemData/dataInterface'

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__
    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    if (!config.noShow) {
      return (
        <el-col span={config.span}>
          <el-form-item label-width={labelWidth} prop={scheme.__vModel__}
            label={config.showLabel ? config.label : ''}>
            <render formData={this[this.formConf.formModel]} conf={scheme} {...{ on: listeners }} ref={config.rowType === 'table' ? scheme.__vModel__ : undefined} />
          </el-form-item>
        </el-col>
      )
    }
  },
  rowFormItem(h, scheme) {
    if (scheme.__config__.jnpfKey === 'tab') {
      return (
        <el-col span={scheme.__config__.span} class="mb-10">
          <el-tabs type={scheme.type} tab-position={scheme['tab-position']} vModel={scheme.__config__.active}>
            {
              scheme.__config__.children.map((item, i) => {
                let child = renderChildren.call(this, h, item)
                return (
                  <el-tab-pane key={item.name} label={item.title} >
                    <el-row>
                      {child}
                    </el-row>
                  </el-tab-pane>
                )
              })
            }
          </el-tabs>
        </el-col>
      )
    }
    if (scheme.__config__.jnpfKey === 'collapse') {
      return (
        <el-col span={scheme.__config__.span} class="mb-20">
          <el-collapse vModel={scheme.__config__.active} accordion={scheme.accordion}>
            {
              scheme.__config__.children.map((item, i) => {
                let child = renderChildren.call(this, h, item)
                return (
                  <el-collapse-item key={item.name} title={item.title} name={item.name} >
                    <el-row>
                      {child}
                    </el-row>
                  </el-collapse-item>
                )
              })
            }
          </el-collapse>
        </el-col>
      )
    }
    let child = renderChildren.apply(this, arguments)
    if (scheme.__config__.jnpfKey === 'table') {
      if (!scheme.__config__.noShow) this.tableRefs[scheme.__vModel__] = scheme
      const param = { ...scheme, config: scheme }
      return layouts.colFormItem.call(this, h, param)
    }
    if (scheme.__config__.jnpfKey === 'card') {
      return (
        <el-col span={scheme.__config__.span} class="item-card">
          <el-card shadow={scheme.shadow} header={scheme.header} class="mb-20">
            {child}
          </el-card>
        </el-col>
      )
    }
    if (scheme.__config__.jnpfKey === 'row') {
      if (scheme.type === 'flex') {
        child = <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
          {child}
        </el-row>
      }
      return (
        <el-col span={scheme.__config__.span}>
          <el-row gutter={scheme.gutter}>
            {child}
          </el-row>
        </el-col>
      )
    }
  }
}

function renderFrom(h) {
  const { formConfCopy } = this
  return (
    <el-row gutter={formConfCopy.gutter} class={formConfCopy.formStyle}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  )
}

function formBtns(h) {
  return <el-col>
    <el-form-item size="large">
      <el-button type="primary" onClick={this.submitForm}>提交</el-button>
      <el-button onClick={this.resetForm}>重置</el-button>
    </el-form-item>
  </el-col>
}

function renderFormItem(h, elementList) {
  return elementList.map(scheme => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function setValue(event, config, scheme) {
  this.$set(config, 'defaultValue', event)
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
}

function getFunc(str) {
  let func = null
  try {
    func = eval(str)
    return func
  } catch (error) {
    console.log(error);
    return false
  }
}

function buildListeners(scheme) {
  const config = scheme.__config__
  const parameter = {
    formData: this[this.formConf.formModel],
    setFormData: this.setFormData,
    setShowOrHide: this.setShowOrHide,
    setRequired: this.setRequired,
    setDisabled: this.setDisabled
  }
  const listeners = {}
  if (scheme.on) {
    // 响应 组件事件
    Object.keys(scheme.on).forEach(key => {
      const str = scheme.on[key];
      const func = getFunc(str);
      if (!func) return
      listeners[key] = event => func.call(this, { data: event, ...parameter })
    })
  }
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = event => setValue.call(this, event, config, scheme)

  return listeners
}

export default {
  components: {
    render
  },
  props: {
    setFormData: Function,
    setShowOrHide: Function,
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {},
      options: {},
      tableRefs: {}
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    this.buildOptions(data.formConfCopy.fields, data.options)
    this.$nextTick(() => {
      this.buildMethods(data.formConfCopy, data[this.formConf.formModel])
    })
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      this.$store.commit('generator/UPDATE_RELATION_DATA', {})
      componentList.forEach(cur => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (cur.__config__.jnpfKey == 'table') return
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildOptions(componentList, data) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
          let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
          if (config.dataType === 'dictionary') {
            if (!config.dictionaryType) return
            getDictionaryDataSelector(config.dictionaryType).then(res => {
              isTreeSelect ? cur.options = res.data.list : cur.__slot__.options = res.data.list
            })
          }
          if (config.dataType === 'dynamic') {
            if (!config.propsUrl) return
            previewDataInterface(config.propsUrl).then(res => {
              isTreeSelect ? cur.options = res.data : cur.__slot__.options = res.data
            })
          }
          isTreeSelect ? data[cur.__vModel__ + 'Options'] = cur.options : data[cur.__vModel__ + 'Options'] = cur.__slot__.options
        }
        if (config.children && config.jnpfKey !== 'table') this.buildOptions(config.children, data)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder }
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array'
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined && (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.__vModel__] = config.regList.map(item => {
            item.pattern && (item.pattern = eval(item.pattern))
            item.trigger = config.trigger || 'blur'
            return item
          })
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    buildMethods(formConfCopy, formData) {
      if (!formConfCopy || !formConfCopy.funcs || !formConfCopy.funcs.onLoad) return
      const onLoadFunc = getFunc(formConfCopy.funcs.onLoad)
      if (!onLoadFunc) return
      onLoadFunc({ formData, setFormData: this.setFormData })
    },
    resetForm() {
      this.$store.commit('generator/UPDATE_RELATION_DATA', {})
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
      Object.keys(this.tableRefs).forEach(vModel => {
        this.$refs[vModel].$children[0].resetTable()
      })
      if (this.dyMtehods && this.dyMtehods.onLoad && typeof this.dyMtehods.onLoad === "function") this.dyMtehods.onLoad(this[this.formConf.formModel])
    },
    checkTableData() {
      let valid = true
      Object.keys(this.tableRefs).forEach(vModel => {
        const res = this.$refs[vModel].$children[0].submit()  // 返回false或表单数据
        res ? (this[this.formConf.formModel][vModel] = res) : (valid = false)
      })
      return valid
    },
    beforeSubmit() {
      let valid = true
      if (this.dyMtehods && this.dyMtehods.beforeSubmit && typeof this.dyMtehods.beforeSubmit === "function") {
        valid = this.dyMtehods.beforeSubmit(this[this.formConf.formModel])
      }
      return valid
    },
    onValidate() {
      let valid = true
      if (this.dyMtehods && this.dyMtehods.onValidate && typeof this.dyMtehods.onValidate === "function") {
        valid = this.dyMtehods.onValidate(this[this.formConf.formModel])
      }
      return valid
    },
    afterSubmit() {
      let valid = true
      if (this.dyMtehods && this.dyMtehods.afterSubmit && typeof this.dyMtehods.afterSubmit === "function") {
        valid = this.dyMtehods.afterSubmit(this[this.formConf.formModel])
      }
      return valid
    },
    submitForm() {
      const beforeSubmitValid = this.beforeSubmit()
      if (!beforeSubmitValid) return false
      const isTableValid = this.checkTableData()
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false
        if (!isTableValid) return false
        const onValidateValid = this.onValidate()
        if (!onValidateValid) return false
        // 触发sumit事件
        this.$emit('submit', this[this.formConf.formModel], this.afterSubmit)
        return true
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>