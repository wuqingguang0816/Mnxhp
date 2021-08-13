<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="params.keyword" placeholder="请输入关键词查询" clearable />
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
          <topOpts addText="新建报表" @add="handleAddEdit()">
            <el-upload :action="define.reportServer+'/api/datareport/Data/Action/Import'"
              :headers="{ Authorization: $store.getters.token}" :on-success="handleSuccess"
              :before-upload="()=>{btnLoading = true}" :show-file-list="false" class="upload-btn">
              <el-button type="text" icon="el-icon-upload2" :loading="btnLoading">导入</el-button>
            </el-upload>
          </topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="tableListAll" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="报表名称" min-width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.top" style="font-weight:bold;">
                {{scope.row.fullName}}【{{scope.row.count}}】
              </span>
              <span v-else>{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="enCode" label="编码" width="200">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{ scope.row.enCode }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUser" label="创建人" width="120">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{scope.row.creatorUser}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="lastModifyUser" label="修改人" width="120">
            <template slot-scope="scope">
              <span v-if="!scope.row.top">{{scope.row.lastModifyUser}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown hide-on-click>
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">
                      {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handlePreview(scope.row.id, scope.row.fullName)">预览
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleExport(scope.row.id)">导出
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
    <Preview v-show="previewVisible" ref="Preview" @close="previewVisible=false" />
  </div>
</template>
<script>
import {
  getDataReportList,
  delDataReport
} from '@/api/onlineDev/dataReport'
import { reportServer } from '@/utils/define'
import Form from './Form'
import Preview from './Preview'

export default {
  components: {
    Form,
    Preview
  },
  name: 'onlineDev-dataReport',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      params: {
        keyword: ''
      },
      listLoading: false,
      btnLoading: false,
      formVisible: false,
      previewVisible: false,
      tableList: [],
      reportTypeList: [],
      tableListAll: [],
    }
  },
  created() {
    this.getDictionaryData()
  },
  methods: {
    initData() {
      this.listLoading = true
      getDataReportList(this.params).then(res => {
        this.tableList = res.data.list
        this.tableListAll = JSON.parse(JSON.stringify(this.reportTypeList))
        for (let i = 0; i < this.tableListAll.length; i++) {
          let child = this.tableList.filter(o => this.tableListAll[i].id === o.categoryId)
          let count = child.length
          this.$set(this.tableListAll[i], 'children', child)
          this.$set(this.tableListAll[i], 'count', count)
          this.$set(this.tableListAll[i], 'top', true)
        }
        this.tableListAll = this.tableListAll.filter(o => o.children.length)
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'ReportSort' }).then(res => {
        this.reportTypeList = JSON.parse(JSON.stringify(res))
        this.initData()
      })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delDataReport(id).then(res => {
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
    handlePreview(id) {
      this.previewVisible = true
      this.$nextTick(() => {
        this.$refs.Preview.init(id)
      })
    },
    handleExport(id) {
      this.$confirm('您确定要导出该报表, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        let link = document.createElement('a')
        link.href = `${reportServer}/api/datareport/Data/${id}/Actions/Export`
        link.click();
      }).catch(() => { });
    },
    handleSuccess(res) {
      this.btnLoading = false
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1000
        })
        this.initData()
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 1000
        })
      }
    },
    search() {
      const keyword = this.params.keyword
      this.getDictionaryData(keyword)
    },
    reset() {
      this.params.keyword = ''
      this.search()
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-btn {
  display: inline-block;
  margin: 0 10px;
}
</style>