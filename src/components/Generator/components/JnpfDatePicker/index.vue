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
          if (this.startTime) {
            if (time.getTime() <= this.startTime && this.endTime) {
              return time.getTime() != this.startTime && time.getTime() <= this.endTime
            }
          }
          // if (this.startTime && this.startTime == time.getTime()) {
          //   console.log(222)
          //   return time.getTime() == this.startTime
          // } else if (this.startTime < time.getTime()) {
          //   return time.getTime() < this.startTime
          // }
          // if (this.startTime && ) {
          //   console.log(6666222)
          //   if (this.endTime && this.endTime <= time.getTime()) {
          //     return time.getTime() < this.startTime && this.endTime < time.getTime()
          //   } else if (this.endTime && this.endTime > time.getTime()) {
          //     return time.getTime() <= this.startTime && this.endTime >= time.getTime()
          //   }
          //   return time.getTime() < this.startTime
          // }

          // if (this.startTime && this.startTime > time.getTime()) {
          //   if (this.endTime && this.endTime >= time.getTime()) {
          //     return time.getTime() > this.startTime && this.endTime >= time.getTime()
          //   } else if (this.endTime && this.endTime >= time.getTime()) {
          //     return time.getTime() >this.startTime && this.endTime > time.getTime()
          //   }
          //   return time.getTime() > this.startTime
          // }
        }
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
    format(val) {
      if (val === 'yyyy' || val === 'yyyy-MM' || val === 'yyyy-MM-dd') return this.type = 'date'
      return this.type = 'datetime'
    },

  },
  computed: {
  },
  created() {
    console.log(this.jnpf.toDate(this.startTime, "yyyy-MM-dd HH:mm"))
    console.log(this.jnpf.toDate(this.endTime, "yyyy-MM-dd HH:mm"))
  },
  mounted() {
  },
  methods: {

  }

}
</script>
<style lang="scss" scoped>
</style>