<template>
  <div class="popupSelect-container">
    <div class="el-select" @click="openDialog">
      <el-input placeholder="请选择" readonly :validate-event="false" v-model="title"
        @mouseenter.native="inputHovering = true" @mouseleave.native="inputHovering = false">
        <template slot="suffix">
          <i v-show="!showClose"
            :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"></i>
          <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close"
            @click.stop="clear"></i>
        </template>
      </el-input>
    </div>
    <el-dialog :title="isSubData?'生产用料选择':'工单物料选择'" :close-on-click-modal="false"
      :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select"
      lock-scroll append-to-body width="800px">
      <div class="JNPF-common-layout">
        <div class="JNPF-common-layout-center">
          <el-row class="JNPF-common-search-box" :gutter="16">
            <el-form @submit.native.prevent>
              <el-col :span="8">
                <el-form-item label="关键词">
                  <el-input v-model="keyword" placeholder="请输入关键词查询" clearable
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
            <JNPF-table v-loading="listLoading" :data="list" :border="false" @row-click="rowClick"
              :hasNO="false">
              <el-table-column width="35">
                <template slot-scope="scope">
                  <el-radio :label="scope.row.id" v-model="checked">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="ProductionWorkOrderDetail_materialNo" label="物料编码"
                align="center" />
              <el-table-column v-if="isSubData" prop="ProductionWorkOrderMaterials_materialName"
                label="物料名称" />
              <el-table-column v-else prop="ProductionWorkOrderDetail_materialName" label="物料名称" />
              <el-table-column prop="ProductionWorkOrderMaterials_BomRev" label="bom版本"
                v-if="isSubData" />
              <el-table-column v-if="isSubData" prop="ProductionWorkOrderMaterials_productionUnit"
                label="生产单位" />
              <el-table-column v-else prop="ProductionWorkOrderDetail_productionUnit"
                label="生产单位" />
              <el-table-column v-if="isSubData" prop="ProductionWorkOrderMaterials_model"
                label="型号" />
              <el-table-column v-else prop="ProductionWorkOrderDetail_model" label="型号" />
              <el-table-column v-if="isSubData" prop="ProductionWorkOrderMaterials_spec"
                label="规格" />
              <el-table-column v-else prop="ProductionWorkOrderDetail_spec" label="规格" />
            </JNPF-table>
            <pagination :total="total" :page.sync="listQuery.currentPage"
              :limit.sync="listQuery.pageSize" @pagination="initData" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="select()">{{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMesList } from '@/api/extend/mes'
export default {
  props: {
    value: {
      default: ''
    },
    title: {
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
    isSubData: {
      type: Boolean,
      default: false
    },
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
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      keyword: '',
      total: 0,
      checked: '',
      checkedRow: {},
      listLoading: false,
      defaultProps: {
        id: 'id',
        label: 'fullName'
      },
      query: {
        categoryId: '',
        keyword: '',
      },
      inputHovering: false,
      visible: false,
      tableName: '',
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
  created() {
  },
  methods: {
    initData() {
      this.listLoading = true
      let query = {
        keyword: this.keyword,
        ...this.listQuery,
      }
      const id = this.isSubData ? '359975693624284037' : '359767404550558533'
      getMesList(id, query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    reset() {
      this.keyword = ''
      this.search()
    },
    search() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.listQuery.sort = 'desc'
      this.initData()
    },
    openDialog() {
      if (this.disabled) return
      this.checked = this.value
      this.visible = true
      this.$nextTick(() => {
        this.reset()
      })
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
      this.checked = row.enCode
      this.checkedRow = row
    }
  }
}
</script>