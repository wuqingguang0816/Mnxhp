<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-common-layout menu-list">
      <div class="JNPF-common-layout-center">
        <div class="JNPF-preview-main flow-form-main">
          <div class="JNPF-common-page-header">
            <el-page-header @back="goBack" :content="title" />
            <div class="options">
              <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
            </div>
          </div>
          <div class="JNPF-common-layout-main JNPF-flex-main">
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
                <topOpts @add="addOrUpdateHandle" addText='添加'>
                </topOpts>
                <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                  <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                    @click="initData()" />
                </el-tooltip>
              </div>
              <JNPF-table v-loading="listLoading" :data="list">
                <el-table-column prop="fullName" label="门户名称" align="center" />
                <el-table-column prop="homePageMark" label="默认首页" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.homePageMark==1?'是':'否'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="creatorUser" label="创建人" />
                <el-table-column prop="creatorTime" label="创建时间"
                  :formatter="jnpf.tableDateFormat" />
                <el-table-column prop="lastModifyTime" label="最后修改时间"
                  :formatter="jnpf.tableDateFormat" />
                <el-table-column prop="sortCode" label="排序" width="70" align="center" />
                <el-table-column prop="enabledMark" label="状态" width="70" align="center">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'"
                      disable-transitions>
                      {{scope.row.enabledMark==1?'启用':'禁用'}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="200">
                  <template slot-scope="scope">
                    <tableOpts @edit="addOrUpdateHandle(scope.row.id)"
                      @del="handleDel(scope.row.id)">
                      <template>
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <el-button type="text" size="mini">{{ $t("common.moreBtn")
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleAuthorize(scope.row.id)">
                              授权
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="openReleaseDialog(scope.row)">
                              发布
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </tableOpts>
                  </template>
                </el-table-column>
              </JNPF-table>
              <pagination :total="total" :page.sync="listQuery.currentPage"
                :limit.sync="listQuery.pageSize" @pagination="initData" />
            </div>
          </div>
          <Form v-if="formVisible" ref="Form" @refreshDataList="refresh" />
          <Transfer ref="transfer" :visible.sync="transferShow" :id="transferId"
            :systemId='systemId' />
          <el-dialog title="同步门户" :visible.sync="releaseDialogVisible" append-to-body
            class="JNPF-dialog JNPF-dialog_center release-dialog" lock-scroll width="600px">
            <el-alert title="此操作将同步该门户，是否继续？" type="warning" :closable="false" show-icon />
            <div class="dialog-main">
              <div class="item" :class="{'active':releaseQuery.pc===1}" @click="selectToggle('pc')">
                <i class="item-icon icon-ym icon-ym-pc"></i>
                <p class="item-title">同步Web端门户</p>
                <div class="icon-checked">
                  <i class="el-icon-check"></i>
                </div>
              </div>
              <div class="item" :class="{'active':releaseQuery.app===1}"
                @click="selectToggle('app')">
                <i class="item-icon icon-ym icon-ym-mobile"></i>
                <p class="item-title">同步APP端门户</p>
                <div class="icon-checked">
                  <i class="el-icon-check"></i>
                </div>
              </div>
            </div>
            <el-form class="dialog-form-main" :model="releaseQuery" label-position="right"
              label-width="50px" ref="releaseForm">
              <el-form-item label="用户" prop="toUserIds">
                <usersSelect v-model="toUserIds" placeholder="全部用户" multiple clearable />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="releaseDialogVisible = false">{{$t('common.cancelButton')}}
              </el-button>
              <el-button type="primary" :loading="releaseBtnLoading" @click="release">
                {{$t('common.confirmButton')}}</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {
  getPortalManageList, delPortal, Release
} from "@/api/system/portal";
import Form from "./Form";
import Transfer from "./Transfer";
export default {
  name: "PortalManagement",
  components: {
    Form, Transfer
  },
  data() {
    return {
      title: "",
      keyword: "",
      listLoading: true,
      formVisible: false,
      systemId: '',
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      releaseQuery: {
        pc: 1,
        app: 1,
        systemId: '',
        toUserIds: ''
      },
      total: 0,
      list: [],
      portalId: '',
      releaseDialogVisible: false,
      currRow: {},
      toUserIds: [],
      releaseBtnLoading: false,
      transferShow: false,
      transferId: ''
    }
  },
  methods: {
    goBack(isRefresh) {
      if (this.formChildVisible) {
        return this.formChildVisible = false
      }
      this.$emit('close', isRefresh)
    },
    init(data) {
      this.title = data.fullName + '的门户管理'
      this.systemId = data.id
      this.initData();
    },
    handleAuthorize(id) {
      this.transferId = id
      this.transferShow = true
    },
    openReleaseDialog(row) {
      this.currRow = row
      this.releaseDialogVisible = true
      this.releaseQuery = {
        pc: 1,
        app: 1,
        systemId: '',
        toUserIds: ''
      }
      this.$nextTick(() => {
        this.$refs['releaseForm'] && this.$refs['releaseForm'].resetFields()
      })
    },
    selectToggle(key) {
      this.releaseQuery[key] = this.releaseQuery[key] === 1 ? 0 : 1
    },
    // 发布菜单
    release() {
      if (!this.releaseQuery.pc && !this.releaseQuery.app) return this.$message.error('请至少选择一种同步方式')
      this.releaseBtnLoading = true
      this.releaseQuery.systemId = this.systemId
      this.releaseQuery.toUserIds = this.toUserIds.join(',')
      Release(this.currRow.id, this.releaseQuery).then(res => {
        this.releaseBtnLoading = false
        this.releaseDialogVisible = false
        this.initData()
        this.$message({
          type: 'success',
          message: res.msg,
          duration: 1000,
        });
      }).catch(() => { this.releaseBtnLoading = false })
    },
    refresh(isRefresh) {
      this.formVisible = false
      if (isRefresh) {
        this.initData()
      }
    },
    reset() {
      this.keyword = "";
      this.search();
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
      this.listLoading = true;
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
      }
      getPortalManageList(this.systemId, query).then((res) => {
        this.list = res.data.list;
        this.total = res.data.pagination.total
        this.listLoading = false;
        this.btnLoading = false;
      })
        .catch(() => {
          this.listLoading = false;
          this.btnLoading = false;
        });
    },
    addOrUpdateHandle(id) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.Form.init(id, this.systemId);
      });
    },
    handleDel(id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      }).then(() => {
        delPortal(id).then((res) => {
          this.$message({
            type: "success",
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.initData();
            },
          });
        });
      })
        .catch(() => { });
    },
    exportMenu(id) {
      this.$confirm("您确定要导出该菜单, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          exportMenu(id).then((res) => {
            this.jnpf.downloadFile(res.data.url);
          });
        })
        .catch(() => { });
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-list {
  .table-icon {
    vertical-align: middle;
    font-size: 16px;
  }
  .JNPF-common-layout-main {
    padding: 0;
  }
  .menu-tab {
    height: 100%;
    >>> .el-tabs__content {
      padding: 0;
      height: calc(100% - 40px);
      .box {
        flex: 1;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
      }
    }
  }
}
.flow-form-main {
  .el-form {
    padding-top: 0;
  }
  >>> .el-tabs__header {
    padding: 0;
  }
}
.release-dialog {
  >>> .el-dialog {
    .el-dialog__body {
      padding: 12px 55px;
    }
  }
  .dialog-form-main {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    >>> .el-form-item {
      width: 100%;
    }
  }
  .dialog-main {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .item {
      position: relative;
      width: 215px;
      height: 127px;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      border-radius: 6px;
      text-align: center;
      padding-top: 20px;
      color: #606266;
      &.active {
        border-color: #1890ff;
        color: #1890ff;
        box-shadow: 0 0 6px rgba(6, 58, 108, 0.1);
        .item-icon {
          border-color: #1890ff;
        }
        .icon-checked {
          display: block;
        }
      }
      .item-icon {
        display: inline-block;
        width: 44px;
        height: 44px;
        margin-bottom: 16px;
        border: 2px solid #606266;
        line-height: 40px;
        font-size: 24px;
        text-align: center;
        border-radius: 50%;
      }
      .item-title {
        font-size: 16px;
        font-weight: 400;
      }
      .icon-checked {
        display: none;
        width: 18px;
        height: 18px;
        border: 18px solid #1890ff;
        border-left: 18px solid transparent;
        border-top: 18px solid transparent;
        border-bottom-right-radius: 4px;
        position: absolute;
        right: 0px;
        bottom: 0px;

        i {
          font-size: 16px;
          position: absolute;
          top: 0;
          left: -2px;
          color: #fff;
        }
      }
    }
  }
}
</style>
