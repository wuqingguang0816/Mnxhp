<template>
  <el-time-picker v-model="innerValue" :placeholder="placeholder" :value-format="valueFormat"
    :picker-options='pickerOptions' :format="format"></el-time-picker>
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
      default: undefined
    },
    endTime: {
      default: undefined
    }
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
  },
  computed: {
    pickerOptions() {
      let selectableRange = [`${this.startTime || '00:00:00'} - ${this.endTime || '23:59:59'}`]
      if (this.startTime && this.endTime && (this.startTime > this.endTime)) selectableRange = '00:00:00 - 00:00:00'
      return { selectableRange }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {

  }

}
</script>
<style lang="scss" scoped>
</style>