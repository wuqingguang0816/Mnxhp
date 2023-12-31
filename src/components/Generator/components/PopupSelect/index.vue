<template>
  <div class="popupSelect-container">
    <div class="el-select" @click="openDialog">
      <el-input :placeholder="placeholder" v-model="innerValue" readonly :validate-event="false"
        @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false">
        <template slot="suffix">
          <i v-show="!showClose"
            :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"></i>
          <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close"
            @click="clear"></i>
        </template>
      </el-input>
    </div>
    <template v-if="popupType==='dialog'">
      <el-dialog :title="popupTitle" :close-on-click-modal="false" :visible.sync="visible"
        v-if="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body
        :width='popupWidth'>
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
                @click="initData()" />
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
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" v-if="hasPage" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}</el-button>
          <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
          </el-button>
        </span>
      </el-dialog>
    </template>
    <template v-if="popupType ==='drawer'">
      <el-drawer :title="popupTitle" :visible.sync="visible" :wrapperClosable="false" ref="drawer"
        :size='popupWidth' append-to-body class="JNPF-common-drawer">
        <div class="JNPF-flex-main">
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
                  @click="initData()" />
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
            <el-table-column :prop="item.value" :label="item.label"
              v-for="(item,i) in columnOptions" :key="i" />
          </JNPF-table>
          <pagination :total="total" :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize" @pagination="initData" v-if="hasPage" />
          <div class="drawer-footer">
            <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}
            </el-button>
            <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
            </el-button>
          </div>
        </div>
      </el-drawer>
    </template>
  </div>
</template>

<script>
import { getDataInterfaceDataSelect, getDataInterfaceDataInfoByIds } from '@/api/systemData/dataInterface'
import emitter from 'element-ui/src/mixins/emitter'
let { methods: { dispatch } } = emitter
export default {
  name: 'PopupSelect',
  props: {
    value: {
      default: ''
    },
    rowIndex: {
      default: null
    },
    formData: {
      type: Object
    },
    templateJson: {
      type: Array,
      default: () => []
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
    popupType: {
      type: String,
      default: 'dialog'
    },
    popupTitle: {
      type: String,
      default: '选择数据'
    },
    popupWidth: {
      type: String,
      default: '800px'
    },
    field: {
      type: String,
      default: ''
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
    multiple: {
      type: Boolean,
      default: false
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
      visible: false,
      inputHovering: false,
    }
  },
  watch: {
    value(val) {
      this.setDefault()
    }
  },
  computed: {
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable &&
        !this.disabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },
    propsLabel() {
      return this.columnOptions[0].value
    }
  },
  created() {
    this.listQuery.pageSize = this.hasPage ? this.pageSize : 100000
    this.setDefault()
  },
  methods: {
    initData() {
      if (!this.interfaceId) return
      this.listLoading = true
      const paramList = this.getParamList()
      const columnOptions = this.columnOptions.map(o => o.value)
      let query = {
        ...this.listQuery,
        interfaceId: this.interfaceId,
        propsValue: this.propsValue,
        relationField: this.relationField,
        columnOptions: columnOptions.join(','),
        paramList
      }
      getDataInterfaceDataSelect(this.interfaceId, query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    getParamList() {
      let templateJson = this.templateJson
      if (!this.formData) return templateJson
      for (let i = 0; i < templateJson.length; i++) {
        if (templateJson[i].relationField) {
          if (templateJson[i].relationField.includes('-')) {
            let tableVModel = templateJson[i].relationField.split('-')[0]
            let childVModel = templateJson[i].relationField.split('-')[1]
            templateJson[i].defaultValue = this.formData[tableVModel] && this.formData[tableVModel][this.rowIndex] && this.formData[tableVModel][this.rowIndex][childVModel] || ''
          } else {
            templateJson[i].defaultValue = this.formData[templateJson[i].relationField] || ''
          }
        }
      }
      return templateJson
    },
    interfaceDataHandler(data) {
      if (!data.dataProcessing) return data.list
      const dataHandler = this.jnpf.getScriptFunc.call(this, data.dataProcessing)
      if (!dataHandler) return data.list
      return dataHandler(data.list)
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
    clear(event) {
      this.checked = ''
      this.innerValue = ''
      this.checkedRow = {}
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
      dispatch.call(this, 'ElFormItem', 'el.form.change', this.checked)
      event.stopPropagation();
    },
    select() {
      if (!this.checked) return
      this.innerValue = this.checkedTxt
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
      dispatch.call(this, 'ElFormItem', 'el.form.change', this.checked)
      this.visible = false
    },
    rowClick(row) {
      this.checked = row[this.propsValue]
      this.checkedTxt = row[this.relationField]
      this.checkedRow = row
    },
    setDefault() {
      if (this.value) {
        if (!this.interfaceId) return
        const paramList = this.getParamList()
        let query = {
          ids: [this.value],
          interfaceId: this.interfaceId,
          propsValue: this.propsValue,
          relationField: this.relationField,
          paramList
        }
        getDataInterfaceDataInfoByIds(this.interfaceId, query).then(res => {
          const data = res.data && res.data.length ? res.data[0] : {}
          this.innerValue = data[this.relationField]
          if (!this.field) return
          let relationData = this.$store.state.generator.relationData
          this.$set(relationData, this.field, data)
          this.$eventBus.$emit('popupAttrEventBus', relationData, this.field)
          this.$store.commit('generator/UPDATE_RELATION_DATA', relationData)
        })
      } else {
        this.innerValue = ''
        if (!this.field) return
        let relationData = this.$store.state.generator.relationData
        this.$set(relationData, this.field, {})
        this.$eventBus.$emit('popupAttrEventBus', relationData, this.field)
        this.$store.commit('generator/UPDATE_RELATION_DATA', relationData)
      }
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