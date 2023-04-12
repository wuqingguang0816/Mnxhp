<template>
  <div>
    <template>
      <span v-if="addonBefore" class="addon">{{ addonBefore }}</span>
      <span class="innerValue">{{ innerValue }}</span>
      <span v-if="addonAfter" class="addon">{{ addonAfter }}</span>
    </template>
    <p v-if="isAmountChinese" class="input-color">{{ amountChineseName }}</p>
  </div>
</template>
<script>
import { getAmountChinese } from "@/components/Generator/utils/index"
export default {
  name: 'JNPF-number',
  components: {},
  props: {
    value: {
      type: Number,
      default: undefined
    },
    thousands: {
      type: Boolean,
      default: false
    },
    isAmountChinese: {
      type: Boolean,
      default: false
    },
    addonBefore: {
      type: String,
      default: ''
    },
    addonAfter: {
      type: String,
      default: ''
    },
    precision: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      innerValue: this.value,
      amountChineseName: ''
    }
  },
  computed: {},
  created() {
    if (!this.innerValue) this.innerValue = 0
    this.amountChinese(this.innerValue)
    this.thousandSeparator()
  },
  mounted() {
  },
  methods: {
    thousandSeparator() {
      if (this.thousands) {
        this.innerValue = this.innerValue.toLocaleString('zh', {
          minimumFractionDigits: this.precision,
          maximumFractionDigits: this.precision
        })
      } else {
        this.innerValue = this.innerValue
      }
      return this.innerValue
    },
    amountChinese(val) {
      if (!this.isAmountChinese) return
      this.amountChineseName = getAmountChinese(val)
    }
  }

}
</script>
<style lang="scss" scoped>
.input-number {
  width: 100%;
  border-radius: 0px !important;
  >>> .el-input__inner {
    border-radius: 0px !important;
  }
}
.addon {
  color: #303133;
}
.innerValue {
  color: #606266;
}
.input-color {
  color: #c0c0c0;
}
</style>