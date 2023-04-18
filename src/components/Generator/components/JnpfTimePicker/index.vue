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
      default: true
    },
    readonly: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      innerValue: this.value,
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
    }
  },
  computed: {
    pickerOptions() {
      let selectableRange = [`${this.startTime || '00:00:00'} - ${this.endTime || '23:59:59'}`]
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