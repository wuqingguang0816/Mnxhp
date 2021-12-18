<template>
  <div class="popupSelect-container">
    <div class="popupSelect-input" @click="openDialog">
      <el-input :placeholder="placeholder" v-model="innerValue" readonly>
        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clear"
          v-if="clearable"></i>
        <i slot="suffix" class="el-input__icon el-icon-arrow-down"
          :class="{'clearable':clearable}"></i>
      </el-input>
    </div>
    <el-dialog title="选择数据" :close-on-click-modal="false" :visible.sync="visible" v-if="visible"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width='800px'>
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="10">
            <el-form-item label="关键词">
              <el-input v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}
              </el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
        <div class="JNPF-common-search-box-right">
          <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
            <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
              @click="reset()" />
          </el-tooltip>
        </div>
      </el-row>
      <JNPF-table v-loading="listLoading" :data="list" :border="false" highlight-current-row
        @row-click="rowClick" :hasNO="false">
        <el-table-column width="35">
          <template slot-scope="scope">
            <el-radio :label="scope.row[propsValue]" v-model="checked">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column :prop="item.value" :label="item.label" v-for="(item,i) in columnOptions"
          :key="i" />
      </JNPF-table>
      <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
        @pagination="initData" v-if="hasPage" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDataInterfaceDataSelect, getDataInterfaceDataInfo } from '@/api/systemData/dataInterface'
export default {
  name: 'PopupSelect',
  props: {
    value: {
      default: ''
    },
    interfaceId: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    propsValue: {
      type: String,
      default: 'id'
    },
    relationField: {
      type: String,
      default: 'fullName'
    },
    columnOptions: {
      type: Array,
      default: () => []
    },
    hasPage: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 20
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
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
      checkedTxt: '',
      checkedRow: {},
      listLoading: false,
      visible: false
    }
  },
  watch: {
    value(val) {
      this.setDefault()
    }
  },
  computed: {
    propsLabel() {
      return this.columnOptions[0].value
    }
  },
  created() {
    this.listQuery.pageSize = this.hasPage ? this.pageSize : 10000
    // this.reset()
    this.setDefault()
  },
  methods: {
    initData() {
      if (!this.interfaceId) return
      this.listLoading = true
      let query = {
        ...this.listQuery,
        interfaceId: this.interfaceId,
        propsValue: this.propsValue,
        relationField: this.relationField,
      }
      getDataInterfaceDataSelect(this.interfaceId, query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    search() {
      this.initData()
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = this.hasPage ? this.pageSize : 10000
    },
    reset() {
      this.listQuery.keyword = ''
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = this.hasPage ? this.pageSize : 10000
      this.initData()
    },
    openDialog() {
      if (this.disabled) return
      this.checked = this.value
      this.visible = true
      this.reset()
    },
    clear() {
      this.checked = ''
      this.innerValue = ''
      this.checkedRow = {}
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
    },
    select() {
      if (!this.checked) return
      this.innerValue = this.checkedTxt
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
      this.visible = false
    },
    rowClick(row) {
      this.checked = row[this.propsValue]
      this.checkedTxt = row[this.relationField]
      this.checkedRow = row
    },
    setDefault() {
      if (!this.value) return this.innerValue = ''
      let query = {
        id: this.value,
        interfaceId: this.interfaceId,
        propsValue: this.propsValue,
        relationField: this.relationField,
      }
      getDataInterfaceDataInfo(this.interfaceId, query).then(res => {
        this.innerValue = res.data[this.relationField]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  height: 70vh;
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