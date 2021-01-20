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
          <topOpts @add="addOrUpdateHandle()" addText="新建任务"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="reset()" />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" @expand-change="expandChange"
          :hasNO="false">
          <el-table-column type="expand" width="40">
            <template slot-scope="props">
              <el-table v-loading="props.row.childTableLoading" :data="props.row.childTable" stripe
                size='mini' :element-loading-text="$t('common.loadingText')">
                <el-table-column prop="runTime" label="执行时间" :formatter="jnpf.tableDateFormat" />
                <el-table-column prop="runResult" label="执行结果">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.runResult == 0 ? 'success' : 'danger'">
                      {{scope.row.runResult==0?'成功':'失败'}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="执行说明" />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" label="序号" align="center" />
          <el-table-column prop="fullName" label="任务标题" sortable show-overflow-tooltip
            v-if="jnpf.hasP('fullName')" />
          <el-table-column prop="enCode" label="任务编码" sortable width="200"
            v-if="jnpf.hasP('enCode')" />
          <el-table-column prop="runCount" label="执行次数" sortable width="100"
            v-if="jnpf.hasP('runCount')" />
          <el-table-column prop="lastRunTime" label="最后执行时间" sortable width="120"
            :formatter="jnpf.tableDateFormat" v-if="jnpf.hasP('lastRunTime')" />
          <el-table-column prop="nextRunTime" label="下次运行时间" sortable width="120"
            :formatter="jnpf.tableDateFormat" v-if="jnpf.hasP('nextRunTime')" />
          <el-table-column prop="description" label="执行说明" show-overflow-tooltip
            v-if="jnpf.hasP('description')" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center"
            v-if="jnpf.hasP('sortCode')" />
          <el-table-column label="执行状态" prop="enabledMark" width="70" align="center"
            v-if="jnpf.hasP('enabledMark')">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'" disable-transitions>
                {{scope.row.enabledMark==1?'正常':'停止'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)"
                @del="handleDel(scope.$index,scope.row.id)">
                <el-button size="mini" type="text" @click="stop(scope.row)"
                  v-if="scope.row.enabledMark==1" v-has="'btn_stop'">停止
                </el-button>
                <el-button size="mini" type="text" @click="open(scope.row)" v-else
                  v-has="'btn_enable'">
                  启用
                </el-button>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
        <Form v-show="formVisible" ref="Form" @close="colseForm" />
      </div>
    </div>
  </div>
</template>

<script>
import { TimeTaskList, TimeTaskDelete, TimeTaskStop, TimeTaskEnable, TimeTaskTaskLogList } from '@/api/system/timeTask'
import Form from './Form'
export default {
  name: 'system-task',
  components: { Form },
  data() {
    return {
      keyword: '',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      formVisible: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
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
        for (let i = 0; i < this.list.length; i++) {
          this.$set(this.list[i], 'isExpanded', false)
          this.$set(this.list[i], 'childTableLoading', false)
          this.$set(this.list[i], 'childTable', [])
        }
        this.listLoading = false
      })
    },
    expandChange(rows) {
      rows.isExpanded = !rows.isExpanded
      if (!rows.isExpanded) return
      if (rows.childTable.length) return
      rows.childTableLoading = true
      TimeTaskTaskLogList(rows.id).then(res => {
        rows.childTableLoading = false
        rows.childTable = res.data.list
      }).catch(() => {
        rows.childTableLoading = false
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
      TimeTaskDelete(id).then(res => {
        this.list.splice(index, 1);
        this.$message({
          type: 'success',
          message: res.msg
        });
      })
    },
    stop(row) {
      this.$confirm('您确定要停止该任务, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        TimeTaskStop(row.id).then(res => {
          row.enabledMark = '0'
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    open(row) {
      this.$confirm('您确定要启用该任务, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        TimeTaskEnable(row.id).then(res => {
          row.enabledMark = '1'
          this.$message({
            type: 'success',
            message: res.msg
          });
        })
      }).catch(() => { });
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    colseForm(isRefresh) {
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
    },
  }
}
</script>
