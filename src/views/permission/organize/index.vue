<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center  JNPF-flex-main">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyword')">
              <el-input v-model="listQuery.keyword" :placeholder="$t('common.enterKeyword')"
                clearable @keyup.enter.native="search()" />
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
          <el-dropdown>
            <el-button type="primary">
              <i class="el-icon-plus"></i> 新建<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addOrUpdateHandle('','company')">新建公司
              </el-dropdown-item>
              <el-dropdown-item @click.native="addOrUpdateHandle()">新建部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" content="展开" placement="top">
              <el-link v-show="!expands" type="text"
                icon="icon-ym icon-ym-btn-expand JNPF-common-head-icon" :underline="false"
                @click="toggleExpand()" />
            </el-tooltip>
            <el-tooltip effect="dark" content="折叠" placement="top">
              <el-link v-show="expands" type="text"
                icon="icon-ym icon-ym-btn-collapse JNPF-common-head-icon" :underline="false"
                @click="toggleExpand()" />
            </el-tooltip>
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="treeList" row-key="id" v-if="refreshTable"
          :default-expand-all="expands" :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="名称" />
          <el-table-column prop="enCode" label="编码" />
          <el-table-column prop="description" label="说明" />
          <el-table-column prop="creatorTime" :formatter="jnpf.tableDateFormat" label="创建时间"
            width="120" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center" />
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id,scope.row.type,scope.row.parentId)"
                @del="handleDel(scope.row.id,scope.row.type)" />
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="closeForm" />
    <DepForm v-show="depFormVisible" ref="depForm" @close="depForm" />

  </div>
</template>

<script>
import {
  getOrganizeList,
  delOrganize
} from '@/api/permission/organize'
import Form from './Form'
import DepForm from './depForm.vue'

export default {
  name: 'permission-organize',
  components: { Form, DepForm },
  data() {
    return {
      listQuery: {
        keyword: ''
      },
      treeList: [],
      expands: true,
      refreshTable: true,
      btnLoading: false,
      listLoading: true,
      formVisible: false,
      depFormVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = true
      getOrganizeList(this.listQuery).then(res => {
        this.treeList = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    search() {
      this.initData()
    },
    reset() {
      this.listQuery.keyword = ''
      this.initData()
    },
    addOrUpdateHandle(id, type, parentId) {
      if (type === 'company') {
        this.addOrUpdateOeganize(id, parentId)
      } else {
        this.addOrUpdateDep(id)
      }
    },
    addOrUpdateOeganize(id, parentId) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, parentId)
      })
    },
    addOrUpdateDep(id) {
      this.depFormVisible = true
      this.$nextTick(() => {
        this.$refs.depForm.init(id)
      })
    },
    closeForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    depForm(isRefresh) {
      this.depFormVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.initData()
      }
    },
    toggleExpand() {
      this.refreshTable = false;
      this.expands = !this.expands;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    handleDel(id, type) {
      if (type === 'company') {  //删除公司
        this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
          type: 'warning'
        }).then(() => {
          delOrganize(id).then(res => {
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1500,
              onClose: () => {
                this.$store.commit('generator/SET_COMPANY_TREE', [])
                this.$store.commit('generator/SET_DEP_TREE', [])
                this.initData()
              }
            })
          })
        }).catch(() => { })
      } else {    //删除部门
        this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
          type: 'warning'
        }).then(() => {
          delDepartment(id).then(res => {
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1500,
              onClose: () => {
                this.$store.commit('generator/SET_COMPANY_TREE', [])
                this.$store.commit('generator/SET_DEP_TREE', [])
                this.initData()
              }
            })
          })
        }).catch(() => { })
      }
    }
  }
}
</script>
