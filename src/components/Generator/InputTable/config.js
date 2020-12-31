export const trigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change',
}
// forceProp 强制使用的属性 用于覆盖用户或者默认设置
export const useableProps = [{
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "type",
      "label",
      "tag",
      "clearable",
      "maxlength",
      "readonly",
      "disabled",
      "required",
      "regList"
    ],
    "forceProp": {
      "min-width": 180
    },
    "tag": "el-input",
    jnpfKey: 'comInput'
  },
  {
    "props": [
      // "__vModel__",
      "label",
      "tag",
      "defaultValue",
      "max",
      "allow-half",
      "show-text",
      "show-score",
      "disabled",
      "required"
    ],
    "forceProp": {
      "min-width": 160
    },
    "tag": "el-rate"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "step-strictly",
      "disabled",
      "required",
      "regList"
    ],
    "forceProp": {
      "controls": false,
      "min-width": 180
    },
    "tag": "el-input-number"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "disabled",
      "required",
      "regList"
    ],
    "forceProp": {
      "controls": false,
      "min-width": 120
    },
    "tag": "fc-amount"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "clearable",
      "disabled",
      "required",
      "filterable",
      "multiple",
      "options",
      "regList"
    ],
    "forceProp": {
      "min-width": 140
    },
    "tag": "el-select"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "props",
      "show-all-levels",
      "disabled",
      "clearable",
      "filterable",
      "required",
      "options",
      "dataType",
      "separator",
      "regList"
    ],
    "forceProp": {
      "min-width": 170
    },
    "tag": "el-cascader"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "optionType",
      "border",
      "size",
      "disabled",
      "required",
      "options",
      "regList"
    ],
    "forceProp": {
      "min-width": 140
    },
    "tag": "el-radio-group"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "optionType",
      "border",
      "size",
      "disabled",
      "required",
      "options",
      "regList"
    ],
    "forceProp": {
      "min-width": 140
    },
    "tag": "el-checkbox-group"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "disabled",
      "required",
      "min",
      "max",
      "step",
      "show-stops",
      "range",
      "regList"
    ],
    "forceProp": {
      "min-width": 160
    },
    "tag": "el-slider"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "tabList",
      "buttonType",
      "title",
      "searchable",
      "maxNum",
      "tagConfig",
      "disabled",
      "required",
      "regList"
    ],
    "forceProp": {
      "buttonType": "input",
      "min-width": 100
    },
    "tag": "org-select"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "disabled",
      "clearable",
      "required",
      "picker-options",
      "format",
      "value-format",
      "regList"
    ],
    "forceProp": {
      "min-width": 120
    },
    "tag": "el-time-picker"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "disabled",
      "clearable",
      "required",
      "is-range",
      "range-separator",
      "format",
      "value-format",
      "regList"
    ],
    "forceProp": {
      "min-width": 200
    },
    "tag": "fc-time-duration"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "type",
      "disabled",
      "clearable",
      "required",
      "format",
      "value-format",
      "readonly",
      "regList"
    ],
    "forceProp": {
      "min-width": 120
    },
    "tag": "el-date-picker"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "defaultValue",
      "type",
      "range-separator",
      "disabled",
      "clearable",
      "required",
      "format",
      "value-format",
      "readonly",
      "regList"
    ],
    "forceProp": {
      "min-width": 210
    },
    "tag": "fc-date-duration"
  },
  {
    "props": [
      "__vModel__",
      "defaultValue",
      "formId",
      "label",
      "tag",
      "action",
      "defaultValue",
      "disabled",
      "required",
      "accept",
      "name",
      "auto-upload",
      "showTip",
      "fileSize",
      "sizeUnit",
      "list-type",
      "multiple",
      "regList"
    ],
    "forceProp": {
      "list-type": "text",
      "min-width": 80,
      "defaultValue": [],
    },
    "tag": "el-upload"
  },
  {
    "props": [
      "label",
      "type",
      "tag",
      "showChinese",
      "defaultValue",
      "labelWidth",
      "disabled",
      "required",
      "expression",
      "__vModel__",
      "precision",
      "round",
      "formId",
      "formData"
    ],
    "forceProp": {
      "min-width": 120,
      "showChinese": false
    },
    "tag": "fc-calculate"
  },

]