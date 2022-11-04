<template>
  <div class="box" v-loading="loading" element-loading-text="页面加载中"></div>
</template>

<script>
export default {
  name: 'ssoRedirect',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const token = this.$route.query.token
      const theme = this.$route.query.theme
      if (!token) return
      const data = {
        token,
        theme
      }
      this.$store.dispatch('user/setToken', data).then(() => {
        this.$router.push('/')
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
}
</style>