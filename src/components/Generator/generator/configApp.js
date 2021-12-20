// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'dataForm',
  size: 'small',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: false,
  hasCancelBtn: true,
  cancelButtonText: '取 消',
  hasConfirmBtn: true,
  confirmButtonText: '确 定',
  funcs: {
    onLoad: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    beforeSubmit: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n\n    // 继续执行返回true\n    return true\n}',
    afterSubmit: '({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
  },
  idGlobal: 100
}

// 基础控件 【左面板】
export const inputComponents = [{
    __config__: {
      jnpfKey: 'comInput',
      label: '单行输入',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-input',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      tableName: '',
      noShow: false,
      regList: []
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
      blur: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请输入',
    maxlength: null,
    disabled: false,
    'show-password': false,
    type: 'text'
  },
  {
    __config__: {
      jnpfKey: 'textarea',
      label: '多行输入',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-textarea',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      tableName: '',
    },
    placeholder: '请输入',
    maxlength: null,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'numInput',
      label: '数字输入',
      showLabel: true,
      labelWidth: undefined,
      tag: 'el-input-number',
      tagIcon: 'icon-ym icon-ym-generator-number',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
      blur: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    min: undefined,
    max: undefined,
    step: 1,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'switch',
      label: '开关',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-switch',
      tagIcon: 'icon-ym icon-ym-generator-switch',
      defaultValue: false,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'radio',
      label: '单选框组',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'icon-ym icon-ym-generator-radio',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      optionType: 'default',
      border: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: '',
      props: {
        label: 'fullName',
        value: 'id'
      }
    },
    __slot__: {
      options: [{
        fullName: '选项一',
        id: "1"
      }, {
        fullName: '选项二',
        id: "2"
      }]
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'checkbox',
      label: '多选框组',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-checkbox-group',
      tagIcon: 'icon-ym icon-ym-generator-checkbox',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      optionType: 'default',
      border: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: '',
      props: {
        label: 'fullName',
        value: 'id'
      }
    },
    __slot__: {
      options: [{
        fullName: '选项一',
        id: "1"
      }, {
        fullName: '选项二',
        id: "2"
      }]
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'select',
      label: '下拉框组',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-select',
      tagIcon: 'icon-ym icon-ym-generator-select',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: '',
      props: {
        label: 'fullName',
        value: 'id'
      }
    },
    __slot__: {
      options: [{
        fullName: '选项一',
        id: "1"
      }, {
        fullName: '选项二',
        id: "2"
      }]
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
      blur: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'cascader',
      label: '级联选择',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-cascader',
      tagIcon: 'icon-ym icon-ym-generator-cascader',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: ''
    },
    options: [{
      id: "1",
      fullName: '选项1',
      children: [{
        id: "2",
        fullName: '选项1-1'
      }]
    }],
    placeholder: '请选择',
    props: {
      props: {
        multiple: false,
        value: 'id',
        label: 'fullName',
        children: 'children'
      }
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
      blur: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'date',
      label: '日期选择',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-date-picker',
      tagIcon: 'icon-ym icon-ym-generator-date',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
      blur: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    type: 'date',
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'time',
      label: '时间选择',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-time-picker',
      tagIcon: 'icon-ym icon-ym-generator-time',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
      blur: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'uploadImg',
      label: '图片上传',
      labelWidth: undefined,
      showLabel: true,
      tag: 'JNPF-UploadImg',
      tagIcon: 'icon-ym icon-ym-generator-upload',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false,
    accept: '',
    showTip: false,
    fileSize: 5,
    sizeUnit: 'MB',
    limit: 9
  },
  {
    __config__: {
      jnpfKey: 'rate',
      label: '评分',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-rate',
      tagIcon: 'icon-ym icon-ym-generator-rate',
      defaultValue: 0,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    max: 5,
    allowHalf: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'slider',
      label: '滑块',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-slider',
      tagIcon: 'icon-ym icon-ym-generator-slider',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1
  },
  {
    __config__: {
      jnpfKey: 'JNPFText',
      label: '文本',
      labelWidth: undefined,
      showLabel: false,
      tag: 'JNPF-Text',
      tagIcon: 'icon-ym icon-ym-generator-textarea',
      defaultValue: '这是一段文字',
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    style: { width: '100%' },
    textStyle: {
      "color": '#000000',
      'text-align': 'left',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
      'line-height': 32,
      'font-size': 12
    }
  },
  {
    __config__: {
      jnpfKey: 'editor',
      label: '富文本',
      showLabel: true,
      labelWidth: undefined,
      tag: 'JNPF-Quill',
      tagIcon: 'icon-ym icon-ym-generator-rich-text',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    placeholder: '请输入'
  }
]

// 高级控件 【左面板】
export const selectComponents = [{
    __config__: {
      jnpfKey: 'comSelect',
      label: '组织组件',
      labelWidth: undefined,
      showLabel: true,
      tag: 'com-select',
      tagIcon: 'icon-ym icon-ym-generator-company',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'depSelect',
      label: '部门组件',
      labelWidth: undefined,
      showLabel: true,
      tag: 'dep-select',
      tagIcon: 'icon-ym icon-ym-generator-department',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'posSelect',
      label: '岗位组件',
      labelWidth: undefined,
      showLabel: true,
      tag: 'pos-select',
      tagIcon: 'icon-ym icon-ym-generator-jobs',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    multiple: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'userSelect',
      label: '用户组件',
      labelWidth: undefined,
      showLabel: true,
      tag: 'user-select',
      tagIcon: 'icon-ym icon-ym-generator-user',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    multiple: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'treeSelect',
      label: '树形选择',
      labelWidth: undefined,
      showLabel: true,
      tag: 'JNPFTreeSelect',
      tagIcon: 'icon-ym icon-ym-generator-tree',
      defaultValue: null,
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      dataType: 'static',
      dictionaryType: '',
      propsUrl: ''
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    props: {
      props: {
        value: 'id',
        label: 'fullName',
        children: 'children'
      }
    },
    options: [{
      id: "1",
      fullName: '选项1',
      children: [{
        id: "2",
        fullName: '选项1-1'
      }]
    }],
    disabled: false
  },
  {
    __config__: {
      jnpfKey: 'billRule',
      label: '单据组件',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-documents',
      defaultValue: null,
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false,
      rule: ''
    }
  },
  {
    __config__: {
      jnpfKey: 'table',
      label: '设计子表',
      showLabel: false,
      layout: 'rowFormItem',
      tag: 'JNPF-InputTable',
      tagIcon: 'icon-ym icon-ym-generator-table',
      defaultValue: [],
      dragDisabled: false,
      showTitle: true,
      type: 'table',
      rowType: 'table',
      children: [],
      tableName: ''
    },
    actionText: '添加',
    'show-summary': false,
    tableConf: {},
    defaultValue: []
  },
  {
    __config__: {
      jnpfKey: 'address',
      label: '省市区',
      labelWidth: undefined,
      showLabel: true,
      tag: 'JNPF-Address',
      tagIcon: 'icon-ym icon-ym-generator-Provinces',
      defaultValue: [],
      required: false,
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    disabled: false,
    level: 2
  },
  {
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
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    modelId: '',
    relationField: '',
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    filterable: false,
    disabled: false
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
      tableName: ''
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    placeholder: '请选择',
    interfaceId: '',
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    propsValue: 'id',
    relationField: 'fullName',
    disabled: false,
  }
]

// 系统控件 【左面板】
export const systemComponents = [{
    __config__: {
      jnpfKey: 'createUser',
      label: '创建人员',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-founder',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'createTime',
      label: '创建时间',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-createtime',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'modifyUser',
      label: '修改人员',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-modifier',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'modifyTime',
      label: '修改时间',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-modifytime',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false
    }
  },
  {
    __config__: {
      jnpfKey: 'currOrganize',
      label: '所属组织',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-company',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false
    },
    showLevel: 'last',
  },
  {
    __config__: {
      jnpfKey: 'currPosition',
      label: '所属岗位',
      labelWidth: undefined,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'icon-ym icon-ym-generator-station',
      defaultValue: '',
      layout: 'colFormItem',
      span: 24,
      tableName: '',
      dragDisabled: false,
      noShow: false
    }
  }
]

// 布局控件 【左面板】
export const layoutComponents = [{
    __config__: {
      jnpfKey: 'groupTitle',
      label: '分组标题',
      labelWidth: undefined,
      showLabel: false,
      tag: 'groupTitle',
      tagIcon: 'icon-ym icon-ym-generator-group',
      defaultValue: null,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    content: "分组标题",
    'content-position': "left"
  },
  {
    __config__: {
      jnpfKey: 'card',
      label: '卡片容器',
      showLabel: false,
      tag: 'el-card',
      tagIcon: 'icon-ym icon-ym-generator-card',
      defaultValue: [],
      layout: 'rowFormItem',
      dragDisabled: false,
      children: []
    },
    header: '卡片容器',
    shadow: 'always'
  },
  {
    __config__: {
      jnpfKey: 'tab',
      label: '标签面板',
      showLabel: false,
      tag: 'el-tab',
      tagIcon: 'icon-ym icon-ym-generator-label',
      layout: 'rowFormItem',
      span: '24',
      dragDisabled: false,
      children: [{
        title: 'Tab 1',
        __config__: {
          children: []
        }
      }, {
        title: 'Tab 2',
        __config__: {
          children: []
        }
      }],
      active: 0
    },
    on: {
      "tab-click": '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    type: '',
    "tab-position": "top"
  },
  {
    __config__: {
      jnpfKey: 'collapse',
      label: '折叠面板',
      showLabel: false,
      tag: 'el-collapse',
      tagIcon: 'icon-ym icon-ym-generator-fold',
      layout: 'rowFormItem',
      span: '24',
      dragDisabled: false,
      children: [{
        title: '面板1',
        name: '1',
        __config__: {
          children: []
        }
      }, {
        title: '面板2',
        name: '2',
        __config__: {
          children: []
        }
      }],
      active: ['1']
    },
    on: {
      change: '({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}',
    },
    accordion: false
  }
]