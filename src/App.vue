<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (process.env.NODE_ENV === 'development') return
    this.$nextTick(() => {
      window.addEventListener('beforeunload', this.beforeUnload)
    })
  },
  beforeDestroy() {
    if (process.env.NODE_ENV === 'development') return
    window.removeEventListener('beforeunload', this.beforeUnload)
  },
  methods: {
    beforeUnload(e) {
      if (!this.$store.state.user.isLeaveToast) {
        this.$store.commit('user/SET_TOAST', true)
        return false
      }
      e = e || window.event
      if (e || window.event) e.returnValue = 1;
      return 1;
    }
  }
}
</script>