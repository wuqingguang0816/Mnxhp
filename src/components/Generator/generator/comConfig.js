// 规则
const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change',
  'el-color-picker': 'change',
  'JNPF-Quill': 'blur',
  "JNPF-Text": 'blur',
  "JNPF-Amount": 'change',
  "JNPF-UploadFz": 'change',
  "JNPF-UploadImg": 'change',
  "com-select": 'change',
  "dep-select": 'change',
  "pos-select": 'change',
  "user-select": 'change',
  "dic-select": 'change',
  "JNPF-Address": 'change',
}
// 动态options
const dyOptionsList = ['radio', 'checkbox', 'select', 'cascader', 'treeSelect']
// 不添加vModel
const noVModelList = ['divider', 'JNPFText', 'groupTitle', 'relationFormAttr', 'relationFlowAttr']
// 不可以添加到子表组件
const noTableAllowList = ['textarea', 'JNPFText', 'JNPFAmount', 'divider', 'editor', 'uploadImg', 'uploadFz', 'radio', 'checkbox', 'relationFormAttr', 'relationFlow', 'relationFlowAttr', 'groupTitle', 'createUser', 'createTime', 'modifyUser', 'modifyTime', 'currOrganize', 'currDept', 'currPosition', 'rate', 'slider', 'PsdInput', 'colorPicker']
// 不可以添加到列表展示
const noColumnShowList = ['PsdInput', 'colorPicker', 'rate', 'slider', 'divider', 'uploadImg', 'uploadFz', 'editor', 'JNPFText', 'relationFormAttr', 'relationFlowAttr', 'groupTitle']
// 不可以添加到搜索
const noSearchList = [...noColumnShowList, 'switch', 'timeRange', 'dateRange', 'relationForm', 'relationFlow', 'popupSelect']
// 搜索时控件为input
const useInputList = ['comInput', 'textarea', 'JNPFText', 'billRule']
// 搜索时控件为日期选择器
const useDateList = ['createTime', 'modifyTime']
// 搜索时控件为下拉选择器
const useSelectList = ['radio', 'checkbox', 'select']
// 在线开发-功能设计/流程设计独有组件
const webPeculiarList = [{
    __config__: {
      jnpfKey: 'relationForm',
      label: '关联表单',
      labelWidth: undefined,
      showLabel: true,
      tag: 'relationForm',
      tagIcon: 'icon-ym icon-ym-generator-menu',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      tableName: '',
      regList: [],
      trigger: 'change'
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    flowId: '',
    relationField: '',
    columnOptions: [],
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'relationFormAttr',
      label: '关联表单属性',
      labelWidth: undefined,
      showLabel: true,
      tag: 'relationFormAttr',
      tagIcon: 'icon-ym icon-ym-generator-nature',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    showField: '',
    relationField: ''
  },
  {
    __config__: {
      jnpfKey: 'calculate',
      label: '计算公式',
      labelWidth: undefined,
      showLabel: true,
      required: false,
      tag: 'calculate',
      tagIcon: 'icon-ym icon-ym-generator-count',
      defaultValue: null,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      tableName: '',
      noShow: false,
      regList: []
    },
    expression: []
  },
  {
    __config__: {
      jnpfKey: 'popupSelect',
      label: '弹窗选择',
      labelWidth: undefined,
      showLabel: true,
      required: false,
      tag: 'popupSelect',
      tagIcon: 'icon-ym icon-ym-generator-checkbox',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      tableName: '',
      regList: []
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    interfaceId: '',
    columnOptions: [],
    propsValue: 'id',
    disabled: false,
    clearable: true,
  }
]
// 在线开发-流程设计独有组件
const flowPeculiarList = [{
    __config__: {
      jnpfKey: 'relationFlow',
      label: '关联流程表单',
      labelWidth: undefined,
      showLabel: true,
      tag: 'relationFlow',
      tagIcon: 'icon-ym icon-ym-generator-flow',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      tableName: '',
      regList: [],
      trigger: 'change'
    },
    placeholder: '请选择',
    modelId: '',
    relationField: '',
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'relationFlowAttr',
      label: '关联流程属性',
      labelWidth: undefined,
      showLabel: true,
      tag: 'relationFlowAttr',
      tagIcon: 'icon-ym icon-ym-generator-nature',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    showField: '',
    relationField: ''
  }
]
export { ruleTrigger, dyOptionsList, noVModelList, noTableAllowList, noColumnShowList, noSearchList, webPeculiarList, flowPeculiarList, useInputList, useDateList, useSelectList }