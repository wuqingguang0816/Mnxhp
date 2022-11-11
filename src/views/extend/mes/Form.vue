<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main mes-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="dataForm.id?'编辑':'新建'" />
        <div class="options">
          <el-button type="primary" @click="submit" :loading="btnLoading">确 定</el-button>
          <el-button @click="goBack()">取 消</el-button>
        </div>
      </div>
      <div class="main" v-loading="loading">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="0">
              <el-col :span="8">
                <el-form-item label="单据编码" prop="code">
                  <el-input v-model="dataForm.productionworkordergeneralNo" placeholder="单据编码">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="生产组织" prop="code">
                  <comSelect v-model="dataForm.productionworkordergeneralGenerategroup"
                    placeholder="请选择" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计划员" prop="code">
                  <userSelect v-model="dataForm.productionworkordergeneralPlanner"
                    placeholder="请选择计划员" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="ERP生产订单号" prop="code">
                  <el-input v-model="dataForm.productionworkordergeneralErpproductionorderno"
                    placeholder="ERP生成订单号">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单据日期" prop="code">
                  <el-date-picker v-model="dataForm.productionworkordergeneralDocdate"
                    type="datetime" format="yyyy-MM-dd" value-format="timestamp" placeholder="单据日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单据状态" prop="code">
                  <el-select v-model="dataForm.ProductionWorkOrderGeneralDataStatus"
                    placeholder="请选择">
                    <el-option v-for="item in billStateList" :key="item.id" :label="item.fullName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="系统信息" name="1">
              <el-col :span="8">
                <el-form-item label="创建人" prop="code">
                  <jnpfOpenData v-model="dataForm.productionworkordergeneralMaker" type="currUser">
                  </jnpfOpenData>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改人" prop="code">
                  <jnpfOpenData v-model="dataForm.productionworkordergeneralUpdater"
                    type="currUser">
                  </jnpfOpenData>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核人" prop="code">
                  <jnpfOpenData v-model="dataForm.productionworkordergeneralAuditer"
                    type="currUser">
                  </jnpfOpenData>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间" prop="code">
                  <jnpfOpenData v-model="dataForm.productionworkordergeneralCreatetime"
                    type="currTime">
                  </jnpfOpenData>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间" prop="code">
                  <jnpfOpenData v-model="dataForm.productionworkordergeneralUpdatetime"
                    type="currTime">
                  </jnpfOpenData>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核时间" prop="code">
                  <jnpfOpenData v-model="dataForm.productionworkordergeneralAudittime"
                    type="currTime">
                  </jnpfOpenData>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="MES工单来源" prop="code">
                  <el-select v-model="dataForm.productionworkordergeneralMesordersource"
                    placeholder="请选择">
                    <el-option v-for="item in sourceList" :key="item.id" :label="item.fullName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-tab-pane>
          </el-tabs>
          <el-tabs v-model="subActiveName">
            <el-tab-pane label="明细信息" name="0">
              <el-button type="text" @click="handleBtn(1)">新增行</el-button>
              <el-button type="text" @click="handleBtn(2)">插入行</el-button>
              <el-button type="text" @click="handleBtn(3)" :disabled="disabledCopy">复制行
              </el-button>
              <el-button type="text" @click="handleBtn(4)" :disabled="deleteCopy">删除行
              </el-button>
              <JNPF-table v-loading="listLoading" :data="dataForm.mesworkorderdetailedList" has-c
                @selection-change="handleChange" height="400px" ref="detailTable">
                <el-table-column label="物料编号" width="140">
                  <template slot-scope="scope">
                    <TableForm v-model="scope.row.productionworkorderdetailMaterialno"
                      :title="scope.row.productionworkorderdetailMaterialname"
                      @change="onTableFormChange(arguments,scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="物料名称" width="110">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkorderdetailMaterialname"
                      placeholder="物料名称" readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="生产数量" width="130">
                  <template slot-scope="scope">
                    <el-input-number controls-position="right" :min="0"
                      v-model="scope.row.ProductionWorkOrderDetail_productionQuantity"
                      placeholder="生产数量">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="生产单位" width="80">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ProductionWorkOrderDetail_productionUnit"
                      placeholder="生产单位" readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="生产部门" width="120">
                  <template slot-scope="scope">
                    <depSelect v-model="scope.row.productionworkorderdetailProductiondepartment"
                      placeholder="请选择" clearable />
                  </template>
                </el-table-column>
                <el-table-column label="型号" width="80">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ProductionWorkOrderDetail_model" placeholder="型号"
                      readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="规格" width="80">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.ProductionWorkOrderDetail_spec" placeholder="规格"
                      readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="备注" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkorderdetailRemark" placeholder="备注">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="bom版本" width="110">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.productionworkorderdetailBomrev"
                      placeholder="请选择">
                      <el-option v-for="item in bomList" :key="item.id" :label="item.fullName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="工艺路线" width="110">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.productionworkorderdetailProcessroutename"
                      placeholder="请选择">
                      <el-option v-for="item in craftList" :key="item.id" :label="item.fullName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="销售订单" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkorderdetailOrder" placeholder="销售订单">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="客户名称" width="140">
                  <template slot-scope="scope">
                    <userSelect v-model="scope.row.productionworkorderdetailCusname"
                      placeholder="请选择" clearable
                      @change="onUserSelectChange(arguments,scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="计划开工时间" width="155">
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.productionworkorderdetailPlanstarttime"
                      type="datetime" format="yyyy-MM-dd" value-format="timestamp"
                      placeholder="计划开工时间">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="计划完工时间" width="155">
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.productionworkorderdetailPlanendtime"
                      type="datetime" format="yyyy-MM-dd" value-format="timestamp"
                      placeholder="计划完工时间">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="交付日期" width="155">
                  <template slot-scope="scope">
                    <el-date-picker v-model="scope.row.productionworkorderdetailDeleiverytime"
                      type="datetime" format="yyyy-MM-dd" value-format="timestamp"
                      placeholder="交付日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column label="mes工单状态" width="150">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.productionworkorderdetailActstatus"
                      placeholder="请选择">
                      <el-option v-for="item in mesStateList" :key="item.id" :label="item.fullName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </JNPF-table>
            </el-tab-pane>
            <el-tab-pane label="执行信息" name="1">
              <el-col :span="8">
                <el-form-item label="子件工单数量" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationDorderquantity"
                    placeholder="子件工单数量" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合格入库选单数" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationDunqualifiedchooseinquantity"
                    placeholder="合格入库选单数" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="退库数量" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationRetaertquantity"
                    placeholder="退库数量" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合格品入库数量" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationDqualifiedinquantity"
                    placeholder="合格品入库数量" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="未入库数量" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationDuninquantity"
                    placeholder="未入库数量" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="计划确认时间" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationPlanconfirmtime"
                    placeholder="计划确认时间" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下达时间" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationIssuetime"
                    placeholder="下达时间" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开工时间" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationStarttime"
                    placeholder="开工时间" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="完工时间" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationEndtime"
                    placeholder="完工时间" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结案时间" prop="code">
                  <el-input
                    v-model="dataForm.mesworkorderinformationList[0].productionexecutiveinformationFinishtime	"
                    placeholder="结案时间" readonly>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="生产用料清单" name="2">
              <el-button type="text" @click="handleSubBtn(1)" :disabled="!rowNo">新增行</el-button>
              <el-button type="text" @click="handleSubBtn(2)" :disabled="disabledSubCopy">
                复制行
              </el-button>
              <el-button type="text" @click="handleSubBtn(3)" :disabled="deleteSubCopy">删除行
              </el-button>
              <JNPF-table v-loading="listLoading"
                :data="dataForm.mesworkorderdetailedList.length&&dataForm.mesworkorderdetailedList[rowIndex].mesworkordermaterialdetailedList?dataForm.mesworkorderdetailedList[rowIndex].mesworkordermaterialdetailedList:[]"
                has-c @selection-change="handleSubChange" highlight-current-row ref="mainTable">
                <el-table-column label="子物料编码" width="90">
                  <template slot-scope="scope">
                    <TableForm :isSubData="true"
                      v-model="scope.row.productionworkorderdetailMaterialno"
                      :title="scope.row.productionworkordermaterialsMaterialname"
                      @change="onSubTableFormChange(arguments,scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="子物料名称" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsMaterialname"
                      placeholder="子物料名称" readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="bom版本" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsBomrev"
                      placeholder="bom版本" readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="型号" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsModel" placeholder="型号"
                      readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="规格" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsSpec" placeholder="规格"
                      readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsProductionunit"
                      placeholder="单位" readonly>
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="分子" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsMolecule"
                      placeholder="分子">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="分母" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsDenominator"
                      placeholder="分母">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="固定损耗" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsInvariableloss"
                      placeholder="固定损耗">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="变动损耗率%" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsLossrate"
                      placeholder="变动损耗率">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="需求数量" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsQuantityrequired"
                      placeholder="需求数量">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="发料方式" width="90">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productionworkordermaterialsMaterialmethod"
                      placeholder="发料方式">
                    </el-input>
                  </template>
                </el-table-column>
              </JNPF-table>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </div>

  </transition>
