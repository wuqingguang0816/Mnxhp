<template>
  <div>
    <template v-if='!thousands && !controlsPosition'>
      <div class="el-input el-input--small el-input-group el-input-group--prepend el-input--suffix">
        <div class="el-input-group__prepend" v-if="addonBefore">{{ addonBefore }}</div>
        <el-input-number v-model="innerValue" :placeholder="placeholder" :max="max" :min="min"
          :step="step" :precision="precision" :disabled="disabled" class="input-number"
          :controls-position="controlsPosition==='right'?'right':''"
          :controls="!controlsPosition?false:true">
        </el-input-number>
        <div class="el-input-group__append" v-if="addonAfter">{{ addonAfter }}</div>
      </div>
    </template>
    <template v-else-if='thousands && !controlsPosition'>
      <div class="el-input el-input--small el-input-group el-input-group--prepend el-input--suffix">
        <div class="el-input-group__prepend" v-if="addonBefore">{{ addonBefore }}</div>
        <el-input-number v-model="innerValue" :placeholder="placeholder" :max="max" :min="min"
          :step="step" :precision="precision" :disabled="disabled" v-thousands class="input-number"
          :controls-position="controlsPosition==='right'?'right':''"
          :controls="!controlsPosition?false:true">
        </el-input-number>
        <div class="el-input-group__append" v-if="addonAfter">{{ addonAfter }}</div>
      </div>
    </template>
    <template v-else>
      <el-input-number v-model="innerValue" :placeholder="placeholder" :max="max" :min="min"
        :step="step" :precision="precision" :disabled="disabled"
        :controls-position="controlsPosition==='right'?'right':''"
        :controls="!controlsPosition?false:true">
      </el-input-number>
    </template>
    <p v-if="isAmountChinese" style="color:#C0C0C0">{{ amountChineseName }}</p>
  </div>
</template>
<script>
import { getAmountChinese } from "@/components/Generator/utils/index"
export default {
  name: 'JNPF-input-number',
  components: {},
  props: {
    controlsPosition: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
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
    placeholder: {
      type: String,
      default: '数字文本'
    },
    addonAfter: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerValue: this.value,
      amountChineseName: ''
    }
  },
  watch: {
    innerValue: {
      handler(val) {
        this.$emit('input', val)
        this.$emit('change', val)
        this.amountChinese(val)
      },
      deep: true
    },
    value: {
      handler(val) {
        this.innerValue = val
        this.amountChinese(this.innerValue)
      },
      deep: true
    },
    isAmountChinese() {
      this.amountChinese(this.innerValue)
    },
  },
  computed: {

  },
  created() {
  },
  directives: {
    thousands: {
      // 被绑定元素插入父节点时调用
      inserted: (el, binding, vnode) => {
        let precision = vnode.child.precision
        // 获取input节点
        if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
          el = el.getElementsByTagName('input')[0]
        }
        // if (typeof fn !== 'function') {
        //   return el.value = ''
        // }
        // 千分位
        el.value = parseFloat(el.value).toLocaleString('zh', {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision
        })
        // 聚焦转化为数字格式（去除千分位）
        el.onfocus = e => {
          let a = el.value.replace(/,/g, '') //去除千分号的','
          el.value = parseFloat(a).toFixed(precision)
          if (el.value === 'NaN') el.value = ''
        }
        el.onblur = e => {
          el.value = parseFloat(el.value).toLocaleString('zh', {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
          })
          if (el.value === 'NaN') el.value = ''
        }
        if (el.value === 'NaN') el.value = ''
      },
      componentUpdated: (el, binding, vnode) => {
        // 聚焦转化为数字格式（去除千分位）
        el.focus()
        let precision = vnode.child.precision
        console.log(el)
        if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
          el = el.getElementsByTagName('input')[0]
        }
        el.onblur = e => {
          el.value = parseFloat(el.value).toLocaleString('zh', {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
          })
        }
        if (!el.value) el = el
        console.log(el.value)
      },
      unbind: (el, binding, vnode) => {
        let precision = vnode.child.precision
        if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
          el = el.getElementsByTagName('input')[0]
        }
        let a = el.value.replace(/,/g, '') //去除千分号的','
        el.value = parseFloat(a).toFixed(precision)
        if (el.value === 'NaN') el.value = ''
      },

    }
  },
  mounted() {
  },
  methods: {
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
</style>