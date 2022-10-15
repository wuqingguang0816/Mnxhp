<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模板类型">
              <el-select v-model="listQuery.templateType" placeholder="选择模板类型" clearable>
                <el-option v-for="(item,index) in templateTypeList" :key="index"
                  :label="item.fullName" :value="item.enCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="listQuery.enabledMark" placeholder="选择状态" clearable>
                <el-option v-for="(item,index) in enabledMarkList" :key="index"
                  :label="item.fullName" :value="item.enCode">
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
          <topOpts @add="addEditData()"></topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" max-height="100%">
          <el-table-column prop="fullName" label="名称" show-overflow-tooltip />
          <el-table-column prop="enCode" label="编码" width="120" />
          <el-table-column prop="templateType" label="模板类型" width="120">
            <template slot-scope="scope">
              {{scope.row.templateType=='1'?'系统模板':'自定义模板'}}
            </template>
          </el-table-column>
          <el-table-column prop="messageType" label="消息类型" width="500">
            <template slot-scope="scope">
              <span class="my-span-tag" :style="{'background':colorList[item.type]}"
                v-for="(item,index) in scope.row.messageType" :key="index">
                {{item.fullName}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUserId" label="创建人" width="120" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
            width="120" />
          <el-table-column prop="sortCode" label="排序" width="100" />
          <el-table-column prop="enabledMark" label="状态" width="100" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.enabledMark==1?'success':'danger'" disable-transitions>
                {{ scope.row.enabledMark==1?'启用':'禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <tableOpts @edit="addEditData(scope.row.id)" @del="handleDel(scope.row.id)"
                :editDisabled="scope.row.templateType == '1'"
                :delDisabled="scope.row.templateType == '1'">
                <el-dropdown>
                  <el-button type="text" size="mini">
                    {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="handleCopy(scope.row.id)">复制</el-dropdown-item>
                    <el-dropdown-item @click.native="handleTestSend(scope.row.id)">测试发送
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="handleView(scope.row.id)">详情</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-show="formVisible" ref="Form" @close="closeForm" />
    <TestSend v-if="testSendVisible" ref="TestSend" @close="testSendVisible=false" />
    <Detail v-if="viewVisible" ref="Detail" @close="viewVisible=false" />
  </div>
</template>
<script>
import { getSendConfigList, delMsgTemplate, copySendConfig } from '@/api/msgCenter/sendConfig'
import Form from './Form'
import TestSend from './TestSend'
import Detail from './Detail'

export default {
  name: 'system--mesCenter-sendConfig',
  components: { Form, TestSend, Detail },
  data() {
    return {
      list: [],
      total: 0,
      btnLoading: false,
      listLoading: true,
      listQuery: {
        keyword: '',
        currentPage: 1,
        pageSize: 20
      },
      formVisible: false,
      testSendVisible: false,
      viewVisible: false,
      templateTypeList: [
        { fullName: "系统模板", enCode: '1' },
        { fullName: "自定义模板", enCode: '0' }
      ],
      enabledMarkList: [
        { fullName: "启用", enCode: '1' },
        { fullName: "禁用", enCode: '0' },
      ],
      colorList: ['', '#2870F8', '#6DE083', '#F48282', '#6893F5', '#64B0F4', '#FF96B2']
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.listLoading = true
      getSendConfigList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    addEditData(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id)
      })
    },
    handleCopy(id) {
      this.$confirm('您确定要复制该数据, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        copySendConfig(id).then(res => {
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
    handleTestSend(id) {
      this.testSendVisible = true
      this.$nextTick(() => {
        this.$refs.TestSend.init(id)
      })
    },
    handleView(id) {
      this.viewVisible = true
      this.$nextTick(() => {
        this.$refs.Detail.init(id)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delMsgTemplate(id).then(res => {
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
    search() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.listQuery.sort = 'desc'
      this.initData()
    },
    reset() {
      this.listQuery.keyword = ''
      this.listQuery.templateType = ''
      this.listQuery.enabledMark = ''
      this.search()
    },
    closeForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) this.initData()
    },
  }
}
</script>
<style lang="scss" scoped>
.my-span-tag {
  margin-right: 8px;
  color: #fff;
  height: 24px;
  padding: 0 8px;
  line-height: 24px;
  border-radius: 4px;
  white-space: nowrap;
  display: inline-block;
  font-size: 12px;
}
</style>