<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="query.keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="表单分类">
              <el-select v-model="formType" placeholder="表单分类" clearable>
                <el-option label="系统表单" :value="1" />
                <el-option label="自定义表单" :value="2" />
                <el-option label="功能表单" :value="2" />
              </el-select>
            </el-form-item>
          </el-col> -->
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
          <topOpts @add="dialogVisible=true">
            <!-- <upload-btn url="/api/workflow/Engine/FlowEngine/Actions/ImportData"
              @on-success="reset()" /> -->
          </topOpts>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="fullName" label="表单名称" min-width="170" />
          <el-table-column prop="enCode" label="表单编码" width="170" />
          <el-table-column prop="formType" label="表单类型" width="170">
            <template slot-scope="scope">
              <span>{{ scope.row.formType == 1 ? "自定义表单" : (scope.row.flowType == 2? "功能表单" : "系统表单" )}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUserName" label="创建人" width="170">
          </el-table-column>
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat"
            width="170" />
          <el-table-column prop="creatorTime" label="最后修改时间" :formatter="jnpf.tableDateFormat"
            width="170" />
          <el-table-column prop="sortCode" label="排序" width="150" align="center" />
          <el-table-column label="状态" width="150" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" disable-transitions>
                {{scope.row.status==1?'已发布':'未发布'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id,scope.row.formType,0)"
                @del="handleDel(scope.row.id)">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                        class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="releaseForm(scope.row.id)">
                      发布表单</el-dropdown-item>
                    <el-dropdown-item @click.native="rollBackForm(scope.row.id)">
                      回滚表单</el-dropdown-item>
                    <el-dropdown-item @click.native="copy(scope.row.id)">
                      复制表单</el-dropdown-item>
                    <el-dropdown-item @click.native="exportModel(scope.row)">
                      导出表单</el-dropdown-item>
                    <el-dropdown-item @click.native="readFrom(scope.row)">
                      表单预览</el-dropdown-item>
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
    <Form v-if="formVisible" ref="Form" @close="closeForm" />
    <Preview v-if="previewVisible" ref="preview" @close="previewVisible=false" />
    <el-dialog title="新建表单" :visible.sync="dialogVisible"
      class="JNPF-dialog JNPF-dialog_center add-dialog" lock-scroll width="1000px"
      :show-close="false">
      <div class="add-main">
        <div class="add-item add-item-sys" @click="addFlow(1,0)">
          <i class="add-icon icon-ym icon-ym-systemForm"></i>
          <div class="add-txt">
            <p class="add-title">系统表单</p>
            <p class="add-desc">关联系统原有表单，便捷设计</p>
          </div>
        </div>
        <div class="add-item" @click="addFlow(1,1)">
          <i class="add-icon icon-ym icon-ym-customForm"></i>
          <div class="add-txt">
            <p class="add-title">自定义表单</p>
            <p class="add-desc">自定义设计流程表单</p>
          </div>
        </div>
        <div class="add-item" @click="addFlow(2,0)">
          <i class="add-icon  icon-ym icon-ym-functionForm"></i>
          <div class="add-txt">
            <p class="add-title">功能表单</p>
            <p class="add-desc">关系系统开发功能表单</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Form from './Form'
import Preview from './Preview.vue'
import { getFormList, release, del, copyForm } from '@/api/workFlow/FormDesign'
export default {
  name: 'workFlow-flowEngine',
  components: { Form, Preview },
  data() {
    return {
      query: { keyword: '', type: 8 },
      downloadFormVisible: false,
      sort: 'flowForm',
      dialogVisible: false,
      previewVisible: false,
      formManagementVisible: false,
      list: [],
      formType: '',
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      total: 0,
      listLoading: false,
      formVisible: false,
      addVisible: false,
      categoryList: []

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
      this.query.keyword = ''
      this.formType = ''
      this.search()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        ...this.query,
        formType: this.formType
      }
      getFormList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        del(id).then(res => {
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
    copy(id) {
      this.$confirm('您确定要复制该功能表单, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        copyForm(id).then(res => {
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
    exportModel(id) {
      this.$confirm('您确定要导出该功能表单, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        let method = null
        if (this.query.type == 1) {
          method = exportData
        }
        if (this.query.type == 2) {
          method = exportAppData
        }
        method(id).then(res => {
          if (res.data.url) window.location.href = this.define.comUrl + res.data.url
        })
      }).catch(() => { });
    },
    handleAdd(webType) {
      this.addOrUpdateHandle('', webType)
    },
    closeForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.initData()
      }
    },
    handleUpdate() {
    },
    formManagement() {

    },
    formVersion(item) {
      this.formManagementVisible = true
      this.$nextTick(() => {
        this.$refs.formManagement.init(item)
      })
    },
    addFlow(flowType, formType) {
      this.dialogVisible = false
      this.addOrUpdateHandle('', flowType, formType)
    },
    // 新增 / 修改
    addOrUpdateHandle(id, flowType, formType) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(id, flowType, formType)
      })
    },
    readFrom(currRow) {
      let data = {
        enCode: currRow.enCode,
        fullName: currRow.fullName,
        formType: currRow.formType,
        id: currRow.id,
        isRelease: currRow.state
      }
      this.previewVisible = true
      this.$nextTick(() => {
        this.$refs.preview.init(data)
      })
    },
    enabledMark(id, enabledMark) {
      let str = enabledMark === 1 ? "表单停用" : "表单启用"
      this.$confirm(str + '?', '提示', {
        type: 'warning'
      }).then(() => {
        EnabledMark(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      })
    },
    releaseForm(id) {
      this.$confirm('发布表单会覆盖当前线上版本，是否继续？', '发布确认', {
        type: 'warning'
      }).then(() => {
        release(id, 1).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      })
    },
    rollBackForm(id) {
      this.$confirm('此操作将当前编辑的表单内容回滚为已经发布的表单内容，是否继续？', '提示', {
        type: 'warning'
      }).then(() => {
        release(id, 0).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.initData()
            }
          });
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.add-dialog {
  >>> .el-dialog__header {
    display: none !important;
  }
  >>> .el-dialog__body {
    padding: 50px 40px !important;
  }
}
.add-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .add-item {
    width: 255px;
    height: 136px;
    background: #eff9ff;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 20px;
    &.add-item-sys {
      background: #f1f5ff;
      .add-icon {
        background: #ccd9ff;
        color: #537eff;
      }
    }
    .add-icon {
      width: 56px;
      height: 56px;
      margin-right: 10px;
      background: #ceeaff;
      border-radius: 10px;
      color: #46adfe;
      flex-shrink: 0;
      font-size: 30px;
      line-height: 56px;
      text-align: center;
    }
    .add-txt {
      height: 56px;
      P {
        line-height: 28px;
      }
      .add-title {
        font-size: 18px;
        font-weight: bold;
      }
      .add-desc {
        color: #8d8989;
        font-size: 12px;
      }
    }
  }
}
</style>
