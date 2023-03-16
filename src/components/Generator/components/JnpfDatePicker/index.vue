<template>
  <el-date-picker :type="type" v-model="innerValue" placeholder="请选择" :value-format="valueFormat"
    :picker-options='pickerOptions' :format="format"></el-date-picker>
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
    }
  },

  data() {
    return {
      innerValue: this.value,
      type: 'date',
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
    if (this.format === 'yyyy' || this.format === 'yyyy-MM' || this.format === 'yyyy-MM-dd') return this.type = 'date'
    return this.type = 'datetime'
  },
  mounted() {
  },
  methods: {
  }

}
</script>
<style lang="scss" scoped>
</style>