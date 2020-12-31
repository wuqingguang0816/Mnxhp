<template>
  <div class="generator-container app-container">
    <Home />
  </div>
</template>

<script>

import Home from "./index/Home"
export default {
  name: 'generator',
  components: { Home },
  data() {
    return {
      key: ''
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.generator-container {
  padding: 0;
}
</style>