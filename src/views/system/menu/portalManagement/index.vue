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
          <template v-if="!formChildVisible">
            <el-row class="JNPF-common-search-box" :gutter="16">
              <el-form @submit.native.prevent>
                <el-col :span="6">
                  <el-form-item label="关键词">
                    <el-input v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable
                      @keyup.enter.native="initData()" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="initData()">
                      {{ $t("common.search") }}</el-button>
                    <el-button icon="el-icon-refresh-right" @click="reset()">
                      {{ $t("common.reset") }}
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <div class="JNPF-common-layout-main JNPF-flex-main">
              <el-tabs type="border-card" v-model="listQuery.category" class="menu-tab">
                <el-tab-pane label="Web菜单" name="Web"></el-tab-pane>
                <el-tab-pane label="App菜单" name="App"></el-tab-pane>
                <div class="box">
                  <div class="JNPF-common-head">
                    <topOpts @add="addOrUpdateHandle()">
                      <el-button type="text" icon="el-icon-upload2" @click="importMenu">导入
                      </el-button>
                    </topOpts>
                    <div class="JNPF-common-head-right">
                      <el-tooltip effect="dark" content="展开" placement="top">
                        <el-link v-show="!expands" type="text"
                          icon="icon-ym icon-ym-btn-expand JNPF-common-head-icon" :underline="false"
                          @click="toggleExpand()" />
                      </el-tooltip>
                      <el-tooltip effect="dark" content="折叠" placement="top">
                        <el-link v-show="expands" type="text"
                          icon="icon-ym icon-ym-btn-collapse JNPF-common-head-icon"
                          :underline="false" @click="toggleExpand()" />
                      </el-tooltip>
                      <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                        <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon"
                          :underline="false" @click="initData()" />
                      </el-tooltip>
                    </div>
                  </div>
                  <JNPF-table v-loading="listLoading" :data="treeList" row-key="id"
                    v-if="refreshTable" :default-expand-all="expands"
                    :tree-props="{children: 'children', hasChildren: ''}">
                    <el-table-column prop="fullName" label="菜单名称" width="260" />
                    <el-table-column prop="urlAddress" label="菜单地址" show-overflow-tooltip />
                    <el-table-column prop="icon" label="图标" width="50" align="center">
                      <template slot-scope="scope">
                        <i :class="scope.row.icon + ' table-icon'" />
                      </template>
                    </el-table-column>
                    <el-table-column prop="type" label="类型" width="70" align="center">
                      <template slot-scope="scope">
                        <span v-if="scope.row.type === 1">目录</span>
                        <span v-if="scope.row.type === 2">页面</span>
                        <span v-if="scope.row.type === 3">功能</span>
                        <span v-if="scope.row.type === 4">字典</span>
                        <span v-if="scope.row.type === 5">报表</span>
                        <span v-if="scope.row.type === 6">大屏</span>
                        <span v-if="scope.row.type === 7">外链</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="sortCode" label="排序" width="70" align="center" />
                    <el-table-column prop="enabledMark" label="状态" width="70" align="center">
                      <template slot-scope="scope">
                        <el-tag :type="scope.row.enabledMark == 1 ? 'success' : 'danger'"
                          disable-transitions>{{scope.row.enabledMark==1?'启用':'禁用'}}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                      <template slot-scope="scope">
                        <tableOpts @edit="addOrUpdateHandle(scope.row.id)"
                          @del="handleDel(scope.row.id)">
                          <template v-if="scope.row.type && scope.row.type != 1">
                            <el-dropdown>
                              <span class="el-dropdown-link">
                                <el-button type="text" size="mini">{{ $t("common.moreBtn")
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                              </span>
                              <el-dropdown-menu slot="dropdown">
                                <template v-if="[2, 3, 4].indexOf(scope.row.type) > -1">
                                  <el-dropdown-item @click.native="addChild(scope.row)">
                                    新建子级
                                  </el-dropdown-item>
                                </template>
                              </el-dropdown-menu>
                            </el-dropdown>
                          </template>
                        </tableOpts>
                      </template>
                    </el-table-column>
                  </JNPF-table>
                </div>
              </el-tabs>
            </div>
          </template>
          <div class="main" v-else>
            <el-row class="JNPF-common-search-box" :gutter="16">
              <el-form @submit.native.prevent>
                <el-col :span="6">
                  <el-form-item label="关键词">
                    <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
                      @keyup.enter.native="search()" />
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
                <topOpts @add="addPortal">
                </topOpts>
                <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
                  <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                    @click="initData()" />
                </el-tooltip>
              </div>
              <JNPF-table v-loading="listLoading" :data="list">
                <el-table-column prop="version" label="门户名称" align="center" />
                <el-table-column prop="enabledMark" label="默认首页" align="center" />
                <el-table-column prop="description" label="说明" align="center" />
                <el-table-column prop="creatorUser" label="创建人" />
                <el-table-column prop="creatorTime" label="创建时间"
                  :formatter="jnpf.tableDateFormat" />
                <el-table-column prop="lastModifyTime" label="最后修改时间"
                  :formatter="jnpf.tableDateFormat" />
                <el-table-column label="操作" fixed="right" width="200">
                  <template slot-scope="scope">
                    <tableOpts @edit="addOrUpdateHandle(scope.row.id)"
                      @del="handleDel(scope.row.id)">
                      <template v-if="scope.row.type && scope.row.type != 1">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <el-button type="text" size="mini">{{ $t("common.moreBtn")
                            }}<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handleButtonAuthorize(scope.row)">
                              授权
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="release(scope.row)">
                              发布
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                    </tableOpts>
                  </template>
                </el-table-column>
              </JNPF-table>
              <pagination :total="total" :page.sync="portalQuery.currentPage"
                :limit.sync="portalQuery.pageSize" @pagination="initData" />
            </div>
            <Form v-if="formVisible" ref="Form" @refreshDataList="initData" />
            <PortalForm v-if="portalVisible" ref="PortalForm" @refreshDataList="initData" />
            <el-dialog title="所属上级" :visible.sync="selectMenuVisible"
              class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
              <el-form class="dialog-form-main" :model="dataForm" :rules="formRule"
                label-position="right" label-width="50px" ref="dataForm">
                <el-form-item label="上级" prop="parentId">
                  <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData"
                    placeholder="选择上级菜单" />
                </el-form-item>
                <upload-btn v-show="false" :url="'/api/system/Menu/'+systemId+'/Action/Import'"
                  @on-success="uploadSuccess" :buttonText="$t('common.confirmButton')"
                  buttonType="primary" :showIcon='false'
                  :data="{parentId:dataForm.parentId,category:this.listQuery.category}"
                  ref="uploadRef" />
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="selectMenuVisible = false">{{$t('common.cancelButton')}}
                </el-button>
                <el-button type="primary" @click="handleUpload">{{$t('common.confirmButton')}}
                </el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {
  getMenuList,
  updateMenuState,
  delMenu,
  exportMenu,
  getMenuSelector
} from "@/api/system/menu";
import Form from "./Form";
import PortalForm from "./PortalForm";

export default {
  name: "PortalManagement",
  components: {
    Form,
    PortalForm
  },
  data() {
    return {
      options: [],
      listQuery: {
        keyword: "",
        category: "Web",
      },
      treeList: [],
      btnLoading: false,
      listLoading: true,
      formVisible: false,
      buttonAuthorizeListDrawer: false,
      columnAuthorizeListDrawer: false,
      formAuthorizeListDrawer: false,
      dataAuthorizeListDrawer: false,
      expands: true,
      refreshTable: true,
      title: '',
      systemId: '',
      selectMenuVisible: false,
      formRule: {
        parentId: [
          { required: true, message: '上级菜单不能为空', trigger: 'change' }
        ]
      },
      treeData: [],
      dataForm: {
        parentId: ""
      },
      menuBtnLoading: false,
      formChildVisible: false,
      portalVisible: false,
      keyword: '',
      portalQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      total: 0,
      list: [],
      portalId: '',
    };
  },
  watch: {
    "listQuery.category": function (val) {
      this.reset();
    },
  },
  methods: {
    goBack(isRefresh) {
      if (this.formChildVisible) {
        return this.formChildVisible = false
      }
      this.$emit('close', isRefresh)
    },
    init(data) {
      this.title = data.fullName
      this.systemId = data.id
      this.initData();
    },
    reset() {
      this.listQuery.keyword = "";
      this.initData();
    },
    initData() {
      this.listLoading = true;
      getMenuList(this.systemId, this.listQuery)
        .then((res) => {
          this.treeList = res.data.list;
          this.listLoading = false;
          this.btnLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
          this.btnLoading = false;
        });
    },
    toggleExpand() {
      this.refreshTable = false;
      this.expands = !this.expands;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    addOrUpdateHandle(id) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.Form.init(id, this.listQuery.category, this.systemId);
      });
    },
    addChild(item) {
      this.formChildVisible = true
      this.title = item.fullName
      this.portalId = item.id || 0
      this.initDataPortal()
    },
    addPortal(id) {
      this.portalVisible = true
      this.$nextTick(() => {
        this.$refs.PortalForm.init(id, this.systemId);
      });
    },
    reset() {
      this.listQuery.keyword = "";
      this.initDataPortal();
    },
    initDataPortal() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        keyword: this.keyword,
        category: this.category
      }
      FlowEngineList(query).then((res) => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleUpdateState(row) {
      const txt = row.enabledMark ? "禁用" : "开启";
      this.$confirm(`您确定要${txt}当前菜单吗, 是否继续?`, "提示", {
        type: "warning",
      })
        .then(() => {
          updateMenuState(row.id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                row.enabledMark = row.enabledMark ? 0 : 1;
              },
            });
          });
        })
        .catch(() => { });
    },
    handleDel(id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      })
        .then(() => {
          delMenu(id).then((res) => {
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
    handleButtonAuthorize(row) {
    },
    release(id) {

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
    importMenu() {
      this.dataForm.parentId = ''
      this.selectMenuVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
      getMenuSelector({ category: this.listQuery.category }, '', this.systemId).then((res) => {
        let topItem = {
          fullName: "顶级节点",
          hasChildren: true,
          id: "-1",
          children: res.data.list
        }
        this.treeData = [topItem]
      })
    },
    handleUpload() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$refs.uploadRef.$refs.uploadBtn.$el.click()
        }
      })
    },
    uploadSuccess() {
      this.selectMenuVisible = false
      this.initData()
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
</style>
