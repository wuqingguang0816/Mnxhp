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
      default: false
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
      let that = this
      return {
        disabledDate(time) {
          if (that.innerStartTime) {
            let innerStartTime = that.jnpf.toDate(that.innerStartTime, 'yyyy-MM-dd 00:00:00')
            that.innerStartTime = new Date(innerStartTime).getTime()
          }
          if (that.innerEndTime) {
            let innerEndTime = that.jnpf.toDate(that.innerEndTime, 'yyyy-MM-dd 00:00:00')
            that.innerEndTime = new Date(innerEndTime).getTime()
          }
          const timeVal = time.getTime()
          if (!that.innerStartTime && !that.innerEndTime) return false
          if (that.innerStartTime && that.innerEndTime) return timeVal < that.innerStartTime || timeVal > that.innerEndTime
          if (that.innerEndTime) return timeVal > that.innerEndTime
          return timeVal < that.innerStartTime
        }
      }
    }
  },
  created() { },
  mounted() { },
  methods: {
    change(val) {
      if (!this.innerStartTime && !this.innerStartTime) return this.innerValue = val
      if (val >= this.innerStartTime && this.innerEndTime && val <= this.innerEndTime) return this.innerValue = val
      if (val >= this.innerStartTime && !this.innerEndTime) return this.innerValue = val
      return this.innerValue = ''
    }
  }

}
</script>
<style lang="scss" scoped>
</style>