<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="查询字段">
              <el-select v-model="condition" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
          <div>
            <el-dropdown>
              <el-button type="primary" icon="el-icon-download" :loading="btnLoading">导出<i
                  class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="excelImport('Excel')">Excel</el-dropdown-item>
                <el-dropdown-item @click.native="excelImport('Word')">Word</el-dropdown-item>
                <el-dropdown-item @click.native="excelImport('Pdf')">PDF</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button icon="el-icon-upload2" @click="openDialog" type="text"
              style="margin-left:10px">导入</el-button>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" :hasNO="false">
          <el-table-column type="index" width="50" label="序号" fixed="left" align="center" />
          <el-table-column prop="enCode" label="工号" width="100" sortable fixed="left" />
          <el-table-column prop="fullName" label="姓名" width="100" sortable fixed="left" />
          <el-table-column prop="gender" label="性别" width="80" sortable fixed="left" />
          <el-table-column prop="departmentName" label="部门" width="120" sortable />
          <el-table-column prop="positionName" label="岗位" width="120" sortable />
          <el-table-column prop="workingNature" label="用工性质" width="100" sortable />
          <el-table-column prop="idNumber" label="身份证号" width="150" sortable />
          <el-table-column prop="telephone" label="联系电话" width="100" sortable />
          <el-table-column label="出生年月" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.birthday | toDate('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column label="参加工作" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.attendWorkTime | toDate('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column prop="education" label="最高学历" width="100" sortable />
          <el-table-column prop="major" label="所学专业" width="120" sortable />
          <el-table-column prop="graduationAcademy" label="毕业院校" width="150" sortable />
          <el-table-column label="毕业时间" sortable width="100">
            <template slot-scope="scope">
              {{ scope.row.graduationTime | toDate('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" sortable width="150">
            <template slot-scope="scope">
              {{ scope.row.creatorTime | toDate() }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index,scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="reset" />
  </div>
</template>

<script>
import { EmployeeList, EmployeeDelete, ExportExcel, ExportPdf, ExportWord } from '@/api/extend/employee'
import Form from './Form'
export default {
  name: 'extend-importAndExport',
  components: { Form },
  data() {
    return {
      keyword: '',
      condition: 'EnCode',
      list: [],
      total: 0,
      listLoading: true,
      btnLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      },
      options: [{ value: 'EnCode', label: '工号' },
      { value: 'FullName', label: '姓名' },
      { value: 'Telephone', label: '电话' },
      { value: 'DepartmentName', label: '部门' },
      { value: 'PositionName', label: '岗位' }],
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    reset() {
      this.keyword = ''
      this.search()
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc'
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        condition: this.condition,
        keyword: this.keyword
      }
      EmployeeList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        this.asyncDel(index, id);
      }).catch(() => { });
    },
    asyncDel(index, id) {
      EmployeeDelete(id).then(res => {
        this.list.splice(index, 1);
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    openDialog() {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init()
      })
    },
    excelImport(key) {
      this.btnLoading = true
      let method = ''
      if (key === 'Pdf') {
        method = ExportPdf
      } else if (key === 'Word') {
        method = ExportWord
      } else {
        method = ExportExcel
      }
      method().then(res => {
        this.btnLoading = false
        if (!res.data.url) return
        window.location.href = this.define.comUrl + res.data.url
      }).catch(() => { this.btnLoading = false })
    }
  }
}
</script>