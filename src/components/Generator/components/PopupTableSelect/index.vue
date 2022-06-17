<template>
  <div>
    <el-popover placement="bottom" width="600" trigger="manual" v-model="visible">
      <template>
        <div class="el-select" slot="reference" @click="showSelect">
          <el-input :placeholder="placeholder" v-model="innerValue" readonly :validate-event="false"
            :disabled="disabled" @mouseenter.native="inputHovering = true"
            @mouseleave.native="inputHovering = false">
            <template slot="suffix">
              <i v-show="!showClose"
                :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"></i>
              <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close"
                @click="clear"></i>
            </template>
          </el-input>
        </div>
      </template>
      <template>
        <el-form @submit.native.prevent :inline="true">
          <el-form-item label="关键词">
            <el-input size="small" v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable
              @keyup.enter.native="search()" />
          </el-form-item>
          <el-form-item>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-button type="primary" size="small" icon="el-icon-search" @click="search()">
                  {{$t('common.search')}}
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button size="small" icon="el-icon-refresh-right" @click="reset()">
                  {{$t('common.reset')}}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <JNPF-table v-loading="listLoading" :data="list" :border="false" highlight-current-row
          @row-click="rowClick" :hasNO="false" height="300">
          <el-table-column width="35" v-if="multiple">
            <template slot-scope="scope">
              <el-checkbox :label="scope.row[propsValue]" @click="choose(scope.row)">&nbsp;
              </el-checkbox>
            </template>
          </el-table-column>
          <el-table-column width="35" v-if="!multiple">
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
        <div class="fr">
          <el-button @click="visible = false" size="small">{{$t('common.cancelButton')}}
          </el-button>
          <el-button type="primary" @click="select()" size="small">{{$t('common.confirmButton')}}
          </el-button>
        </div>
      </template>

    </el-popover>

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
    popupType: {
      type: String,
      default: 'popover'
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
    },
    multiple(val){
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
    this.listQuery.pageSize = this.hasPage ? this.pageSize : 10000
    this.setDefault()
  },
  methods: {
    showSelect(){
      if(this.disabled) return
      this.visible= !this.visible
    },
    choose(row){
      let data = row[propsValue]
      this.value = this.value.includes(data) ? this.value.filter((item)=>{item!=data}) : this.value.push(data)
    },
    handleSelectionChange(val) {
      this.value = val;
    },
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
      this.visible = !this.visible
      this.reset()
    },
    clear(event) {
      this.checked = ''
      this.innerValue = ''
      this.checkedRow = {}
      this.$emit('input', this.checked)
      this.$emit('change', this.checked, this.checkedRow)
      event.stopPropagation();
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
      if (this.value) {
        if (!this.interfaceId) return
        let query = {
          id: this.value,
          interfaceId: this.interfaceId,
          propsValue: this.propsValue,
          relationField: this.relationField,
        }
        getDataInterfaceDataInfo(this.interfaceId, query).then(res => {
          this.innerValue = res.data[this.relationField]
          if (!this.field) return
          let relationData = this.$store.state.generator.relationData
          this.$set(relationData, this.field, res.data)
          this.$store.commit('generator/UPDATE_RELATION_DATA', relationData)
        })
      } else {
        this.innerValue = ''
        if (!this.field) return
        let relationData = this.$store.state.generator.relationData
        this.$set(relationData, this.field, {})
        this.$store.commit('generator/UPDATE_RELATION_DATA', relationData)
      }
    }
  }
}
</script>
<style scoped>
.fr{
  float: right;
}
</style>