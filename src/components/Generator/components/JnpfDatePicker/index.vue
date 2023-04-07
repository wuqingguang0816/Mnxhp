<template>
  <el-date-picker :type="type" v-model="innerValue" placeholder="请选择" :value-format="valueFormat"
    :picker-options='pickerOptions' @change="change" :format="format"></el-date-picker>
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
    }
  },
  data() {
    return {
      innerValue: this.value,
      pickerOptions: {
        disabledDate: (time) => {
          if (!this.startTime && !this.endTime) return false
          if (this.endTime) {
            return time.getTime() < this.startTime || time.getTime() > this.endTime
          } else {
            return time.getTime() < this.startTime
          }
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
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    change(val) {
      if (val < this.startTime) return this.innerValue = ''
    }
  }

}
</script>
<style lang="scss" scoped>
</style>