<template>
  <div class="popupSelect-container">
    <div class="popupSelect-input" @click="openDialog">
      <el-input :placeholder="placeholder" v-model="innerValue" readonly>
        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clear"
          v-if="clearable"></i>
        <i slot="suffix" class="el-input__icon el-icon-edit" :class="{'clearable':clearable}"></i>
      </el-input>
    </div>
    <el-dialog title="选择数据" :close-on-click-modal="false" :visible.sync="visible" v-if="visible"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width='700px'>
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="10">
            <el-form-item label="关键词">
              <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
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
              @click="refresh()" />
          </el-tooltip>
        </div>
      </el-row>
      <JNPF-table v-loading="listLoading" :data="filteredList" :border="false" highlight-current-row
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { previewDataInterface } from '@/api/systemData/dataInterface'
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
    columnOptions: {
      type: Array,
      default: () => []
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
      filteredList: [],
      innerValue: '',
      keyword: '',
      checked: '',
      checkedTxt: '',
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
    this.getData()
  },
  methods: {
    getData() {
      if (!this.interfaceId) return
      this.listLoading = true
      previewDataInterface(this.interfaceId).then(res => {
        this.list = res.data
        this.filteredList = this.list
        this.listLoading = false
        this.setDefault()
      }).catch(() => { this.listLoading = false })
    },
    search() {
      if (!this.keyword) {
        this.filteredList = this.list
        return
      }
      this.filteredList = this.list.filter(o => this.columnOptions.some(option => option.value && o[option.value] && o[option.value].indexOf(this.keyword) > -1))
    },
    reset() {
      this.keyword = ''
      this.filteredList = this.list
    },
    refresh() {
      this.keyword = ''
      this.getData()
    },
    openDialog() {
      if (this.disabled) return
      this.keyword = ''
      this.checked = this.value
      this.visible = true
      if (!this.list.length) {
        this.getData()
      } else {
        this.filteredList = this.list
      }
    },
    clear() {
      this.checked = ''
      this.innerValue = ''
      this.$emit('input', this.checked)
      this.$emit('change', this.checked)
    },
    select() {
      if (!this.checked) return
      this.innerValue = this.checkedTxt
      this.$emit('input', this.checked)
      this.$emit('change', this.checked)
      this.visible = false
    },
    rowClick(row) {
      this.checked = row[this.propsValue]
      this.checkedTxt = row[this.propsLabel]
    },
    setDefault() {
      if (!this.value) return this.innerValue = ''
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i][this.propsValue] === this.value) {
          this.innerValue = this.list[i][this.propsLabel]
          break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popupSelect-container {
  width: 100%;
  .popupSelect-input {
    width: 100%;
    cursor: pointer;
    >>> input {
      cursor: pointer;
    }
    .el-icon-circle-close {
      display: none;
    }
    &:hover {
      .el-icon-circle-close {
        display: block;
      }
      .el-icon-edit.clearable {
        display: none;
      }
    }
  }
}
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