</template>

<script>
import { createMes, detail, editMes, getDictionaryData, getMateria } from '@/api/extend/mes'
import TableForm from "./TableForm"
export default {
  components: { TableForm },
  data() {
    return {
      loading: false,
      dataForm: {
        id: "",
        mesworkorderdetailedList: [],
        mesworkorderinformationList: [
          {}
        ],
      },
      dataRule: {},
      activeName: 0,
      subActiveName: 0,
      listLoading: false,
      btnLoading: false,
      disabledCopy: true,
      deleteCopy: true,
      disabledSubCopy: true,
      deleteSubCopy: true,
      multipleSelection: [],
      multipleSubSelection: [],
      bomList: [],
      craftList: [],
      mesStateList: [],
      billStateList: [],
      sourceList: [],
      visible: false,
      rowNo: "",
      rowIndex: 0
    }
  },
  created() {
    this.init()
    this.getAttrList()
  },
  watch: {
    multipleSelection(val) {
      this.disabledCopy = true
      this.deleteCopy = true
      if (val.length) this.deleteCopy = false
      if (val.length == 1) this.disabledCopy = false
    },
    multipleSubSelection(val) {
      this.disabledSubCopy = true
      this.deleteSubCopy = true
      if (val.length) this.deleteSubCopy = false
      if (val.length == 1) this.disabledSubCopy = false
    },
    subActiveName(val) {
      if (val == 2 && this.multipleSelection.length) {
        this.rowNo = this.multipleSelection[0].productionworkorderdetailMaterialno
        if (!this.rowNo) return
        for (let i = 0; i < this.dataForm.mesworkorderdetailedList.length; i++) {
          const element = this.dataForm.mesworkorderdetailedList[i];
          if (element.id == this.multipleSelection[0].id) {
            this.rowIndex = i
          }
        }
        this.getMateria()
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || ''
      if (this.dataForm.id) {
        this.getDetail()
      }
    },
    getDetail() {
      detail(this.dataForm.id).then(res => {
        this.dataForm = res.data
        for (let i = 0; i < this.dataForm.mesworkorderdetailedList.length; i++) {
          const element = this.dataForm.mesworkorderdetailedList[i];
          element.mesworkordermaterialdetailedList = []
        }
        this.setDefaultRow()
      })
    },
    getAttrList() {
      getDictionaryData('359689845515227909').then(res => {
        this.bomList = res.data.list
      })
      getDictionaryData('359689900586439429').then(res => {
        this.craftList = res.data.list
      })
      getDictionaryData('359689315342619397').then(res => {
        this.mesStateList = res.data.list
      })
      getDictionaryData('359689229577491205').then(res => {
        this.billStateList = res.data.list
      })
      getDictionaryData('359689716116755205').then(res => {
        this.sourceList = res.data.list
      })
    },
    getMateria() {
      getMateria(this.rowNo).then(res => {
        const list = this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList || []
        this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList = [...list, ...res.data]
      })
    },
    handleChange(val) {
      this.multipleSelection = val
    },
    handleBtn(index) {
      if (index == 1) this.handleBtnAdd()
      if (index == 2) this.handleBtnAdd()
      if (index == 3) this.handleBtnCopy()
      if (index == 4) this.handleBtnDel()
    },
    handleBtnAdd() {
      this.dataForm.mesworkorderdetailedList.push({
        id: this.jnpf.idGenerator()
      })
      this.setDefaultRow()

    },
    setDefaultRow() {
      this.$nextTick(() => {
        if (this.dataForm.mesworkorderdetailedList.length >= 1 && !this.multipleSelection.length) {
          const row = this.dataForm.mesworkorderdetailedList[0]
          this.$refs.detailTable.$refs.JNPFTable.toggleRowSelection(row);
        }
      })
    },
    handleBtnCopy() {
      let row = JSON.parse(JSON.stringify(this.multipleSelection[0]))
      row.id = this.jnpf.idGenerator()
      this.dataForm.mesworkorderdetailedList.push(row)
    },
    handleBtnDel() {
      this.$confirm('删除后不能撤销，确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const item = this.multipleSelection[i]
          for (let j = 0; j < this.dataForm.mesworkorderdetailedList.length; j++) {
            const ele = this.dataForm.mesworkorderdetailedList[j]
            if (item.id == ele.id) this.dataForm.mesworkorderdetailedList.splice(j, 1)
          }
        }
        this.setDefaultRow()
      }).catch(() => { });
    },
    onTableFormChange(e, index) {
      const [id, item] = e
      const ele = this.dataForm.mesworkorderdetailedList[index]
      if (!id) {
        ele.productionworkorderdetailMaterialno = ''
        ele.productionworkorderdetailMaterialname = ''
        ele.ProductionWorkOrderDetail_productionUnit = ''
        ele.ProductionWorkOrderDetail_model = ''
        ele.ProductionWorkOrderDetail_spec = ''
        return
      }
      if (ele.id === id) return
      ele.productionworkorderdetailMaterialno = item.ProductionWorkOrderDetail_materialNo
      ele.productionworkorderdetailMaterialname = item.ProductionWorkOrderDetail_materialName
      ele.ProductionWorkOrderDetail_productionUnit = item.ProductionWorkOrderDetail_productionUnit
      ele.ProductionWorkOrderDetail_model = item.ProductionWorkOrderDetail_model
      ele.ProductionWorkOrderDetail_spec = item.ProductionWorkOrderDetail_spec
    },
    onUserSelectChange(e, index) {
      const [id, item] = e
      const ele = this.dataForm.mesworkorderdetailedList[index]
      if (!id) {
        ele.productionworkorderdetailCusname = ''
        return
      }
      if (ele.id === id) return
      ele.productionworkorderdetailCusname = id
    },

    onSubTableFormChange(e, index) {
      let [id, item] = e
      id = item.ProductionWorkOrderMaterials_materialNo
      const ele = this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList[index]
      if (!id) {
        ele.productionworkordermaterialsMaterialno = ''
        ele.productionworkordermaterialsMaterialname = ''
        ele.productionworkordermaterialsBomrev = ''
        ele.productionworkordermaterialsProductionunit = ''
        ele.productionworkordermaterialsModel = ''
        ele.productionworkordermaterialsSpec = ''
        return
      }
      if (ele.id === id) return
      ele.productionworkordermaterialsMaterialno = item.ProductionWorkOrderMaterials_materialNo
      ele.productionworkordermaterialsMaterialname = item.ProductionWorkOrderMaterials_materialName
      ele.productionworkordermaterialsBomrev = item.ProductionWorkOrderMaterials_BomRev
      ele.productionworkordermaterialsProductionunit = item.ProductionWorkOrderMaterials_productionUnit
      ele.productionworkordermaterialsModel = item.ProductionWorkOrderMaterials_model
      ele.productionworkordermaterialsSpec = item.ProductionWorkOrderMaterials_spec
    },
    handleSubChange(val) {
      this.multipleSubSelection = val
    },
    handleSubBtn(index) {
      if (index == 1) this.handleSubBtnAdd()
      if (index == 2) this.handleSubBtnCopy()
      if (index == 3) this.handleSubBtnDel()
    },
    handleSubBtnAdd() {
      this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList.push({
        id: this.jnpf.idGenerator(),
        productionworkorderdetailMaterialno: this.rowNo
      })
      this.$forceUpdate()
    },
    handleSubBtnCopy() {
      let row = JSON.parse(JSON.stringify(this.multipleSubSelection[0]))
      row.id = this.jnpf.idGenerator()
      this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList.push(row)
      this.$forceUpdate()
    },
    handleSubBtnDel() {
      this.$confirm('删除后不能撤销，确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.multipleSubSelection.length; i++) {
          const item = this.multipleSubSelection[i]
          for (let j = 0; j < this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList.length; j++) {
            const ele = this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList[j]
            if (item.id == ele.id) {
              this.dataForm.mesworkorderdetailedList[this.rowIndex].mesworkordermaterialdetailedList.splice(j, 1)
            }
          }
        }
      }).catch(() => { });
    },
    submit() {
      let mesworkordermaterialdetailedList = []
      if (this.dataForm.mesworkorderdetailedList.length) {
        for (let index = 0; index < this.dataForm.mesworkorderdetailedList.length; index++) {
          const element = this.dataForm.mesworkorderdetailedList[index];
          if (element.mesworkordermaterialdetailedList && element.mesworkordermaterialdetailedList.length) {
            mesworkordermaterialdetailedList = [...mesworkordermaterialdetailedList, ...element.mesworkordermaterialdetailedList]
          }

        }
      }
      this.dataForm.mesworkordermaterialdetailedList = mesworkordermaterialdetailedList
      const formMethod = this.dataForm.id ? editMes : createMes
      formMethod(this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
            this.btnLoading = false
            this.$emit('close', true)
          }
        })
      })
    },
    goBack() {
      this.$emit('close')
    },
  }
}
</script>
<style lang="scss" scoped>
>>> .el-select,
.el-input,
.el-date-editor {
  width: 100% !important;
}

>>> .el-input-number {
  width: 120px;
}
</style>