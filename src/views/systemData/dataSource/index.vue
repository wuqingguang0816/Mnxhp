<template>
  <div class="JNPF-common-layout">
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
          <topOpts @add="addOrUpdateHandle()"></topOpts>
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
          <el-table-column prop="fullName" label="连接名称" min-width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.top"
                style="font-weight:bold;">{{scope.row.fullName}}【{{scope.row.num}}】</span>
              <span v-else>{{scope.row.fullName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="host" label="主机地址" width="200" />
          <el-table-column prop="port" label="端口" width="60" />
          <el-table-column prop="creatorTime" label="创建时间" width="120"
            :formatter="jnpf.tableDateFormat" />
          <el-table-column label="创建人" prop="creatorUser" width="120" />
          <el-table-column prop="lastModifyTime" label="修改时间" width="120"
            :formatter="jnpf.tableDateFormat" />
          <el-table-column label="修改人" prop="lastModifyUser" width="120" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center" />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row.id)" />
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
  </div>
</template>

<script>
import { getDataSourceList, DataSourceDelete } from '@/api/systemData/dataSource'
import Form from './Form'
export default {
  name: 'systemData-dataSource',
  components: { Form },
  data() {
    return {
      list: [],
      keyword: '',
      listLoading: true,
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      getDataSourceList({ keyword: this.keyword }).then(res => {
        this.list = res.data.list.map(o => ({ top: true, ...o }))
        this.listLoading = false
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        DataSourceDelete(id).then(res => {
          this.$message({ type: 'success', message: res.msg });
          this.initData()
        })
      }).catch(() => { });
    },
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    }
  }
}
</script>
