<template>
  <div class="JNPF-common-layout sale-order-main">
    <div class="JNPF-common-layout-center">
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <div>
            <el-button type="primary" @click="handleAdd()">新增</el-button>
            <el-button type="text" @click="handleCopy()">复制</el-button>
            <el-button type="text" @click="handleEdit()">修改</el-button>
            <el-button type="text" @click="handleFile()">附件</el-button>
            <el-dropdown @command="handleCommand">
              <el-button type="text">引入<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">导入</el-dropdown-item>
                <el-dropdown-item command="2">导出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" content="刷新" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="refresh()" />
            </el-tooltip>
          </div>
        </div>
        <div class="condition-box" v-for="(item, index) in conditionList" :key="index">
          <el-row class="condition-list" :key="index" :gutter="20">
            <el-col :span="5">
              <el-select v-model="item.field" placeholder="请选择查询字段" filterable
                @change="onFieldChange($event,item,index)" clearable>
                <el-option v-for="it in fieldOptions" :key="it.key" :label="it.label"
                  :value="it.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="item.symbol" placeholder="请选择">
                <el-option v-for="item in symbolOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <template v-if="item.jnpfKey == 'date'">
                <el-date-picker v-model="item.fieldValue" clearable placeholder="请选择"
                  type="datetime" value-format="timestamp" format="yyyy-MM-dd">
                </el-date-picker>
              </template>
              <template v-else-if="item.jnpfKey == 'userSelect'">
                <userSelect v-model="item.fieldValue" placeholder="请选择" clearable
                  selectType="all" />
              </template>
              <template v-else-if="item.jnpfKey=='comSelect'">
                <comSelect v-model="item.fieldValue" placeholder="请选择" clearable />
              </template>
              <template v-else-if="['select'].includes(item.jnpfKey)">
                <el-select v-model="item.fieldValue" placeholder="请选择" clearable>
                  <el-option :label="oItem.fullName" v-for="(oItem, i) in item.options"
                    :value="oItem.enCode" :key="i"></el-option>
                </el-select>
              </template>
              <template v-else>
                <el-input v-model="item.fieldValue" placeholder="请输入" clearable />
              </template>
            </el-col>
            <el-col :span="2.5">
              <el-button @click="addCondition" icon="el-icon-plus"></el-button>
              <el-button @click="delCondition(index)" icon="el-icon-minus"
                :disabled='conditionList.length<=1'></el-button>
            </el-col>
            <el-col :span="5" v-if="index == 0">
              <el-button type="primary" icon="el-icon-search" @click="superQuery()">查询</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="jnpf-common-search">
          <el-radio-group v-model="selectType" size="mini">
            <el-radio-button label="1">缺省方案</el-radio-button>
            <el-radio-button label="2">本日</el-radio-button>
            <el-radio-button label="3">本周</el-radio-button>
            <el-radio-button label="4">本月</el-radio-button>
          </el-radio-group>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" has-c @selection-change="handleChange"
          highlight-current-row ref="mainTable">
          <el-table-column prop="productionworkordergeneralNo_name" label="编号" width="90" />
          <el-table-column prop="productionworkordergeneralGenerategroup_name" label="生产组织"
            width="90" />
          <el-table-column prop="productionworkordergeneralPlanner_name" label="计划员" width="80" />
          <el-table-column prop="productionworkordergeneralErpproductionorderno_name"
            label="erp生产订单号" width="100" />
          <el-table-column prop="productionworkordergeneralCreatetime_name" label="单据日期"
            width="140" />
          <el-table-column prop="productionworkordergeneralDatastatus_name" label="状态" width="80">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.productionworkordergeneralDatastatus == '已审核'?'success':'danger'">
                {{scope.row.productionworkordergeneralDatastatus||'未审核'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="productionworkordergeneralMaker_name" label="创建人" width="80" />
          <el-table-column prop="productionworkordergeneralCreatetime_name" label="创建时间"
            width="140" />
          <el-table-column prop="productionworkordergeneralUpdater_name" label="修改人" width="80" />
          <el-table-column prop="productionworkordergeneralUpdatetime_name" label="修改时间"
            width="140" />
          <el-table-column prop="productionworkordergeneralAuditer_name" label="审核人" width="80" />
          <el-table-column prop="productionworkordergeneralAudittime_name" label="审核时间"
            width="140" />
          <el-table-column prop="productionworkordergeneralMesordersource_name" label="MES工单来源"
            width="100" />
          <el-table-column prop="productionworkordergeneral" label="物料编码" />
          <el-table-column prop="productionworkordergeneral" label="物料名称" width="120" />
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-if="formVisible" ref="form" @close="closeForm" />
  </div>
</template>

<script>
import { getList, getDictionaryData } from '@/api/extend/mes'
import Form from "./Form"
export default {
  name: 'extend-mesList',
  components: { Form },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      showAll: false,
      query: {
        keyword: '',
        code: '',
        customerName: '',
      },
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      formVisible: false,
      multipleSelection: [],
      selectType: 1,
      fieldOptions: [],
      conditionList: [{
        field: '',
        fieldValue: '',
        symbol: '==',
        jnpfKey: '',
        attr: {}
      }],
      symbolOptions: [
        {
          label: '大于等于',
          value: ">="
        },
        {
          label: '大于',
          value: ">"
        },
        {
          label: '等于',
          value: "=="
        },
        {
          label: '小于等于',
          value: "<="
        },
        {
          label: '小于',
          value: "<"
        },
        {
          label: '不等于',
          value: "<>"
        },
        {
          label: '包含',
          value: "like"
        },
        {
          label: '不包含',
          value: "notLike"
        }],
    }
  },
  created() {
    this.initData()
    this.init()
  },
  watch: {
    selectType(val) {
      this.initData()
    }
  },
  methods: {
    init() {
      this.fieldOptions = [
        { label: '单据编码', key: 'billCode', jnpfKey: "comInput" },
        { label: '生产组织', key: 'com', jnpfKey: "comSelect" },
        { label: '计划员', key: 'planer', jnpfKey: "userSelect" },
        { label: 'ERP生产订单号', key: 'erp', jnpfKey: "comInput" },
        { label: '单据日期', key: 'billDate', jnpfKey: "date" },
        { label: '单据状态', key: 'billState', jnpfKey: "select", dictionaryType: "359689229577491205", dataType: "dictionary" },
        { label: '创建人', key: 'creator', jnpfKey: "userSelect" },
        { label: '修改人', key: 'updater', jnpfKey: "userSelect" },
        { label: '审核人', key: 'auditor', jnpfKey: "userSelect" },
        { label: '创建时间', key: 'createDate', jnpfKey: "date" },
        { label: '修改时间', key: 'updateDate', jnpfKey: "date" },
        { label: '审核时间', key: 'auditDate', jnpfKey: "date" },
        { label: 'MES工单来源', key: 'source', jnpfKey: "select", dictionaryType: "359689716116755205", dataType: "dictionary" },
      ]

      for (let i = 0; i < this.fieldOptions.length; i++) {
        const item = this.fieldOptions[i]
        if (item.dataType == 'dictionary' && item.dictionaryType) {
          getDictionaryData(item.dictionaryType).then(res => {
            item.options = res.data.list
          })
        }
      }
    },
    exist() {
      let isOk = true
      for (let i = 0; i < this.conditionList.length; i++) {
        const e = this.conditionList[i];
        if (!e.field) {
          this.$message({
            message: `请选择查询字段`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
        let flag = false
        if (this.getDataType(e.jnpfKey) === 'array') {
          flag = this.jnpf.isEmptyArray(e.fieldValue)
        } else {
          flag = this.jnpf.isEmpty(e.fieldValue)
        }
        if (flag) {
          this.$message({
            message: `空条件不能查询`,
            type: 'error',
            duration: 1000
          });
          isOk = false
          break
        }
      }
      return isOk
    },
    getDataType(jnpfKey) {
      if (!jnpfKey) return ''
      if (['numInput', 'date', 'rate', 'slider'].includes(jnpfKey)) {
        return 'number'
      } else if (['uploadFz', 'uploadImg', 'cascader', 'comSelect', 'address'].includes(jnpfKey)) {
        return 'array'
      }
      return ''
    },
    superQuery() {
      if (!this.exist('query')) return
      let query = {
        matchLogic: 'and',
        conditionJson: JSON.stringify(this.conditionList)
      }
      query = JSON.stringify(query)
      if (!this.conditionList.length) query = ""
      this.search(query)
    },
    search(query) {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: '',
        superQueryJson: query
      }
      this.childrenList = []
      this.initData()
    },
    initData() {
      this.listLoading = true
      const query = {
        ...this.listQuery,
        ...this.query
      }
      getList(query).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleChange(val) {
      this.multipleSelection = val
    },
    handleEdit() {
      if (this.multipleSelection.length != 1) {
        this.$message.error('请只选择一条数据')
        return
      }
      const id = this.multipleSelection[0].id
      this.handleAdd(id)
    },
    handleAdd(id) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.form.init(id)
      })
    },
    handleCopy() {
      if (this.multipleSelection.length != 1) {
        this.$message.error('请只选择一条数据')
        return
      }
      this.$message.error('复制')
    },
    handleFile() {
      if (this.multipleSelection.length != 1) {
        this.$message.error('请只选择一条数据')
        return
      }
      this.$message.error('附件')
    },
    handleCommand(index) {
      if (index == 1) this.$message.error('导入')
      if (index == 2) this.$message.error('导出')
    },
    closeForm(isRefresh) {
      this.formVisible = false
      if (isRefresh) this.refresh()
    },
    reset() {
      this.query = {
        keyword: '',
        code: '',
        customerName: '',
      }
      this.search()
    },
    refresh() {
      this.initData()
    },
    onFieldChange(val, item, i) {
      item.cellKey = +new Date()
      if (!val) {
        item.jnpfKey = ''
        item.fieldValue = undefined
        return
      }
      let obj = this.fieldOptions.filter(o => o.key == val)[0]
      item.jnpfKey = obj.jnpfKey
      item.dataType = obj.dataType
      item.options = obj.options
      item.fieldValue = undefined
      this.$set(this.conditionList, i, item)
    },
    addCondition() {
      let item = {
        field: '',
        fieldValue: '',
        symbol: '==',
        jnpfKey: '',
        cellKey: +new Date(),
        attr: {}
      }
      this.conditionList.push(item)
    },
    delCondition(index) {
      this.conditionList.splice(index, 1)
    },
  }
}
</script>
<style lang="scss" scoped>
.sale-order-main {
  .JNPF-common-head {
    margin-left: 8px;
  }
  .jnpf-common-search {
    margin: 0 15px 14px;
  }
  .condition-box {
    margin: 0 15px 15px;

    >>> .el-select,
    .el-date-editor {
      width: 100% !important;
    }
  }
  .sale-order-footer {
    margin-top: 10px;
    height: 300px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .ml-10 {
      margin-left: 10px;
    }
  }
}
</style>