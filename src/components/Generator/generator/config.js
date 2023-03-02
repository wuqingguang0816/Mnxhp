// 表单属性【右面板】
export const formConf = {
  formRef: "formRef",
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
  logicalDelete: false,
  printId: "",
  formStyle: "",
  classNames: [],
  className: [],
  classJson: "",
  funcs: {
    onLoad:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
    beforeSubmit:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    return new Promise((resolve, reject) => {\n        // 在此编写代码\n        \n        // 继续执行\n        resolve()\n    })\n}",
    afterSubmit:
      "({ formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
  },
  idGlobal: 100
};

// 基础控件 【左面板】
export const inputComponents = [
  {
    __config__: {
      jnpfKey: "input",
      label: "单行输入",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfInput",
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
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    addonBefore: "",
    addonAfter: "",
    placeholder: "请输入",
    style: { width: "100%" },
    clearable: true,
    prefixIcon: "",
    suffixIcon: "",
    maxlength: null,
    showWordLimit: false,
    showPassword: false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "textarea",
      label: "多行输入",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfTextarea",
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
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请输入",
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: "100%" },
    maxlength: null,
    showWordLimit: false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "inputNumber",
      label: "数字输入",
      showLabel: true,
      labelWidth: undefined,
      tag: "JnpfInputNumber",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: null },
    placeholder: "请输入",
    min: undefined,
    max: undefined,
    step: 1,
    stepStrictly: false,
    precision: undefined,
    controlsPosition: "",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "switch",
      label: "开关",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfSwitch",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    activeTxt: "开",
    inactiveTxt: "关",
    activeColor: null,
    inactiveColor: null,
    activeValue: 1,
    inactiveValue: 0
  },
  {
    __config__: {
      jnpfKey: "radio",
      label: "单选框组",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfRadio",
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
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      propsName: "",
      templateJson: [],
    },
    options: [
      {
        fullName: "选项一",
        id: "1"
      },
      {
        fullName: "选项二",
        id: "2"
      }
    ],
    props: {
      label: "fullName",
      value: "id"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    optionType: "default",
    border: false,
    size: "small",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "checkbox",
      label: "多选框组",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfCheckbox",
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
      dataType: "static",
      dictionaryType: "",
      propsUrl: "",
      propsName: "",
      templateJson: [],
    },
    options: [
      {
        fullName: "选项一",
        id: "1"
      },
      {
        fullName: "选项二",
        id: "2"
      }
    ],
    props: {
      label: "fullName",
      value: "id"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    optionType: "default",
    border: false,
    size: "small",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "select",
      label: "下拉选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfSelect",
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
      templateJson: [],
    },
    options: [
      {
        fullName: "选项一",
        id: "1"
      },
      {
        fullName: "选项二",
        id: "2"
      }
    ],
    props: {
      label: "fullName",
      value: "id"
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
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
      tag: "JnpfCascader",
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
      templateJson: [],
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    props: {
      multiple: false,
      value: "id",
      label: "fullName",
      children: "children"
    },
    showAllLevels: true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: "/"
  },
  {
    __config__: {
      jnpfKey: "datePicker",
      label: "日期选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfDatePicker",
      tagIcon: "icon-ym icon-ym-generator-date",
      className: [],
      defaultValue: null,
      defaultCurrent: false,
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    type: "date",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    format: "yyyy-MM-dd",
    valueFormat: "timestamp",
    readonly: false
  },
  {
    __config__: {
      jnpfKey: "timePicker",
      label: "时间选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfTimePicker",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}",
      blur:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    placeholder: "请选择",
    style: { width: "100%" },
    disabled: false,
    clearable: true,
    readonly: false,
    pickerOptions: {
      selectableRange: "00:00:00-23:59:59"
    },
    format: "HH:mm:ss",
    valueFormat: "HH:mm:ss"
  },
  {
    __config__: {
      jnpfKey: "uploadFile",
      label: "文件上传",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfUploadFile",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    accept: "",
    fileSize: 10,
    sizeUnit: "MB",
    buttonText: "点击上传",
    showTip: false,
    pathType: "defaultPath",
    isAccount: 0,
    folder: "",
    limit: 9
  },
  {
    __config__: {
      jnpfKey: "uploadImg",
      label: "图片上传",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfUploadImg",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    disabled: false,
    accept: "",
    showTip: false,
    fileSize: 10,
    sizeUnit: "MB",
    pathType: "defaultPath",
    isAccount: 0,
    folder: "",
    limit: 9
  },
  {
    __config__: {
      jnpfKey: "colorPicker",
      label: "颜色选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfColorPicker",
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
    showAlpha: false,
    colorFormat: '',
    disabled: false,
    size: "small"
  },
  {
    __config__: {
      jnpfKey: "rate",
      label: "评分",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfRate",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: {},
    max: 5,
    allowHalf: false,
    showText: false,
    showScore: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "slider",
      label: "滑块",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfSlider",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    showStops: false,
    range: false
  },
  {
    __config__: {
      jnpfKey: "editor",
      label: "富文本",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfEditor",
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
    style: { width: "100%" },
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
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
      tag: "JnpfButton",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    align: "left",
    buttonText: "按钮",
    type: "",
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "text",
      label: "文本",
      labelWidth: undefined,
      showLabel: false,
      tag: "JnpfText",
      tagIcon: "icon-ym icon-ym-generator-textarea",
      className: [],
      defaultValue: undefined,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    textStyle: {
      color: "#000000",
      "text-align": "left",
      "font-weight": "normal",
      "font-style": "normal",
      "text-decoration": "none",
      "line-height": 32,
      "font-size": 12
    },
    content: '这是一段文字',
  },
  {
    __config__: {
      jnpfKey: "alert",
      label: "提示",
      labelWidth: undefined,
      showLabel: false,
      tag: "JnpfAlert",
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
    showIcon: false,
    closable: false
  },
];

// 高级控件 【左面板】
export const selectComponents = [
  {
    __config__: {
      jnpfKey: "organizeSelect",
      label: "组织选择",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfOrganizeSelect",
      tagIcon: "icon-ym icon-ym-generator-company",
      className: [],
      defaultValue: [],
      defaultCurrent: false,
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
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
      tag: "JnpfDepSelect",
      tagIcon: "icon-ym icon-ym-generator-department",
      className: [],
      defaultValue: null,
      defaultCurrent: false,
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
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
      tag: "JnpfPosSelect",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
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
      tag: "JnpfUserSelect",
      tagIcon: "icon-ym icon-ym-generator-user",
      className: [],
      defaultValue: null,
      defaultCurrent: false,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"],
      tableName: "",
      regList: [],
      trigger: "click",
      relationField: '',
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    placeholder: "请选择",
    selectType: 'all',
    ableRelationIds: [],
    ableDepIds: [],
    ablePosIds: [],
    ableUserIds: [],
    ableRoleIds: [],
    ableGroupIds: [],
    relationField: '',
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
      tag: "JnpfRoleSelect",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
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
      tag: "JnpfGroupSelect",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    placeholder: "请选择",
    multiple: false,
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "usersSelect",
      label: "用户组件",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfUsersSelect",
      tagIcon: "icon-ym icon-ym-generator-founder",
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
    ableIds: [],
    multiple: false,
    clearable: true,
    disabled: false
  },
  {
    __config__: {
      jnpfKey: "table",
      label: "设计子表",
      showLabel: false,
      tagIcon: "icon-ym icon-ym-generator-table",
      className: [],
      tag: "JnpfInputTable",
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
    showSummary: false,
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
      jnpfKey: "treeSelect",
      label: "下拉树形",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfTreeSelect",
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
      propsName: "",
      templateJson: [],
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    placeholder: "请选择",
    props: {
      value: "id",
      label: "fullName",
      children: "children"
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
      tag: "JnpfPopupTableSelect",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    placeholder: "请选择",
    interfaceId: "",
    interfaceName: "",
    templateJson: [],
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
      jnpfKey: "areaSelect",
      label: "省市区域",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfAreaSelect",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    placeholder: "请选择",
    disabled: false,
    clearable: true,
    filterable: false,
    multiple: false,
    level: 2
  },
  {
    __config__: {
      jnpfKey: "billRule",
      label: "单据组件",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfInput",
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
    style: { width: "100%" },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      jnpfKey: "relationForm",
      label: "关联表单",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfRelationForm",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
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
      tag: "JnpfPopupSelect",
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
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    style: { width: "100%" },
    placeholder: "请选择",
    interfaceId: "",
    interfaceName: "",
    templateJson: [],
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
      tag: "JnpfRelationFormAttr",
      tagIcon: "icon-ym icon-ym-generator-nature",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    style: { width: "100%" },
    showField: "",
    relationField: "",
    isStorage: 0,
  },
  {
    __config__: {
      jnpfKey: "popupAttr",
      label: "弹窗选择属性",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfPopupAttr",
      tagIcon: "icon-ym icon-ym-generator-popup-attr",
      className: [],
      defaultValue: "",
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    style: { width: "100%" },
    showField: "",
    relationField: "",
    isStorage: 0,
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
      tag: "JnpfOpenData",
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
    style: { width: "100%" },
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
      tag: "JnpfOpenData",
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
    style: { width: "100%" },
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
      tag: "JnpfInput",
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
    style: { width: "100%" },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      jnpfKey: "modifyTime",
      label: "修改时间",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfInput",
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
    style: { width: "100%" },
    readonly: true,
    placeholder: "系统自动生成"
  },
  {
    __config__: {
      jnpfKey: "currOrganize",
      label: "所属组织",
      labelWidth: undefined,
      showLabel: true,
      tag: "JnpfOpenData",
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
    style: { width: "100%" },
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
      tag: "JnpfOpenData",
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
    style: { width: "100%" },
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
      tag: "JnpfGroupTitle",
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
    contentPosition: 'left'
  },
  {
    __config__: {
      jnpfKey: "divider",
      label: "分割线",
      labelWidth: undefined,
      showLabel: false,
      tag: "JnpfDivider",
      tagIcon: "icon-ym icon-ym-generator-divider",
      className: [],
      defaultValue: null,
      required: false,
      layout: "colFormItem",
      span: 24,
      dragDisabled: false,
      visibility: ["pc", "app"]
    },
    content: '我是分割线',
    contentPosition: 'center'
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
            jnpfKey: "collapseItem",
            children: [],
          }
        },
        {
          title: "面板2",
          name: "2",
          __config__: {
            jnpfKey: "collapseItem",
            children: [],
          }
        }
      ],
      active: ["1"]
    },
    on: {
      change:
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
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
            jnpfKey: "tabItem",
            children: [],
          }
        },
        {
          title: "Tab 2",
          __config__: {
            jnpfKey: "tabItem",
            children: [],
          }
        }
      ],
      active: 0
    },
    on: {
      "tab-click":
        "({ data, formData, setFormData, setShowOrHide, setRequired, setDisabled, request }) => {\n    // 在此编写代码\n    \n}"
    },
    type: "",
    tabPosition: 'top',
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
