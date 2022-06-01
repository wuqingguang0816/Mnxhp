<template>
  <!-- {{value.defaultValue}} -->
  <!-- https://www.baidu.com -->
  <!-- <p class="JNPF-Text" :style="_style">{{value}}</p> -->
  <!-- <a :href="value.linkUrl" target="_blank">{{value.defaultValue}}</a> -->
  <p :style="_style">
    <el-link  :underline="false"   @click="onClickLink" type="primary">{{ value }}</el-link>
  </p>
  
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
      type: String,
      default: ""
    },
    linkUrl: {
      type: String,
      default: ""
    },
    target: {
      type: String,
      default: "_self"
    }
  },
  computed: {
    _style() {
      return { ...this.textStyle,'line-height': this.textStyle['line-height']+'px','font-size': this.textStyle['font-size']+'px' }
    }
  },
  methods: {
    onClickLink() {
      if(this.target==='_self') {
        this.$router.push({path:this.linkUrl})
      } else if(this.target==='_blank') {
        window.open(this.linkUrl,this.target)
      }

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
