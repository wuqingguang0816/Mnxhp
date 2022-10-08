<template>
  <div class="popupSelect-container">
    <el-input v-model="value" placeholder="请输入字段名称" @click.native="flowSelect">
    </el-input>
    <el-dialog title="委托流程" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select" lock-scroll append-to-body
      width="1000px">
      <div class="JNPF-common-layout">
        <div class="JNPF-common-layout-left" style="width: 150px;">
          <el-scrollbar class="JNPF-common-el-tree-scrollbar " v-loading="treeLoading">
            <el-tree ref="treeBox" :data="categoryList" :props="defaultProps" default-expand-all
              current-node-key="0" highlight-current :expand-on-click-node="false" node-key="id"
              lock-scroll @node-click="handleNodeClick" class="JNPF-common-el-tree">
              <span class="custom-tree-node" slot-scope="{ data }" :title="data.fullName">
                <span class="text" :title="data.fullName" style="margin-left:20px">
                  {{data.fullName}}
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </div>
        <div class="JNPF-common-layout-center">
          <el-row class="JNPF-common-search-box" :gutter="16">
            <el-form @submit.native.prevent>
              <el-col :span="8">
                <el-form-item label="关键词">
                  <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
                    @keyup.enter.native="search()" class="search-input" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                  <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
            <div class="JNPF-common-search-box-right">
              <el-tooltip effect="dark" content="刷新" placement="top">
                <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                  @click="initData()" />
              </el-tooltip>
            </div>
          </el-row>
          <div class="JNPF-common-layout-main JNPF-flex-main">
            <JNPF-table v-loading="listLoading" :data="list" :border="false" highlight-current-row
              @row-click="rowClick" :hasNO="false">
              <el-table-column width="35">
                <!-- <template slot-scope="scope">
                  <el-radio :label="scope.row.field" v-model="checked">&nbsp;</el-radio>
                </template> -->
              </el-table-column>
              <el-table-column type="index" width="50" label="序号" align="center" />
              <el-table-column prop="fullName" label="流程名称" />
              <el-table-column prop="enCode" label="流程编码" />
            </JNPF-table>
            <pagination :total="total" :page.sync="listQuery.currentPage"
              :limit.sync="listQuery.pageSize" @pagination="initData" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="select()">{{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { FlowEngineListAll } from '@/api/workFlow/FlowEngine'
import { FlowEngineList } from '@/api/workFlow/FlowEngine'
export default {

  props: {
    value: {
      default: ''
    },

  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      list: [],
      innerValue: '',
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
      },
      keyword: '',
      total: 0,
      checked: '',
      checkedRow: {},
      listLoading: false,
      defaultProps: {
        children: 'children',
        label: 'fullName',
        key: "id"
      },
      query: {
        categoryId: '',
        keyword: '',
      },
      treeLoading: false,
      visible: false,

      categoryList: [],
    }
  },
  computed: {
    // showClose() {
    //   let hasValue = this.value !== undefined && this.value !== null && this.value !== '';
    //   let criteria = this.clearable &&
    //     !this.disabled &&
    //     this.inputHovering &&
    //     hasValue;
    //   return criteria;
    // },
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    initData() {
      this.listLoading = true
      this.list = []
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
        category: this.categoryId ? this.categoryId : ""
      }
      FlowEngineList(query).then((res) => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    flowSelect() {
      this.visible = true
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'WorkFlowCategory' }).then((res) => {
        this.categoryList.push({
          id: 0,
          encode: "all",
          fullName: "全部流程",
        })
        this.categoryList.push(...res)
      })
    },
    handleNodeClick(data) {
      // console.log(data)
      this.categoryId = data.id ? data.id : 0
      this.initData()
      // this.tableName = ''
      // this.linkId = ''
      // this.tableName = data.tableName
      // this.linkId = data.dbLink
      // this.reset()

    },
    reset() {
      this.keyword = ''
      this.search()
    },
    search() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.listQuery.sort = 'desc'
      this.initData()
    },
    openDialog() {
      // if (!this.treeData.length) return this.$message.error(`请先进行数据连接！`)
      this.visible = true
      this.checked = ''
      this.treeLoading = true
      this.tableName = this.bindTable
      this.$nextTick(() => {
        this.tableName = this.treeData[0].tableName
        this.linkId = this.treeData[0].dbLink
        this.$refs.treeBox.setCurrentKey(this.tableName)
        this.treeLoading = false
        this.reset()
      })
    },
    clear() {
      this.checked = ''
      this.checkedRow = {}
      this.$emit('closeForm', this.checked, this.checkedRow)
    },
    select() {
      if (!this.checked) return this.$message.warning(`请选择一条数据！`)
      this.visible = false
      this.$emit('closeForm', this.checked, this.checkedRow)
    },
    rowClick(row) {
      this.checked = row.field
      this.checkedRow = row
      this.checkedRow.tableName = this.tableName
    }
  }
}
</script>

<style lang="scss" scoped>
.flow_category {
  height: 30px;
  width: 100%;
  line-height: 30px;
  text-align: center;
  border-bottom: 1px solid #dcdfe6;
}
</style>