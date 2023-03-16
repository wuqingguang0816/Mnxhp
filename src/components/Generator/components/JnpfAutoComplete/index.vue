<template>
  <el-autocomplete v-model="innerValue" :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder" @select="handleSelect" :disabled="disabled"
    popper-class="sale-order-popper">
    <template slot-scope="{ item }">
      <div class="sale-order-popper-item">
        <span>{{ item[relationField] }}</span>
      </div>
    </template>
  </el-autocomplete>
</template>
<script>
import { getDataInterfaceDataSelect } from '@/api/systemData/dataInterface'
export default {
  name: 'JnpfAutoComplete',
  components: {},
  props: {
    value: {
      default: undefined
    },
    formData: {
      type: Object
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    templateJson: {
      type: Array,
      default: () => []
    },
    interfaceId: {
      type: String,
      default: ''
    },
    propsValue: {
      type: String,
      default: 'id'
    },
    relationField: {
      type: String,
      default: 'fullName'
    },
    total: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      innerValue: this.value,
      list: [],
      timeout: null
    }
  },
  watch: {
    value(val) {
      this.innerValue = val
    },
    innerValue(val) {
      this.$emit('input', this.innerValue)
      this.$emit('change', this.innerValue)
    }
  },
  mounted() {
  },
  created() {
  },
  mounted() { },
  methods: {
    getParamList() {
      let templateJson = this.templateJson
      for (let i = 0; i < templateJson.length; i++) {
        if (templateJson[i].relationField && this.formData) {
          if (templateJson[i].relationField.includes('-')) {
            let tableVModel = templateJson[i].relationField.split('-')[0]
            let childVModel = templateJson[i].relationField.split('-')[1]
            templateJson[i].defaultValue = this.formData[tableVModel] && this.formData[tableVModel][this.rowIndex] && this.formData[tableVModel][this.rowIndex][childVModel] || ''
          } else {
            templateJson[i].defaultValue = this.formData[templateJson[i].relationField] || ''
          }
        }
      }
      return templateJson
    },
    querySearchAsync(queryString, cb) {
      if (!this.interfaceId) return
      const paramList = this.getParamList()
      paramList.forEach(res => {
        res.relationField = res.relationField === '@keyword' ? queryString : res.relationField
      })
      let query = {
        interfaceId: this.interfaceId,
        propsValue: this.propsValue,
        relationField: this.relationField,
        paramList
      }
      getDataInterfaceDataSelect(this.interfaceId, query).then(res => {
        this.list = res.data.list || []
        cb(this.list.splice(this.total))
      }).catch(() => { })

    },
    handleSelect(item) {
      // console.log(item);
    }
  }

}
</script>
<style lang="scss" scoped>
.sale-order-popper {
  &.el-autocomplete-suggestion li {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
  .sale-order-popper-item {
    span {
      margin-right: 10px;
    }
    .name {
      color: #1890ff;
    }
  }
}
</style>