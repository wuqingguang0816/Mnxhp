<template>
  <div>
    <el-drawer :title="dialogTitle" :visible.sync="buttonAuthorizeListDrawer"
      :wrapperClosable="false" ref="drawer" size="700px" class="JNPF-common-drawer">
      <div class="JNPF-flex-main">
        <div class="JNPF-common-head">
          <topOpts @add="handleAddEdit('')" addPerCode="btn_btnPer_add" />
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh
              JNPF-common-head-icon" :underline="false" @click="getList()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="treeList" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}">
          <el-table-column prop="fullName" label="按钮名称" width="160" />
          <el-table-column prop="enCode" label="按钮编码" />
          <el-table-column prop="sortCode" label="排序" width="90" align="center" />
          <el-table-column label="状态" width="90">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabledMark" :active-value=1 :inactive-value=0
                @change="handleUpdateState(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <tableOpts @edit="handleAddEdit(scope.row.id)" @del="handleDel(scope.row.id)"
                editPerCode="btn_btnPer_edit" delPerCode="btn_btnPer_remove" />
            </template>
          </el-table-column>
        </JNPF-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-drawer>
    <ButtonAuthorizeForm v-if="buttonAuthorizeFormVisible" ref="ButtonAuthorizeForm"
      @refreshDataList="getList" />
  </div>
</template>

<script>
import {
  getButtonAuthorizeList,
  updateButtonState,
  delButton
} from '@/api/system/buttonAuthorize'
import ButtonAuthorizeForm from './Form'

export default {
  components: {
    ButtonAuthorizeForm
  },
  inheritAttrs: false,
  data() {
    return {
      buttonAuthorizeListDrawer: false,
      buttonAuthorizeFormVisible: false,
      dialogTitle: '',
      params: {
        keyword: ''
      },
      moduleId: '',
      loading: false,
      btnLoading: false,
      listLoading: false,
      treeList: [],
    }
  },
  methods: {
    init(moduleId, fullName) {
      this.buttonAuthorizeListDrawer = true
      this.moduleId = moduleId
      this.dialogTitle = `按钮权限 - ${fullName}`
      this.$nextTick(() => {
        this.params.keyword = ''
        this.getList()
      })
    },
    getList() {
      this.listLoading = true
      getButtonAuthorizeList(this.moduleId, this.params).then(res => {
        this.treeList = res.data.list
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    handleReLoad() {
      this.btnLoading = true
      this.getList()
    },
    handleUpdateState(row) {
      const flag = row.enabledMark
      updateButtonState(row.id).then(res => {
        this.$message({
          type: 'success',
          message: res.msg,
          duration: 1500,
          onClose: () => {
            row.enabledMark = flag
          }
        })
      }).catch(() => {
        row.enabledMark = !flag
      })
    },
    handleAddEdit(id) {
      this.buttonAuthorizeFormVisible = true
      this.$nextTick(() => {
        this.$refs.ButtonAuthorizeForm.init(this.moduleId, id)
      })
    },
    handleDel(id) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delButton(id).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.getList()
            }
          })
        })
      }).catch(() => { })
    }
  }
}
</script>
