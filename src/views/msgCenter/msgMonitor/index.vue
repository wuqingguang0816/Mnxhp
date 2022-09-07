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
            <el-form-item label="消息类型">
              <el-select v-model="msgType" placeholder="消息类型" clearable>
                <el-option v-for="item in msgTypeList" :key="item.enCode" :label="item.fullName"
                  :value="item.enCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发送时间">
              <el-date-picker v-model="pickerVal" type="daterange" start-placeholder="开始日期"
                end-placeholder="结束日期" :picker-options="pickerOptions" value-format="timestamp"
                clearable :editable="false">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="refresh()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <div>
            <el-button type="danger" @click="handleDel" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="text" class="JNPF-table-delBtn" @click="handleDelAll">一键清空
            </el-button>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" hasC @selection-change="handleChange">
          <el-table-column prop="messageType" label="消息类型" width="150" />
          <el-table-column prop="messageSource" label="消息来源" width="150" />
          <el-table-column prop="title" label="标题" width="230" />
          <el-table-column prop="content" label="内容" show-overflow-tooltip min-width="150" />
          <el-table-column prop="sendTime" label="发送时间" width="200"
            :formatter="jnpf.tableDateFormat" />
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="toDetail(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Detail v-if="detailVisible" ref="DetailBox" @close="closeForm" />
  </div>
</template>
<script>
import { getMsgMonitorList, delMsgMonitor, emptyMsgMonitor } from '@/api/msgCenter/msgMonitor'
import Detail from './Detail'
export default {
  name: 'system-mesCenter-msgMonitor',
  components: { Detail },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
      },
      detailVisible: false,
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
      keyword: '',
      pickerVal: [],
      sendTime: '',
      msgType: '',
      msgTypeList: [],
      multipleSelection: []
    }
  },
  created() {
    this.getMsgTypeList()
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
        sendTime: this.sendTime,
        messageType: this.msgType,
      }
      getMsgMonitorList(query).then(async res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    getMsgTypeList() {
      this.$store.dispatch('base/getMsgTypeList').then((res) => {
        this.msgTypeList = res
      })
    },
    search() {
      if (this.pickerVal && this.pickerVal.length) {
        this.sendTime = this.pickerVal
      } else {
        this.sendTime = ''
      }
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
      }
      this.initData()
    },
    toDetail(id) {
      this.detailVisible = true
      this.$nextTick(() => {
        this.$refs.DetailBox.init(id)
      })
    },
    handleDel() {
      if (!this.multipleSelection.length) {
        this.$message({ type: 'error', message: '请选择一条数据' });
        return
      }
      let data = this.multipleSelection.join(',')
      this.$confirm('您确定要删除这些数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        delMsgMonitor(data).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.refresh();
        })
      }).catch(() => { });
    },
    handleDelAll() {
      this.$confirm('您确定要清空全部数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        emptyMsgMonitor().then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          });
          this.refresh();
        })
      })
    },
    handleChange(val) {
      this.multipleSelection = val.map(item => item.id)
    },
    closeForm(isRefresh) {
      this.detailVisible = false
      if (isRefresh) this.refresh()
    },
    refresh() {
      this.pickerVal = ''
      this.sendTime = ''
      this.keyword = ''
      this.msgType = ''
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
      }
      this.initData()
    }
  }
}
</script>