<template>
  <el-time-picker v-model="innerValue" :placeholder="placeholder" :value-format="valueFormat"
    :picker-options='pickerOptions' :format="format" :disabled="disabled" :clearable="clearable"
    :readonly="readOnly"></el-time-picker>
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
    placeholder: {
      type: String,
      default: '请选择'
    },
    valueFormat: {
      default: undefined
    },
    format: {
      default: undefined
    },
    startTime: {
      type: String,
      default: undefined
    },
    endTime: {
      type: String,
      default: undefined
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
    readonly(val) {
      this.readOnly = val
    },
    startTime(val) {
      this.innerStartTime = val
    },
    endTime(val) {
      this.innerEndTime = val
    },
  },
  computed: {
    pickerOptions() {
      if (this.innerStartTime) {
        if (this.innerStartTime.split(':').length == 3) {
          this.innerStartTime = this.innerStartTime
        } else {
          this.innerStartTime = this.innerStartTime + ':00'
        }
      }
      if (this.innerEndTime) {
        if (this.innerEndTime.split(':').length == 3) {
          this.innerEndTime = this.innerEndTime
        } else {
          this.innerEndTime = this.innerEndTime + ':00'
        }
      }
      let selectableRange = [`${this.innerStartTime || '00:00:00'} - ${this.innerEndTime || '23:59:59'}`]
      return { selectableRange }
    },
    readOnly() {
      if (this.readonly) return true
      if (this.startTime && this.endTime && (this.startTime > this.endTime)) return true
      return false
    }
  },
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>