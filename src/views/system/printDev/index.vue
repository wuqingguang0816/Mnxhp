<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="initData()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="addOrUpdateHandle()">
            <upload-btn url="/api/system/printDev/Actions/ImportData" @on-success="initData" />
          </topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" row-key="id"
          :tree-props="{children: 'children', hasChildren: ''}" default-expand-all>
          <el-table-column prop="fullName" label="名称" show-overflow-tooltip min-width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.top"
                style="font-weight:bold;">{{scope.row.fullName}}【{{scope.row.num}}】</span>
              <span v-else>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enCode" label="编码" width="200" />
          <el-table-column prop="creatorUser" label="创建人" width="120" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="lastModifyUser" label="最后修改人" width="120" />
          <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center" />
          <el-table-column label="状态" width="70" align="center">
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'" disable-transitions>
                {{scope.row.enabledMark==1?'正常':'停用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                        class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="copy(scope.row.id)">复制</el-dropdown-item>
                    <el-dropdown-item @click.native="preview(scope.row.id)">预览</el-dropdown-item>
                    <el-dropdown-item @click.native="exportTpl(scope.row.id)">导出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @close="colseForm" />
    <Preview :visible.sync="previewVisible" :id="activeId" />
  </div>
</template>

<script>
import { getPrintDevList, Delete, Copy, exportTpl } from '@/api/system/printDev'
import Form from './Form'
import Preview from './Preview'

export default {
  name: 'system-printDev',
  components: { Form, Preview },
  data() {
    return {
      keyword: '',
      list: [],
      listLoading: true,
      formVisible: false,
      previewVisible: false,
      activeId: '',
      categoryList: []
    }
  },
  created() {
    this.initData()
    this.getDictionaryData()
  },
  methods: {
    initData() {
      this.listLoading = true
      let query = { keyword: this.keyword }
      getPrintDevList(query).then(res => {
        this.list = res.data.list.map(o => ({ top: true, ...o }))
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'printdev' }).then((res) => {
        this.categoryList = res
      })
    },
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(this.categoryList, id)
      })
    },
    copy(id) {
      this.$confirm('您确定要复制该打印模板, 是否继续?', '提示', {
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
      }).catch(() => { });
    },
    exportTpl(id) {
      this.$confirm('您确定要导出该打印模板, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        exportTpl(id).then(res => {
          if (res.data.url) window.location.href = this.define.comUrl + res.data.url
        })
      }).catch(() => { });
    },
    preview(id) {
      if (!id) return
      this.activeId = id
      this.previewVisible = true
    },
    reset() {
      this.keyword = ''
      this.initData()
    },
    colseForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        // this.keyword = ''
        this.initData()
      }
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        Delete(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.initData()
            }
          })
        })
      }).catch(() => { })
    },
  }
}
</script>