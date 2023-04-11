<template>
  <el-date-picker :type="type" v-model="innerValue" placeholder="请选择" :value-format="valueFormat"
    :picker-options='pickerOptions' :format="format" @change="change"></el-date-picker>
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
          if (this.startTime) {
            let startTime = this.jnpf.toDate(this.startTime, "yyyy-MM-dd 00:00:00")
            this.startTime = new Date(startTime).getTime()
          }
          if (this.endTime) {
            let endTime = this.jnpf.toDate(this.endTime, "yyyy-MM-dd 00:00:00")
            this.endTime = new Date(endTime).getTime()
          }
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
      if (val < this.startTime) this.innerValue = ''
    }
  }

}
</script>
<style lang="scss" scoped>
</style>