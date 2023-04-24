<template>
  <div class="dashboard-container" v-loading="loading">
    <template v-if="!noData">
      <template v-if="!ajaxing">
        <template v-if="portalId">
          <PortalLayout :layout="layout" :enabledLock="enabledLock" v-if="type===0"
            @layoutUpdatedEvent="layoutUpdatedEvent" />
          <div class="custom-page" v-if="type===1">
            <component :is="currentView" v-if="linkType===0" />
            <embed :src="url" width="100%" height="100%" type="text/html" v-if="linkType===1" />
          </div>
        </template>
        <div class="portal-layout-nodata" v-else>
          <img src="@/assets/images/dashboard-nodata.png" alt="" class="layout-nodata-img">
          <p class="layout-nodata-txt">暂无数据</p>
        </div>
      </template>
      <Setting ref="Setting" @refresh="refresh" />
      <el-button type="primary" icon="el-icon-arrow-left" size="large" class="setting-btn"
        @click="$refs.Setting.init(portalId)"></el-button>
    </template>
    <template v-else>
      <el-scrollbar class="dashboard-container">
        <adminDashboard />
      </el-scrollbar>
    </template>
  </div>
</template>
<script>
import { getAuthPortal, UpdateCustomPortal } from '@/api/onlineDev/portal'
import Setting from './Setting'
import PortalLayout from '@/components/VisualPortal/Layout'
import { mapGetters } from 'vuex'
import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
import adminDashboard from './admin'
export default {
  components: { Setting, PortalLayout, adminDashboard },
  data() {
    return {
      portalId: '',
      layout: [],
      type: null,
      linkType: null,
      currentView: null,
      url: '',
      ajaxing: true,
      loading: false,
      noData: false,
      refreshData: {},
      timerList: [],
      formData: {},
      enabledLock: 1,
      systemId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    const system = this.userInfo.systemIds.filter(o => o.currentSystem)[0]
    this.systemId = system.id
    this.portalId = this.userInfo.portalId
    this.getData()
  },
  destroyed() {
    this.clearAutoRefresh()
  },
  methods: {
    getData() {
      this.loading = true
      this.layout = []
      this.noData = false
      if (!this.portalId) {
        this.loading = false
        this.ajaxing = false
        this.noData = true
        return
      }
      getAuthPortal(this.portalId, { platform: 'pc', systemId: this.systemId }).then(res => {
        if (res.data) {
          this.type = res.data.type || 0
          this.linkType = res.data.linkType || 0
          this.url = res.data.customUrl || ''
          this.enabledLock = res.data.enabledLock || 0
          if (res.data.type === 1) {
            if (res.data.customUrl && res.data.customUrl !== 1) {
              this.currentView = (resolve) => require([`@/views/${res.data.customUrl}`], resolve)
            }
          } else {
            if (res.data.formData) {
              this.formData = JSON.parse(res.data.formData)
              this.layout = this.filterList(JSON.parse(JSON.stringify(this.formData.layout)) || [])
              this.refreshData = this.formData.refresh || {}
            }
          }
        }
        this.ajaxing = false
        setTimeout(() => {
          this.initAutoRefresh()
          this.loading = false
        }, 500);
      }).catch(() => {
        this.loading = false
        this.ajaxing = false
        this.noData = true
      })
    },
    filterList(layout) {
      const loop = list => {
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (!(Array.isArray(item.visibility) && item.visibility.includes('pc')) && item.jnpfKey) {
            list.splice(i, 1)
            i--
          }
          if (item.children && item.children.length) loop(item.children)
        }
      }
      loop(layout)
      return layout
    },
    refresh(id) {
      if (!id) return
      this.portalId = id
      this.clearAutoRefresh()
      this.getData()
    },
    initAutoRefresh() {
      if (!this.layout.length) return
      this.timerList = []
      const loop = (list, type = 1) => {
        list.forEach(ele => {
          if ((ele.refresh && ele.refresh.autoRefresh && ele.refresh.autoRefreshTime) || type == 2) {
            var timer = setInterval(() => {
              ele.renderKey = +new Date()
              this.autoRefresh(ele)
            }, type == 2 ? this.refreshData.autoRefreshTime * 1000 * 60 : ele.refresh.autoRefreshTime * 1000 * 60);
            this.timerList.push(timer)
          }
          if (ele.children && ele.children.length) loop(ele.children, type)
        });
      }
      if (this.refreshData.autoRefresh) {
        loop(this.layout, 2)
      } else {
        loop(this.layout)
      }
    },
    autoRefresh(item) {
      const chartList = ['barChart', 'lineChart', 'pieChart', 'radarChart', 'mapChart']
      if (item.dataType === 'dynamic' && chartList.includes(item.jnpfKey)) {
        if (!item.propsApi) return
        getDataInterfaceRes(item.propsApi).then(res => {
          const realData = res.data
          if (Array.isArray(realData)) {
            item.option.defaultValue = realData
          } else {
            item.option.defaultValue = []
          }
        })
      }
    },
    clearAutoRefresh() {
      if (this.timerList.length) {
        this.timerList.forEach((ele) => {
          if (ele) clearInterval(ele)
        })
      }
    },
    layoutUpdatedEvent() {
      this.formData.layout = this.layout
      const query = { formData: JSON.stringify(this.formData), systemId: this.systemId }
      UpdateCustomPortal(this.portalId, query).then(res => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  background: #ebeef5;
  position: relative;
  .custom-page {
    width: 100%;
    height: 100%;
  }
  >>> .layout-area {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  .setting-btn {
    position: absolute;
    top: 200px;
    right: -10px;
    height: 40px;
    width: 40px;
    text-align: center;
    padding: 0;
    border-radius: 20px 0 0 20px;
    z-index: 100;
    >>> i {
      font-size: 20px;
      font-weight: 580;
    }
  }
  >>> .vue-grid-layout {
    margin: -10px;
  }
  >>> .el-scrollbar__view {
    overflow: hidden;
  }
}
</style>