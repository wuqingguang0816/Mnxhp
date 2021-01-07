<template>
  <p class="JNPF-Text" :style="_style">{{value}}</p>
</template>
<script>
export default {
  props: {
    textStyle: {
      type: Object,
      default: () => ({
        // 'font-size': ' 12px',
        // "color": '#00000',
        // 'text-align': 'center',
        // 'line-height': '32px',
        // 'font-weight': 'normal',
        // 'font-style': 'normal',
        // 'text-decoration': 'none',
      })
    },
    value: {
      default: ''
    },
    lineHeight: {
      type: Number,
      default: 32
    },
    fontSize: {
      type: Number,
      default: 12
    },
  },
  computed: {
    _style() {
      return { ...this.textStyle, 'line-height': this.lineHeight + 'px', 'font-size': this.fontSize + 'px' }
    }
  }
}
</script>
<style lang="scss">
.JNPF-Text {
  padding: 3px 0;
  margin: 0;
  // font-style: italic;
}
</style>