 
<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left">
      <div class="JNPF-common-title">
        <h2>翻译分类</h2>
      </div>
      <el-tree :data="treeData" :props="defaultProps" default-expand-all highlight-current
        ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
        class="JNPF-common-el-tree" node-key="id">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{node.label}}</span>
        </span>
      </el-tree>
    </div>
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="addOrUpdateHandle()" />
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="signKey" label="翻译标记" />
          <el-table-column :prop="item.enCode.toLowerCase()" :label="item.fullName"
            show-overflow-tooltip v-for="item in languageList" :key="item.id">
            <template slot-scope="scope">
              {{scope.row.languageEnCodes[item.enCode.toLowerCase()]}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.encode)"
                @del="handleDel(scope.$index,scope.row.encode)">
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
  </div>
</template>

<script>
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { LanguageMapList, LanguageMapDelete } from '@/api/systemData/languageMap'
import Form from './Form'
export default {
  name: 'system-language',
  components: { Form },
  data() {
    return {
      keyword: '',
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      formVisible: false,
      treeData: [],
      languageTypeId: '',
      languageTypeText: '',
      languageList: [],
      dictionaryList: []
    }
  },
  computed: {},
  created() {
    this.getTreeView()
  },
  methods: {
    getTreeView() {
      getDictionaryDataSelector('76da95221f894466b7b3dec327b98c8b').then(res => {
        this.treeData = res.data.list
        this.$nextTick(() => {
          this.languageTypeId = this.treeData[0].id
          this.languageTypeText = this.treeData[0].fullName
          this.$refs.treeBox.setCurrentKey(this.languageTypeId);
          this.getDictionaryData()
        });
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'Language' }).then(res => {
        this.languageList = res
        this.initData()
      })
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      LanguageMapList(this.languageTypeId, query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        LanguageMapDelete(id).then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.languageList, this.languageTypeId, this.languageTypeText, id)
      })
    },
    handleNodeClick(data) {
      if (this.languageTypeId == data.id) return
      this.languageTypeId = data.id
      this.languageTypeText = data.fullName
      this.reset()
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    reset() {
      this.keyword = ''
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    }
  }
}
</script>