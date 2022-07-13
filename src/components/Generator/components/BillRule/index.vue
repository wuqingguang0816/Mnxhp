<template>
  <div class="popupSelect-container">
    <div class="el-select" @click="openDialog">
      <el-input placeholder="请选择模板" readonly :validate-event="false" v-model="title"
        @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false">
        <template slot="suffix">
          <i v-show="!showClose"
            :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"></i>
          <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close"
            @click.stop="clear"></i>
        </template>
      </el-input>
    </div>
    <el-dialog title="模板" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select" lock-scroll append-to-body
      width="1000px">
      <div class="JNPF-common-layout">
        <div class="JNPF-common-layout-left">
          <el-scrollbar class="JNPF-common-el-tree-scrollbar" v-loading="treeLoading">
            <el-tree ref="treeBox" :data="treeData" :props="defaultProps" default-expand-all
              highlight-current :expand-on-click-node="false" node-key="id"
              @node-click="handleNodeClick" class="JNPF-common-el-tree" />
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
                <template slot-scope="scope">
                  <el-radio :label="scope.row.fullName" v-model="checked">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column type="index" width="50" label="序号" align="center" />
              <el-table-column prop="fullName" label="业务名称" />
              <el-table-column prop="enCode" label="业务编码" />
              <!-- <el-table-column prop="category" label="分类" width="150" /> -->
              <el-table-column prop="startNumber" label="流水起始" />
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
import {
  getBillRuleSelector
} from '@/api/system/billRule'
export default {
  props: {
    dataType: {
      default: ''
    },
    menuType: {
      default: ''
    },
    value: {
      default: ''
    },
    title: {
      default: ''
    },
    moduleId: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
        sidx: ''
      },
      keyword: '',
      total: 0,
      checked: '',
      checkedRow: {},
      listLoading: false,
      defaultProps: {
        id: 'id',
        label: 'fullName'
      },
      query: {
        categoryId: '',
        keyword: '',
        dataType: null,
      },
      treeLoading: false,
      treeData: [],
      inputHovering: false,
      visible: false,
      tableName: '',
      categoryId: ''
    }
  },
  computed: {
    showClose() {
      let hasValue = this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable &&
        !this.disabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    }
  },
  created() {
    this.$store.dispatch('base/getDictionaryData', { sort: 'businessType' }).then((res) => {
      this.treeData = [{ id: '', fullName: '业务分类', children: res }]
      this.categoryId = this.treeData[0].id
      this.reset()
    })


  },
  methods: {
    initData() {
      this.listLoading = true
      let query = {
        keyword: this.keyword,
        ...this.listQuery,
        categoryId: this.categoryId
      }
      getBillRuleSelector(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    handleNodeClick(data) {
      // if (this.query.cate
      this.categoryId = ''
      this.categoryId = data.id
      this.reset()
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
      if (this.disabled) return
      this.checked = this.value
      this.visible = true
      // this.treeLoading = true
      // this.listLoading = true
      // getVisualTables(this.moduleId, this.dataType).then(res => {
      //   let data = []
      //   for (const key in res.data.linkTables) {
      //     data.push({
      //       tableName: res.data.linkTables[key],
      //       dblink: res.data.linkId
      //     })
      //     // console.log(res.data.linkTables[key])
      //   }
      //   // console.log(data)
      //   this.treeData = data
      //   if (!this.treeData.length) return this.treeLoading = false
      //   this.$nextTick(() => {
      //     this.tableName = this.treeData[0].tableName
      //     this.linkId = this.treeData[0].dblink
      //     this.reset()
      //     this.treeLoading = false
      //   })
      // }).catch(() => {
      //   this.treeLoading = false
      // })

    },
    clear() {
      this.checked = ''
      this.checkedRow = {}
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
    },
    select() {
      if (!this.checked) return
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
      this.visible = false
    },
    rowClick(row) {
      this.checked = row.fullName
      this.checkedRow = row
    }
  }
}
</script>
<style lang="scss">
.template-item {
  line-height: 30px;
}
</style>


