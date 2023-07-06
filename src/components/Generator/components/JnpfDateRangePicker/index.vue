<template>
  <el-date-picker :type="type === 'year' ? 'monthrange' : (type + 'range')" v-model="innerValue"
    placeholder="请选择" :value-format="valueFormat" :range-separator="separator"
    :picker-options='pickerOptions' style="width:100%" :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder" :format="type === 'year'?'yyyy':format"></el-date-picker>
</template>
<script>
export default {
  name: 'JNPF-date-picker',
  components: {},
  props: {
    value: {
      default: undefined
    },
    valueFormat: {
      default: undefined
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    separator: {
      type: String,
      default: '-'
    },
    startTime: {
      default: undefined
    },
    endTime: {
      default: undefined
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    type: {
      type: String,
      default: 'datetime'
    }
  },
  data() {
    return {
      innerValue: this.value,
      pickerOptions: {
        disabledDate: (time) => {
          if (this.type == 'year') return time.getMonth() + 1 != 1
        },
      }
    }
  },
  watch: {
    innerValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value(val) {
      this.innerValue = val
    },
  }
}
</script>