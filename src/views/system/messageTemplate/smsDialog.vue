<template>
  <div class="popupSelect-container">
    <div class="popupSelect-input" @click="openDialog">
      <el-input placeholder="请选择短信模板" :value="title" readonly>
        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clear"
          v-if="clearable"></i>
        <i slot="suffix" class="el-input__icon el-icon-arrow-down"
          :class="{'clearable':clearable}"></i>
      </el-input>
    </div>
    <el-dialog title="短信模板" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width='600px'>
      <JNPF-table v-loading="listLoading" :data="list" :border="false" highlight-current-row
        @row-click="rowClick" :hasNO="false">
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="checked">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column prop="templateId" label="模板编号" width="200" />
        <el-table-column prop="templateName" label="模板名称" show-overflow-tooltip min-width="150" />
        <el-table-column prop="signContent" label="签名内容" show-overflow-tooltip />
      </JNPF-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSelector } from '@/api/system/smsTemplate'
export default {
  name: 'PopupSelect',
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
        pageSize: 20
      },
      total: 0,
      checked: '',
      checkedRow: {},
      listLoading: false,
      visible: false
    }
  },
  methods: {
    initData() {
      this.listLoading = true
      getSelector().then(res => {
        this.list = res.data.list
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    openDialog() {
      if (this.disabled) return
      this.checked = this.value
      this.visible = true
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