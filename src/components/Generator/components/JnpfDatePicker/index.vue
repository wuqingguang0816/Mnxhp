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

    }
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val
      },
      immediate: true
    },
    format() {
      this.key = +new Date()
    },
  },
  computed: {
    readOnly() {
      if (this.readonly) return true
      if (this.startTime && this.endTime && (this.startTime > this.endTime)) return true
      return false
    },
    pickerOptions() {
      let that = this
      return {
        disabledDate(time) {
          let format = that.format === 'yyyy' ? 'yyyy-01-01 00:00:00' : that.format === 'yyyy-MM' ? 'yyyy-MM-01 00:00:00' : 'yyyy-MM-dd 00:00:00'
          if (that.startTime) {
            let startTime = that.jnpf.toDate(that.startTime, format)
            that.startTime = new Date(startTime).getTime()
          }
          if (that.endTime) {
            let endTime = that.jnpf.toDate(that.endTime, 'yyyy-MM-dd 23:59:59')
            that.endTime = new Date(endTime).getTime()
          }
          const timeVal = time.getTime()
          if (!that.startTime && !that.endTime) return false
          if (that.startTime && that.endTime) return timeVal < that.startTime || timeVal > that.endTime
          if (that.endTime) return timeVal > that.endTime
          return timeVal < that.startTime
        }
      }
    }
  },
  created() { },
  mounted() { },
  methods: {
    change(val) {
      if (!this.startTime && !this.startTime) {
        this.innerValue = val
      } else if (val >= this.startTime && this.endTime && val <= this.endTime) {
        this.innerValue = val
      } else if (val >= this.startTime && !this.endTime) {
        this.innerValue = val
      } else {
        this.innerValue = ''
      }
      this.$emit('input', this.innerValue)
      this.$emit('change', this.innerValue)
    }
  }
}
</script>
<style lang="scss">
.el-picker-panel__link-btn.el-button--text {
  display: none;
}
</style>