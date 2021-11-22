<template>
  <div class="JNPF-common-layout JNPF-flex-main">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyWord')">
              <el-input v-model="keyword" :placeholder="$t('common.enterKeyword')" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色类型">
              <el-select v-model="category" placeholder="请选择角色类型" clearable>
                <el-option v-for="item in categoryList" :key="item.enCode" :label="item.fullName"
                  :value="item.enCode">
                </el-option>
              </el-select>
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
          <topOpts @add="handleAddEdit()"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="fullName" label="名称" />
          <el-table-column prop="enCode" label="编码" />
          <el-table-column prop="type" label="类型" width="150" />
          <el-table-column prop="description" label="说明" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center" />
          <el-table-column label="状态" width="70" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'" disable-transitions>
                {{scope.row.enabledMark==1?'正常':'停用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown hide-on-click>
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">
                      {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="handleUserRelation(scope.row.id, scope.row.fullName)">
                      {{$t('role.roleMember')}}
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handleAuthorize(scope.row.id, scope.row.fullName)">
                      {{$t('role.rolePermission')}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
      <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
      <AuthorizeForm v-if="authorizeFormVisible" ref="AuthorizeForm" @close="removeAuthorizeForm" />
      <UserRelationList v-if="userRelationListVisible" ref="UserRelationList"
        @refreshDataList="initData" />
    </div>
  </div>
</template>

<script>
import {
  getRoleList,
  delRole,
  getRoleTypeSelector,
  updateRoleState
} from '@/api/permission/role'
import Form from './Form'
import AuthorizeForm from '@/views/permission/authorize/AuthorizeForm'
import UserRelationList from '@/views/permission/userRelation/Selector'

export default {
  components: {
    Form,
    AuthorizeForm,
    UserRelationList
  },
  name: 'permission-role',
  data() {
    return {
      list: [],
      categoryList: [],
      keyword: '',
      category: '',
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      total: 0,
      listLoading: true,
      formVisible: false,
      authorizeFormVisible: false,
      userRelationListVisible: false
    }
  },
  created() {
    this.getDictionaryData()
    this.initData()
  },
  methods: {
    reset() {
      this.keyword = ''
      this.category = ''
      this.search()
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
        category: this.category
      }
      getRoleList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getDictionaryData() {
      getRoleTypeSelector().then(res => {
        this.categoryList = res.data.list
      })
    },
    handleAddEdit(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    removeAuthorizeForm(isRefresh) {
      this.authorizeFormVisible = false
      if (isRefresh) {
        this.initData()
      }
    },
    removeUserRelationList(isRefresh) {
      this.userRelationListVisible = false
      if (isRefresh) {
        this.initData()
      }
    },
    handleUpdateState(row) {
      const txt = row.enabledMark ? '禁用' : '开启'
      this.$confirm(`您确定要${txt}当前角色吗, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        updateRoleState(row.id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              row.enabledMark = row.enabledMark ? 0 : 1
            }
          })
        })
      }).catch(() => { })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delRole(id).then(res => {
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
    handleUserRelation(id, fullName) {
      this.userRelationListVisible = true
      this.$nextTick(() => {
        this.$refs.UserRelationList.init(id, fullName, 'Role')
      })
    },
    handleAuthorize(id, fullName) {
      this.authorizeFormVisible = true
      this.$nextTick(() => {
        this.$refs.AuthorizeForm.init(id, fullName, 'Role')
      })
    }
  }
}
</script>
