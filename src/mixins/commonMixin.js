export default {
  data() {
    return {
      settingsColumnList: []
    }
  },
  computed: {
    currMenuId() {
      return this.$route.meta.modelId || ''
    },
    columnPermissionList() {
      const permissionList = this.$store.getters && this.$store.getters.permissionList
      if (!this.currMenuId) return []
      const list = permissionList.filter(o => o.modelId === this.currMenuId)
      if (!list.length) return []
      const columnList = list[0] && list[0].column ? list[0].column : []
      return columnList
    }
  },
  created() {},
  methods: {
    getRealColumnList() {
      const defaultColumnOptions = JSON.parse(JSON.stringify(this.defaultColumnOptions))
      let columnPermissionList = []
      if (!this.useColumnPermission) {
        columnPermissionList = defaultColumnOptions
      } else {
        outer: for (let i = 0; i < defaultColumnOptions.length; i++) {
          inner: for (let j = 0; j < this.columnPermissionList.length; j++) {
            if (defaultColumnOptions[i].prop === this.columnPermissionList[j].enCode) {
              columnPermissionList.push(defaultColumnOptions[i])
              break inner
            }
          }
        }
      }
      let list = []
      if (!this.settingsColumnList.length) {
        list = columnPermissionList.map(o => ({
          ...o,
          visible: true
        }))
      } else {
        outer: for (let i = 0; i < columnPermissionList.length; i++) {
          let hasItem = false,
            visible = true
          inner: for (let j = 0; j < this.settingsColumnList.length; j++) {
            if (columnPermissionList[i].prop === this.settingsColumnList[j].prop) {
              hasItem = true
              visible = this.settingsColumnList[j].visible
              break inner
            }
          }
          list.push({
            ...columnPermissionList[i],
            visible: hasItem ? visible : true
          })
        }
      }
      this.columnList = list
    }
  }
}