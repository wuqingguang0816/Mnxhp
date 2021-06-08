<template>
  <div class="dynamicPortal-container" v-loading="loading"
    :element-loading-text="$t('common.loadingText')">
    <template v-if="!ajaxing">
      <PortalLayout :layout="layout" v-if="portalId" />
      <div class="portal-layout-nodata" v-else>
        <img src="@/assets/images/dashboard-nodata.png" alt="" class="layout-nodata-img">
        <p class="layout-nodata-txt">暂无数据</p>
      </div>
    </template>
  </div>
</template>

<script>
import { getAuthPortal } from '@/api/onlineDev/portal'
import PortalLayout from '@/components/VisualPortal/Layout'

export default {
  name: 'dynamicPortal',
  components: { PortalLayout },
  data() {
    return {
      portalId: '',
      layout: [],
      ajaxing: true,
      loading: false
    }
  },
  created() {
    this.portalId = this.$route.meta.relationId
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.layout = []
      if (!this.portalId) {
        this.loading = false
        this.ajaxing = false
        return
      }
      getAuthPortal(this.portalId).then(res => {
        if (res.data && res.data.formData) {
          let formData = JSON.parse(res.data.formData)
          this.layout = formData.layout || []
        }
        this.ajaxing = false
        setTimeout(() => {
          this.loading = false
        }, 500);
      }).catch(() => {
        this.loading = false
        this.ajaxing = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dynamicPortal-container {
  width: 100%;
  height: 100%;
  background: #ebeef5;
  position: relative;
  >>> .layout-area {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  >>> .vue-grid-layout {
    margin: -10px;
  }
  >>> .el-scrollbar__view {
    overflow: hidden;
  }
}
</style>