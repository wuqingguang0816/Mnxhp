<template>
  <div class="popupSelect-container">
    <div class="el-select" @click="openDialog">
      <el-input :placeholder="type==1?'请选择选择模板':'请选择选择账号'" v-model="title" readonly
        :validate-event="false" @mouseenter.native="inputHovering = true"
        @mouseleave.native="inputHovering = false">
        <template slot="suffix">
          <i v-show="!showClose"
            :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"></i>
          <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close"
            @click.stop="clear"></i>
        </template>
      </el-input>
    </div>
    <el-dialog :title="type==1?'选择模板':'选择账号'" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select" lock-scroll append-to-body
      width='600px'>
      <div class="JNPF-common-layout">
        <div class="JNPF-common-layout-center">
          <el-row class="JNPF-common-search-box" :gutter="16">
            <el-form @submit.native.prevent>
              <el-col :span="10">
                <el-form-item label="关键词">
                  <el-input v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable
                    @keyup.enter.native="search()" class="search-input" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                  <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
            <div class="JNPF-common-search-box-right">
              <el-tooltip effect="dark" content="刷新" placement="top">
                <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                  @click="initData()" />
              </el-tooltip>
            </div>
          </el-row>
          <div class="JNPF-common-layout-main JNPF-flex-main">
            <JNPF-table v-loading="listLoading" :data="list" :border="false" highlight-current-row
              @row-click="rowClick" :hasNO="false">
              <el-table-column width="50">
                <template slot-scope="scope">
                  <el-radio :label="scope.row.id" v-model="checked">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column type="index" label="序号" />
              <el-table-column prop="fullName" label="名称" show-overflow-tooltip />
              <el-table-column prop="enCode" label="编码" />
            </JNPF-table>
            <pagination :total="total" :page.sync="listQuery.currentPage"
              :limit.sync="listQuery.pageSize" @pagination="initData" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMsgTemplateList } from '@/api/msgCenter/msgTemplate'
import { getConfigList } from '@/api/msgCenter/accountConfig'
export default {
  name: 'sendConfig-TemplateDialog',
  props: {
    value: {
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    messageType: {
      type: [String, Number],
      default: 0
    },
    messageSource: {
      type: [String, Number],
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      list: [],
      innerValue: '',
      listQuery: {
        keyword: '',
        currentPage: 1,
        pageSize: 20,
        enabledMark: 1,
        messageType: 1
      },
      total: 0,
      checked: '',
      checkedRow: {},
      listLoading: false,
      inputHovering: false,
      visible: false
    }
  },
  computed: {
    showClose() {
      let hasValue = this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable &&
        !this.disabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    }
  },
  methods: {
    initData() {
      this.listLoading = true
      if (this.type == 2) this.listQuery.type = this.messageType
      if (this.type != 2) {
        this.listQuery.messageType = this.messageType
        this.listQuery.messageSource = this.messageSource
      }
      const formMethod = this.type == 2 ? getConfigList : getMsgTemplateList
      formMethod(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
        if (this.value) this.checkedRow = this.list.find(ele => ele.id == this.value) || {}
      }).catch(() => { this.listLoading = false })
    },
    openDialog() {
      if (this.disabled) return
      if (!this.messageType) return this.$message({ message: '请选择消息类型', type: 'warning' });
      this.checked = this.value
      this.visible = true
      this.reset()
    },
    reset() {
      this.listQuery.keyword = ''
      this.search()
    },
    search() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.initData()
    },
    clear() {
      this.checked = ''
      this.checkedRow = {}
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
    },
    select() {
      if (!this.checked) return
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
      this.visible = false
    },
    rowClick(row) {
      this.checked = row.id
      this.checkedRow = row
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  max-height: 70vh;
  padding: 0 0 10px !important;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .JNPF-common-search-box {
    margin-bottom: 0;
    .JNPF-common-search-box-right {
      padding: 10px 10px 0 0;
    }
  }
}
</style>