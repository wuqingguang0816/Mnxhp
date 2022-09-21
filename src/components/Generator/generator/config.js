// 表单属性【右面板】
export const formConf = {
  formRef: "elForm",
  formModel: "dataForm",
  size: "small",
  labelPosition: "right",
  labelWidth: 100,
  formRules: "rules",
  popupType: "general",
  generalWidth: "600px",
  fullScreenWidth: "100%",
  drawerWidth: "600px",
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: false,
  hasCancelBtn: true,
  cancelButtonText: "取 消",
  hasConfirmBtn: true,
  confirmButtonText: "确 定",
  hasPrintBtn: false,
  printButtonText: "打 印",
  primaryKeyPolicy: 1,
  concurrencyLock: false,
  printId: "",
  formStyle: "",
  classNames: [],
  classJson: "",
  funcs: {
    onLoad:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
    beforeSubmit:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    return new Promise((resolve, reject) => {\n        // 在此编写代码\n        \n        // 继续执行\n        resolve()\n    })\n}",
    afterSubmit:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
  },
  idGlobal: 100
};

// 基础控件 【左面板】
export const inputComponents = [
  {
    __config__: {
      jnpfKey: "comInput",
      label: "单行输入",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-input",
      className: [],
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false,
      unique: false,
      regList: [],
      trigger: "blur"
    },
    __slot__: {
      prepend: "",
      append: ""
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请输入",
    style: { width: "100%" },
    clearable: true,
    "prefix-icon": "",
    "suffix-icon": "",
    maxlength: null,
    "show-word-limit": false,
    "show-password": false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "textarea",
      label: "多行输入",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-textarea",
      className: [],
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "blur"
    },
    type: "textarea",
    placeholder: "请输入",
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: "100%" },
    maxlength: null,
    "show-word-limit": true,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "numInput",
      label: "数字输入",
      showLabel: true,
      labelWidth: undefined,
      tag: "el-input-number",
      tagIcon: "icon-ym icon-ym-generator-number",
      className: [],
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: ["blur", "change"]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "数字文本",
    min: undefined,
    max: undefined,
    step: 1,
    "step-strictly": false,
    precision: undefined,
    "controls-position": "",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "switch",
      label: "开关",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-switch",
      tagIcon: "icon-ym icon-ym-generator-switch",
      className: [],
      defaultValue: false,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    activeTxt: "开",
    inactiveTxt: "关",
    "active-color": null,
    "inactive-color": null,
    "active-value": 1,
    "inactive-value": 0
  },
  {
    __config__: {
      jnpfKey: "radio",
      label: "单选框组",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-radio-group",
      tagIcon: "icon-ym icon-ym-generator-radio",
      className: [],
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      optionType: "default",
      border: false,
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      propsName: "",
      props: {
        label: "fullName",
        value: "id"
      }
    },
    __slot__: {
      options: [
        {
          fullName: "选项一",
          id: "1"
        },
        {
          fullName: "选项二",
          id: "2"
        }
      ]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    size: "small",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "checkbox",
      label: "多选框组",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-checkbox-group",
      tagIcon: "icon-ym icon-ym-generator-checkbox",
      className: [],
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      optionType: "default",
      border: false,
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      propsName: "",
      props: {
        label: "fullName",
        value: "id"
      }
    },
    __slot__: {
      options: [
        {
          fullName: "选项一",
          id: "1"
        },
        {
          fullName: "选项二",
          id: "2"
        }
      ]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    size: "small",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "select",
      label: "下拉选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-select",
      tagIcon: "icon-ym icon-ym-generator-select",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      propsName: "",
      props: {
        label: "fullName",
        value: "id"
      }
    },
    __slot__: {
      options: [
        {
          fullName: "选项一",
          id: "1"
        },
        {
          fullName: "选项二",
          id: "2"
        }
      ]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    __config__: {
      jnpfKey: "cascader",
      label: "级联选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-cascader",
      tagIcon: "icon-ym icon-ym-generator-cascader",
      className: [],
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      dataType: "static",
      propsUrl: "",
      propsName: "",
      dictionaryType: ""
    },
    options: [
      {
        id: "1",
        fullName: "选项1",
        children: [
          {
            id: "2",
            fullName: "选项1-1"
          }
        ]
      }
    ],
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    props: {
      props: {
        multiple: false,
        value: "id",
        label: "fullName",
        children: "children"
      }
    },
    "show-all-levels": true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: "/"
  },
  {
    __config__: {
      jnpfKey: "date",
      label: "日期选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-date-picker",
      tagIcon: "icon-ym icon-ym-generator-date",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    type: "date",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    format: "yyyy-MM-dd",
    "value-format": "timestamp",
    readonly: false
  },
  {
    __config__: {
      jnpfKey: "time",
      label: "时间选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-time-picker",
      tagIcon: "icon-ym icon-ym-generator-time",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    readonly: false,
    "picker-options": {
      selectableRange: "00:00:00-23:59:59"
    },
    format: "HH:mm:ss",
    "value-format": "HH:mm:ss"
  },
  {
    __config__: {
      jnpfKey: "uploadFz",
      label: "文件上传",
      labelWidth: undefined,
      showLabel: true,
      tag: "JNPF-UploadFz",
      tagIcon: "icon-ym icon-ym-generator-upload",
      className: [],
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    accept: "",
    fileSize: 10,
    sizeUnit: "MB",
    buttonText: "点击上传",
    showTip: false,
    limit: 9
  },
  {
    __config__: {
      jnpfKey: "uploadImg",
      label: "图片上传",
      labelWidth: undefined,
      showLabel: true,
      tag: "JNPF-UploadImg",
      tagIcon: "icon-ym icon-ym-generator-upload",
      className: [],
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    accept: "",
    showTip: false,
    fileSize: 10,
    sizeUnit: "MB",
    limit: 9
  },
  {
    __config__: {
      jnpfKey: "colorPicker",
      label: "颜色选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-color-picker",
      tagIcon: "icon-ym icon-ym-generator-color",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    "show-alpha": false,
    "color-format": "",
    disabled: false,
    size: "small"
  },
  {
    __config__: {
      jnpfKey: "rate",
      label: "评分",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-rate",
      tagIcon: "icon-ym icon-ym-generator-rate",
      className: [],
      defaultValue: 0,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    max: 5,
    "allow-half": false,
    "show-text": false,
    "show-score": false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "slider",
      label: "滑块",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-slider",
      tagIcon: "icon-ym icon-ym-generator-slider",
      className: [],
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    "show-stops": false,
    range: false
  },
  {
    __config__: {
      jnpfKey: "editor",
      label: "富文本",
      labelWidth: undefined,
      showLabel: true,
      tag: "JNPF-Quill",
      tagIcon: "icon-ym icon-ym-generator-rich-text",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "blur"
    },
    placeholder: "请输入"
  },
  {
    __config__: {
      jnpfKey: "link",
      label: "链接",
      labelWidth: undefined,
      showLabel: false,
      tag: "JnpfLink",
      tagIcon: "icon-ym icon-ym-generator-link",
      className: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    on: {
      click:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    content: '文本链接',
    href: "",
    target: "_self",
    textStyle: {
      "text-align": "left",
    }
  },
  {
    __config__: {
      jnpfKey: "button",
      label: "按钮",
      labelWidth: undefined,
      showLabel: false,
      tag: "jnpf-button",
      tagIcon: "icon-ym icon-ym-generator-button",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      regList: [],
      trigger: "click"
    },
    on: {
      click:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    align: "left",
    buttonText: "按钮",
    type: "",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "JNPFText",
      label: "文本",
      labelWidth: undefined,
      showLabel: false,
      tag: "JNPF-Text",
      tagIcon: "icon-ym icon-ym-generator-textarea",
      className: [],
      defaultValue: "这是一段文字",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    style: { width: "100%" },
    textStyle: {
      color: "#000000",
      "text-align": "left",
      "font-weight": "normal",
      "font-style": "normal",
      "text-decoration": "none",
      "line-height": 32,
      "font-size": 12
    }
  },
  {
    __config__: {
      jnpfKey: "alert",
      label: "提示",
      labelWidth: undefined,
      showLabel: false,
      tag: "el-alert",
      tagIcon: "icon-ym icon-ym-generator-alert",
      className: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    title: '这是一个提示',
    type: "success",
    "show-icon": false,
    closable: false
  },
];

// 高级控件 【左面板】
export const selectComponents = [
  {
    __config__: {
      jnpfKey: "comSelect",
      label: "组织选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "com-select",
      tagIcon: "icon-ym icon-ym-generator-company",
      className: [],
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "depSelect",
      label: "部门选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "dep-select",
      tagIcon: "icon-ym icon-ym-generator-department",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    selectType: 'all',
    ableDepIds: [],
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "posSelect",
      label: "岗位选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "pos-select",
      tagIcon: "icon-ym icon-ym-generator-jobs",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    selectType: 'all',
    ableDepIds: [],
    ablePosIds: [],
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "userSelect",
      label: "用户选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "user-select",
      tagIcon: "icon-ym icon-ym-generator-user",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    selectType: 'all',
    ableDepIds: [],
    ablePosIds: [],
    ableUserIds: [],
    ableRoleIds: [],
    ableGroupIds: [],
    multiple: false,
    clearable: true,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "roleSelect",
      label: "角色选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "roleSelect",
      tagIcon: "icon-ym icon-ym-generator-role",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "groupSelect",
      label: "分组选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "groupSelect",
      tagIcon: "icon-ym icon-ym-generator-group1",
      className: [],
      defaultValue: '',
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "treeSelect",
      label: "下拉树形",
      labelWidth: undefined,
      showLabel: true,
      tag: "JNPFTreeSelect",
      tagIcon: "icon-ym icon-ym-generator-tree",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change",
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      propsName: ""
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    props: {
      props: {
        value: "id",
        label: "fullName",
        children: "children"
      }
    },
    options: [
      {
        id: "1",
        fullName: "选项1",
        children: [
          {
            id: "2",
            fullName: "选项1-1"
          }
        ]
      }
    ],
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "popupTableSelect",
      label: "下拉表格",
      labelWidth: undefined,
      showLabel: true,
      required: false,
      tag: "popupTableSelect",
      tagIcon: "icon-ym icon-ym-generator-popupTableSelect",
      className: [],
      defaultValue: "",
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    interfaceId: "",
    interfaceName: "",
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    propsValue: "id",
    relationField: "fullName",
    popupType: "popover",
    popupTitle: "选择数据",
    popupWidth: "800px",
    disabled: false,
    clearable: true,
    multiple: false,
    filterable: false
  },
  {
    __config__: {
      jnpfKey: "table",
      label: "设计子表",
      showLabel: false,
      tagIcon: "icon-ym icon-ym-generator-table",
      className: [],
      tag: "JNPF-InputTable",
      defaultValue: [],
      layout: "rowFormItem",
      dragDisabled: false,
      visibility: ["pc", "app"],
      showTitle: true,
      type: "table",
      rowType: "table",
      children: [],
      tableName: ""
    },
    disabled: false,
    actionText: "添加",
    "show-summary": false,
    addType: 0,
    addTableConf: {
      popupTitle: '选择数据',
      popupType: 'dialog',
      popupWidth: '800px',
      interfaceId: '',
      interfaceName: '',
      templateJson: [],
      hasPage: true,
      pageSize: 20,
      columnOptions: [],
      relationOptions: []
    },
    summaryField: [],
    tableConf: {},
    defaultValue: []
  },
  {
    __config__: {
      jnpfKey: "address",
      label: "省市区域",
      labelWidth: undefined,
      showLabel: true,
      tag: "JNPF-Address",
      tagIcon: "icon-ym icon-ym-generator-Provinces",
      className: [],
      defaultValue: [],
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    disabled: false,
    clearable: true,
    filterable: false,
    multiple: false,
    level: 2
  },
  {
    __config__: {
      jnpfKey: "relationForm",
      label: "关联表单",
      labelWidth: undefined,
      showLabel: true,
      tag: "relationForm",
      tagIcon: "icon-ym icon-ym-generator-menu",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    modelId: "",
    relationField: "",
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    clearable: true,
    popupType: "dialog",
    popupTitle: "选择数据",
    popupWidth: "800px",
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "popupSelect",
      label: "弹窗选择",
      labelWidth: undefined,
      showLabel: true,
      required: false,
      tag: "popupSelect",
      tagIcon: "icon-ym icon-ym-generator-popup",
      className: [],
      defaultValue: "",
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "change"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    interfaceId: "",
    interfaceName: "",
    hasPage: false,
    pageSize: 20,
    columnOptions: [],
    propsValue: "id",
    relationField: "fullName",
    popupType: "dialog",
    popupTitle: "选择数据",
    popupWidth: "800px",
    disabled: false,
    clearable: true
  },
  {
    __config__: {
      jnpfKey: "relationFormAttr",
      label: "关联表单属性",
      labelWidth: undefined,
      showLabel: true,
      tag: "relationFormAttr",
      tagIcon: "icon-ym icon-ym-generator-nature",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    showField: "",
    relationField: ""
  },
  {
    __config__: {
      jnpfKey: "popupAttr",
      label: "弹窗选择属性",
      labelWidth: undefined,
      showLabel: true,
      tag: "popupAttr",
      tagIcon: "icon-ym icon-ym-generator-popup-attr",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    showField: "",
    relationField: ""
  },
  {
    __config__: {
      jnpfKey: "billRule",
      label: "单据组件",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      defaultValue: "",
      tagIcon: "icon-ym icon-ym-generator-documents",
      className: [],
      defaultValue: null,
      layout: "colFormItem",
      required: false,
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false,
      trigger: "change",
      rule: "",
      ruleName: "",
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
];

// 系统控件 【左面板】
export const systemComponents = [
  {
    __config__: {
      jnpfKey: "createUser",
      label: "创建人员",
      labelWidth: undefined,
      showLabel: true,
      tag: "jnpf-open-data",
      tagIcon: "icon-ym icon-ym-generator-founder",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    type: 'currUser',
    readonly: true,
    placeholder: ""
  },
  {
    __config__: {
      jnpfKey: "createTime",
      label: "创建时间",
      labelWidth: undefined,
      showLabel: true,
      tag: "jnpf-open-data",
      tagIcon: "icon-ym icon-ym-generator-createtime",
      className: [],
      defaultValue: "",
      layout: "colFormItem",
      required: false,
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    type: 'currTime',
    readonly: true,
    placeholder: ""
  },
  {
    __config__: {
      jnpfKey: "modifyUser",
      label: "修改人员",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-modifier",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      jnpfKey: "modifyTime",
      label: "修改时间",
      labelWidth: undefined,
      showLabel: true,
      tag: "el-input",
      tagIcon: "icon-ym icon-ym-generator-modifytime",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      jnpfKey: "currOrganize",
      label: "所属组织",
      labelWidth: undefined,
      showLabel: true,
      tag: "jnpf-open-data",
      tagIcon: "icon-ym icon-ym-generator-company",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    type: 'currOrganize',
    readonly: true,
    showLevel: "last",
    placeholder: ""
  },
  {
    __config__: {
      jnpfKey: "currPosition",
      label: "所属岗位",
      labelWidth: undefined,
      showLabel: true,
      tag: "jnpf-open-data",
      tagIcon: "icon-ym icon-ym-generator-station",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      noShow: false
    },
    type: 'currPosition',
    readonly: true,
    placeholder: ""
  }
];

// 布局控件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      jnpfKey: "groupTitle",
      label: "分组标题",
      labelWidth: undefined,
      showLabel: false,
      tag: "groupTitle",
      tagIcon: "icon-ym icon-ym-generator-group",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    content: "分组标题",
    "content-position": "left"
  },
  {
    __config__: {
      jnpfKey: "divider",
      label: "分割线",
      labelWidth: undefined,
      showLabel: false,
      tag: "el-divider",
      tagIcon: "icon-ym icon-ym-generator-divider",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    __slot__: {
      default: "我是分割线"
    },
    "content-position": "center"
  },
  {
    __config__: {
      jnpfKey: "collapse",
      label: "折叠面板",
      showLabel: false,
      tag: "el-collapse",
      tagIcon: "icon-ym icon-ym-generator-fold",
      className: [],
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      children: [
        {
          title: "面板1",
          name: "1",
          __config__: {
            children: []
          }
        },
        {
          title: "面板2",
          name: "2",
          __config__: {
            children: []
          }
        }
      ],
      active: ["1"]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    accordion: false
  },
  {
    __config__: {
      jnpfKey: "tab",
      label: "标签面板",
      showLabel: false,
      tag: "el-tab",
      tagIcon: "icon-ym icon-ym-generator-label",
      className: [],
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      children: [
        {
          title: "Tab 1",
          __config__: {
            children: []
          }
        },
        {
          title: "Tab 2",
          __config__: {
            children: []
          }
        }
      ],
      active: 0
    },
    on: {
      "tab-click":
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request, getFieldOptions, setFieldOptions }) => {\n    // 在此编写代码\n    \n}"
    },
    type: "",
    "tab-position": "top"
  },
  {
    __config__: {
      jnpfKey: "row",
      label: "栅格容器",
      tagIcon: "icon-ym icon-ym-generator-layout",
      className: [],
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      layoutTree: true,
      rowType: "layout"
    },
    type: "default",
    justify: "start",
    align: "top"
  },
  {
    __config__: {
      jnpfKey: "card",
      label: "卡片容器",
      showLabel: false,
      tag: "el-card",
      tagIcon: "icon-ym icon-ym-generator-card",
      className: [],
      defaultValue: [],
      layout: "rowFormItem",
      span: "24",
      dragDisabled: false,
      visibility: ["pc", "app"],
      children: []
    },
    header: "卡片容器",
    shadow: "always"
  },
];
