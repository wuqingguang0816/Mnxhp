<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form>
          <el-col :span="5">
            <el-form-item label="事业部">
              <el-select v-model="form.SYB" @change="getGC" filterable placeholder="请选择">
                <el-option v-for="item in sybList" :key="item.SYBNAME" :label="item.SYBNAME" :value="item.SYBNAME">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="工厂">
              <el-select v-model="form.FACTORY" filterable placeholder="请选择">
                <el-option v-for="item in GCList" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申购时间">
              <el-date-picker v-model="date" value-format="yyyy-MM-dd" type="daterange" align="right" unlink-panels
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="汇总状态">
              <el-select v-model="form.ISHZ" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{ $t('common.search') }}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{ $t('common.reset') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <el-row style="height:100%" :gutter="16">
          <el-col :span="12" style="border-right: 2px solid #ddd;height: 100%;">
            <div class="JNPF-common-layout-main JNPF-flex-main">
              <div class="JNPF-common-head">
                <h5>订单信息</h5>

                <div class="JNPF-common-head-right">
                  <el-button type="primary" @click="reset()">新增订单</el-button>
                  <el-button type="primary" @click="reset()">修改订单</el-button>
                  <el-button type="primary" @click="reset()">删除订单</el-button>
                  <el-button type="primary" @click="reset()">提交订单</el-button>
                </div>
              </div>
              <JNPF-table @row-click="onRowClick" v-loading="listLoading" :data="list">
                <el-table-column type="selection" width="55" />
                <el-table-column align="center" prop="fullName" label="编号" />
                <el-table-column align="center" prop="enCode" label="状态" width="200" />
                <el-table-column align="center" prop="runCount" label="是否汇总" width="100" />
                <el-table-column align="center" prop="startTime" label="创建人" width="120" />
                <el-table-column align="center" prop="endTime" label="创建时间" width="120" />
                <el-table-column align="center" prop="lastRunTime" label="汇总数量" width="70" />
                <el-table-column align="center" prop="endTime" label="汇总单位" width="120" />
                <el-table-column align="center" prop="endTime" label="物料库存量" width="120" />
                <el-table-column align="center" prop="endTime" label="规格数" width="120" />
                <el-table-column align="center" prop="endTime" label="规格单位" width="120" />
                <el-table-column align="center" prop="endTime" label="级别" width="120" />
                <el-table-column align="center" prop="endTime" label="供应商" width="120" />
                <el-table-column align="center" prop="endTime" label="生产商" width="120" />
              </JNPF-table>
              <pagination :total="total" style="text-align: center;" :page.sync="listQuery.currentPage"
                :limit.sync="listQuery.pageSize" @pagination="initData" />
            </div>
          </el-col>
          <el-col :span="12" style="height: 100%;">
            <div class="JNPF-common-layout-main JNPF-flex-main">
              <div class="JNPF-common-head">
                <h5>订单明细信息</h5>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style="margin-bottom: 0;" label="实际数量">
                    <el-input style="width: 90px;" v-model="formInline.user" placeholder="实际数量"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0;" label="实际单位">
                    <el-input style="width: 90px;" v-model="formInline.region" placeholder="实际单位"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0;">
                    <el-button type="primary" @click="onSubmit">修改明细</el-button>
                    <el-button type="primary" @click="onSubmit">删除明细</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <JNPF-table v-loading="listLoading" :data="list2">
                <el-table-column type="selection" width="55" />
                <el-table-column align="center" prop="fullName" label="物料编码" />
                <el-table-column align="center" prop="enCode" label="物料名称" width="200" />
                <el-table-column align="center" prop="runCount" label="批次" width="100" />
                <el-table-column align="center" prop="startTime" label="申请数量" width="120" />
                <el-table-column align="center" prop="endTime" label="申请单位" width="120" />
                <el-table-column align="center" prop="lastRunTime" label="实际数量" width="70" />
                <el-table-column align="center" prop="endTime" label="实际单位" width="120" />
                <el-table-column align="center" prop="endTime" label="申请人" width="120" />
                <el-table-column align="center" prop="endTime" label="申请时间" width="120" />
                <el-table-column align="center" prop="endTime" label="是否汇总" width="120" />
                <el-table-column align="center" prop="endTime" label="规格数" width="120" />
                <el-table-column align="center" prop="endTime" label="规格单位" width="120" />
                <el-table-column align="center" prop="endTime" label="物料单位" width="120" />
                <el-table-column align="center" prop="endTime" label="级别" width="120" />
                <el-table-column align="center" prop="endTime" label="供应商" width="120" />
                <el-table-column align="center" prop="endTime" label="生产商" width="120" />
              </JNPF-table>
              <pagination :total="total2" style="text-align: center;" :page.sync="listQuery2.currentPage"
                :limit.sync="listQuery2.pageSize" @pagination="initData2" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { PostApiActionSQL } from '@/api/summary'
export default {
  name: 'Procure',
  data() {
    return {
      keyword: '',
      list: [{ fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }, { fullName: 111 }],
      list2: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      date: "",
      total: 0,
      total2: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      listQuery2: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      options: [{ label: '未汇总', value: '未汇总' }, { label: '部分汇总', value: '部分汇总' }, { label: '已汇总', value: '已汇总' },],
      form: { SYB: "", ISHZ: "未汇总", FACTORY: "" },
      formInline: {
        user: '',
        region: ''
      },
      sybList: [],
      GCList: []
    }
  },
  created() {
    // this.initData()
    this.getSYBs()
  },
  methods: {
    getSYBs() {
      PostApiActionSQL('482512403683082757').then(r => {
        console.log(r);
        this.sybList = r.data
      })
    },
    getGC(val) {
      this.form.FACTORY = ''
      const data = { "paramList": [{ "field": "SYB", "fieldName": "事业部", "dataType": "varchar", "required": 0, "defaultValue": val }], "tenantId": "", "origin": "preview" }
      PostApiActionSQL('482532887317447173', data).then(r => {
        console.log(r);
        this.GCList = r.data
      })
    },
    onRowClick(row, column, event) {

      PostApiActionSQL('482512403683082757').then(r => {
        console.log(r);
        this.list2 = r.data
      })
    },
    onSubmit() {
      console.log('submit!');
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
    reset() {
      this.keyword = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      TimeTaskList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    initData2() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword
      }
      TimeTaskList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(index, id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        TimeTaskDelete(id).then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      }).catch(() => { });
    },
    handleUpdateState(row) {
      const txt = row.enabledMark ? '停止' : '启用'
      this.$confirm(`您确定要${txt}该任务, 是否继续?`, '提示', {
        type: 'warning'
      }).then(() => {
        const reqMethod = row.enabledMark ? TimeTaskStop : TimeTaskEnable
        reqMethod(row.id).then(res => {
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
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    closeForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.keyword = ''
        this.listQuery = {
          currentPage: 1,
          pageSize: 20,
          sort: 'desc',
          sidx: ''
        }
        this.initData()
      }
    }
  }
}
</script>