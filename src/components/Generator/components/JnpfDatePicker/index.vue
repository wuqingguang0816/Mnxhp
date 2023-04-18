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
      key: +new Date(),
      innerStartTime: this.startTime,
      innerEndTime: this.endTime
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
    },
    startTime(val) {
      this.innerStartTime = val
    },
    endTime(val) {
      this.innerEndTime = val
    },

  },
  computed: {
    readOnly() {
      if (this.readonly) return true
      if (this.innerStartTime && this.innerEndTime && (this.innerStartTime > this.innerEndTime)) return true
      return false
    },
    pickerOptions() {
      let _this = this
      return {
        disabledDate(time) {
          if (_this.innerStartTime) {
            let innerStartTime = _this.jnpf.toDate(_this.innerStartTime, 'yyyy-MM-dd 00:00:00')
            _this.innerStartTime = new Date(innerStartTime).getTime()
          }
          if (_this.innerEndTime) {
            let innerEndTime = _this.jnpf.toDate(_this.innerEndTime, 'yyyy-MM-dd 00:00:00')
            _this.innerEndTime = new Date(innerEndTime).getTime()
          }

          if (!_this.innerStartTime && !_this.innerEndTime) return false
          if (_this.innerEndTime) {
            return time.getTime() < _this.innerStartTime || time.getTime() > _this.innerEndTime
          } else {
            return time.getTime() < _this.innerStartTime
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
      if (val < this.innerEndTime) this.innerValue = ''
    }
  }

}
</script>
<style lang="scss" scoped>
</style>