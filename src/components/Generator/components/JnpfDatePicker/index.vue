<template>
  <el-date-picker :type="type" v-model="innerValue" placeholder="请选择" :value-format="valueFormat"
    :picker-options='pickerOptions' :format="format" @change="change" :disabled="disabled"
    :clearable="clearable" :readonly="readOnly" :key="key"></el-date-picker>
</template>
<script>
export default {
  name: 'JNPF-date-picker',
  components: {},
  props: {
    activeData: {
      default: undefined
    },
    value: {
      default: undefined
    },
    defaultCurrent: {
      type: Boolean,
      default: false
    },
    valueFormat: {
      default: undefined
    },
    format: {
      default: undefined
    },
    startTime: {
      default: undefined
    },
    endTime: {
      default: undefined
    },
    type: {
      type: String,
      default: 'date'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      innerValue: this.value,
      key: +new Date()
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
    format() {
      this.key = +new Date()
    }
  },
  computed: {
    readOnly() {
      if (this.readonly) return true
      if (this.startTime && this.endTime && (this.startTime > this.endTime)) return true
      return false
    },
    pickerOptions() {
      let _this = this
      return {
        disabledDate(time) {
          if (_this.startTime) {
            let startTime = _this.jnpf.toDate(_this.startTime, "yyyy-MM-dd 00:00:00")
            _this.startTime = new Date(startTime).getTime()
          }
          if (_this.endTime) {
            let endTime = _this.jnpf.toDate(_this.endTime, "yyyy-MM-dd 00:00:00")
            _this.endTime = new Date(endTime).getTime()
          }

          if (!_this.startTime && !_this.endTime) return false
          if (_this.endTime) {
            return time.getTime() < _this.startTime || time.getTime() > _this.endTime
          } else {
            return time.getTime() < _this.startTime
          }
        }
      }
    }
  },
  created() { },
  mounted() { },
  methods: {
    change(val) {
      if (this.format == 'yyyy-MM-dd' || this.format == 'yyyy-MM' || this.format == 'yyyy') return this.innerValue = val
      if (val < this.startTime) this.innerValue = ''
    }
  }

}
</script>
<style lang="scss" scoped>
</style>