<template>
  <el-dialog :title="popupTitle" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body :width='popupWidth'>
    <JNPF-table v-loading="listLoading" :data="list" hasC @selection-change="handleSelectionChange">
      <el-table-column :prop="item.value" :label="item.label"
        v-for="(item,i) in config.columnOptions" :key="i" />
    </JNPF-table>
    <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
      @pagination="initData" v-if="config.hasPage" :pager-count="5" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="select()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDataInterfaceDataSelect } from '@/api/systemData/dataInterface'
export default {
  name: 'SelectDialog',
  props: {
    config: {
      type: Object,
      default: () => { }
    },
    popupTitle: {
      type: String,
      default: '选择数据'
    },
    popupWidth: {
      type: String,
      default: '700px'
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      listLoading: true,
      listQuery: {
        keyword: '',
        currentPage: 1,
        pageSize: 20
      },
      list: [],
      total: 0,
      checked: []
    }
  },
  computed: {

  },
  methods: {
    init() {
      this.listQuery.pageSize = this.config.hasPage ? this.config.pageSize : 10000
      this.visible = true
      this.initData()
    },
    initData() {
      if (!this.config.interfaceId) return
      this.listLoading = true
      let query = {
        ...this.listQuery,
        interfaceId: this.config.interfaceId,
        paramList: []
      }
      getDataInterfaceDataSelect(this.config.interfaceId, query).then(res => {
        this.list = res.data.list
        if (this.config.hasPage) this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    select() {
      if (!this.checked.length) return
      this.visible = false
      let checked = []
      for (let i = 0; i < this.checked.length; i++) {
        const e = this.checked[i]
        let item = {}
        for (let j = 0; j < this.config.relationOptions.length; j++) {
          const row = this.config.relationOptions[j]
          item[row.field] = row.type === 1 ? e[row.value] : row.value
        }
        checked.push(item)
      }
      this.$emit('select', checked)
    },
    handleSelectionChange(val) {
      this.checked = val
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  height: 70vh;
  padding: 0 0 10px !important;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .JNPF-common-search-box {
    margin-bottom: 0;
    .JNPF-common-search-box-right {
      padding: 10px 10px 0 0;
    }
  }
  .el-table {
    border-top: none !important;
  }
}
</style>