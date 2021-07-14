import { getVisualDevList, Delete, Copy, exportData } from '@/api/onlineDev/visualDev'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      formVisible: false,
      addVisible: false,
      categoryList: []
    }
  },
  created() {
    this.getDictionaryData()
    this.initData()
  },
  methods: {
    search() {
      this.initData()
    },
    reset() {
      this.query.keyword = ''
      this.initData()
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: this.sort }).then((res) => {
        this.categoryList = res
      })
    },
    initData() {
      this.listLoading = true
      getVisualDevList(this.query).then(res => {
        this.list = res.data.list.map(o => ({ top: true, ...o }))
        this.listLoading = false
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      }).catch(() => {});
    },
    copy(id) {
      this.$confirm('您确定要复制该功能表单, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        Copy(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      }).catch(() => {});
    },
    exportModel(id) {
      exportData(id).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    },
    handleAdd(webType) {
      this.addOrUpdateHandle('', webType)
    },
    addOrUpdateHandle(id, webType) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.categoryList, id, this.query.type, webType)
      })
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.query.keyword = ''
        this.initData()
      }
    }
  }
}