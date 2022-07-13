<template>
  <div class="main">
    <template v-if="popupType==='dialog'">
      <el-dialog :title="popupTitle" :close-on-click-modal="false" :visible.sync="visible"
        class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body :width='popupWidth'>
        <JNPF-table v-loading="listLoading" :data="list" hasC
          @selection-change="handleSelectionChange">
          <el-table-column :prop="item.value" :label="item.label"
            v-for="(item,i) in config.columnOptions" :key="i" />
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" v-if="config.hasPage"
          :pager-count="5" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
          <el-button type="primary" @click="select()">{{$t('common.confirmButton')}}</el-button>
        </span>
      </el-dialog>
    </template>
    <template v-if="popupType==='drawer'">
      <el-drawer :title="popupTitle" :visible.sync="visible" :wrapperClosable="false" ref="drawer"
        :size='popupWidth' append-to-body class="JNPF-common-drawer">
        <JNPF-table v-loading="listLoading" :data="list" hasC
          @selection-change="handleSelectionChange">
          <el-table-column :prop="item.value" :label="item.label"
            v-for="(item,i) in config.columnOptions" :key="i" />
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" v-if="config.hasPage"
          :pager-count="5" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
          <el-button type="primary" @click="select()">{{$t('common.confirmButton')}}</el-button>
        </span>
      </el-drawer>
    </template>
  </div>
</template>

<script>
import { getDataInterfaceDataSelect } from '@/api/systemData/dataInterface'
import { mapGetters } from "vuex"
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
      default: '800px'
    },
    popupType: {
      type: String,
      default: 'dialog'
    },
    formData: Object,
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
    ...mapGetters(['userInfo']),
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
      const paramList = this.getParamList()
      let query = {
        ...this.listQuery,
        interfaceId: this.config.interfaceId,
        paramList
      }
      getDataInterfaceDataSelect(this.config.interfaceId, query).then(res => {
        this.list = res.data.list
        if (this.config.hasPage) this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    getParamList() {
      let templateJson = this.config.templateJson
      for (let i = 0; i < templateJson.length; i++) {
        templateJson[i].defaultValue = this.formData[templateJson[i].relationField] || ''
        if (templateJson[i].jnpfKey === 'createUser') {
          templateJson[i].defaultValue = this.userInfo.userId
        }
        if (templateJson[i].jnpfKey === 'createTime') {
          templateJson[i].defaultValue = new Date().getTime()
        }
        if (templateJson[i].jnpfKey === 'currOrganize') {
          templateJson[i].defaultValue = this.userInfo.organizeId
        }
        if (templateJson[i].jnpfKey === 'currPosition') {
          if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
            let item = this.userInfo.positionIds[0]
            templateJson[i].defaultValue = item.id
          }
        }
      }
      return templateJson
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