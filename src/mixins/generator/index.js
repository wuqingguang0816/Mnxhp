import { getVisualDevList, Delete, Copy } from '@/api/onlineDev/visualDev'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      formVisible: false,
      categoryList: [],
      listAll: []
    }
  },
  created() {
    this.getDictionaryData()
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
        this.categoryList = JSON.parse(JSON.stringify(res))
        this.initData()
      })
    },
    initData() {
      this.listLoading = true
      getVisualDevList(this.query).then(res => {
        this.list = res.data.list
        this.listAll = JSON.parse(JSON.stringify(this.categoryList))
        for (let i = 0; i < this.listAll.length; i++) {
          let child = this.list.filter(o => this.listAll[i].id === o.category)
          let count = child.length
          this.$set(this.listAll[i], 'children', child)
          this.$set(this.listAll[i], 'count', count)
          this.$set(this.listAll[i], 'top', true)
        }
        this.listAll = this.listAll.filter(o => o.children.length)
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
    addOrUpdateHandle(id, type) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.categoryList, id, type)
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