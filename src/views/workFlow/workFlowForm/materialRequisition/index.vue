<template>
  <div class="flow-form" v-loading="loading">
    <div class="com-title">
      <h1>领料单</h1>
      <span class="number">流程编码：{{dataForm.billNo}}</span>
    </div>
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      :disabled="setting.readonly">
      <el-row>
        <el-col :span="12" v-if="JudgeShow('flowTitle')">
          <el-form-item label="流程标题" prop="flowTitle">
            <el-input v-model="dataForm.flowTitle" placeholder="流程标题"
              :disabled="JudgeWrite('flowTitle')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('flowUrgent')">
          <el-form-item label="紧急程度" prop="flowUrgent">
            <el-select v-model="dataForm.flowUrgent" placeholder="选择紧急程度"
              :disabled="JudgeWrite('flowUrgent')">
              <el-option :key="item.value" :label="item.label" :value="item.value"
                v-for="item in flowUrgentOptions" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('leadPeople')">
          <el-form-item label="领料人员" prop="leadPeople">
            <el-input v-model="dataForm.leadPeople" placeholder="入库人"
              :disabled="JudgeWrite('leadPeople')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('leadDepartment')">
          <el-form-item label="领料部门" prop="leadDepartment">
            <el-input v-model="dataForm.leadDepartment" placeholder="领料部门"
              :disabled="JudgeWrite('leadDepartment')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('leadDate')">
          <el-form-item label="领料日期" prop="leadDate">
            <el-date-picker v-model="dataForm.leadDate" type="datetime" placeholder="选择日期"
              value-format="timestamp" format="yyyy-MM-dd HH:mm" :editable='false'
              :disabled="JudgeWrite('leadDate')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="JudgeShow('warehouse')">
          <el-form-item label="仓库" prop="warehouse">
            <el-input v-model="dataForm.warehouse" placeholder="仓库"
              :disabled="JudgeWrite('warehouse')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="JudgeShow('description')">
          <el-form-item label="备注" prop="description">
            <el-input v-model="dataForm.description" placeholder="备注" type="textarea" :rows="3"
              :disabled="JudgeWrite('description')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template v-if="JudgeShow('entryList')">
      <div class="JNPF-common-title">
        <h2>领料明细</h2>
      </div>
      <el-table :data="dataForm.entryList" size='mini'>
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column prop="goodsName" label="商品名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsName" :disabled="JudgeWrite('entryList')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="specifications" label="规格型号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.specifications" :disabled="JudgeWrite('entryList')">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" :disabled="JudgeWrite('entryList')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="materialDemand" label="需数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialDemand" type="number"
              :disabled="JudgeWrite('entryList')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="proportioning" label="配数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.proportioning" @change="count(scope.row)" type="number"
              :disabled="JudgeWrite('entryList')">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" @change="count(scope.row)" type="number"
              :disabled="JudgeWrite('entryList')"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount" readonly :disabled="JudgeWrite('entryList')">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.description" :disabled="JudgeWrite('entryList')">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50" v-if="!setting.readonly && !JudgeWrite('entryList')">
          <template slot-scope="scope">
            <el-button size="mini" type="text" class="JNPF-table-delBtn"
              @click="handleDel(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-actions" @click="addHandle()"
        v-if="!setting.readonly && !JudgeWrite('entryList')">
        <el-button type="text" icon="el-icon-plus" :disabled="setting.readonly">新增</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import comMixin from '../mixin';
export default {
  mixins: [comMixin],
  name: 'MaterialRequisition',
  data() {
    return {
      billEnCode: 'WF_MaterialRequisitionNo',
      dataForm: {
        flowId: '',
        id: '',
        billNo: '',
        flowTitle: '',
        flowUrgent: 1,
        leadPeople: '',
        warehouse: '',
        leadDepartment: '',
        leadDate: '',
        description: '',
        entryList: []
      },
      dataRule: {
        flowTitle: [
          { required: true, message: '流程标题不能为空', trigger: 'blur' },
        ],
        flowUrgent: [
          { required: true, message: '紧急程度不能为空', trigger: 'change' },
        ],
        leadPeople: [
          { required: true, message: '领料人员不能为空', trigger: 'blur' },
        ],
        leadDepartment: [
          { required: true, message: '领料部门不能为空', trigger: 'blur' },
        ],
        leadDate: [
          { required: true, message: '领料日期不能为空', trigger: 'change' },
        ],
      }
    }
  },
  methods: {
    selfInit(data) {
      this.dataForm.flowTitle = this.userInfo.userName + "的领料单"
    },
    addHandle() {
      let item = {
        goodsName: "", specifications: "", unit: "", materialDemand: 1, proportioning: 1, price: 0, amount: 0, description: ""
      }
      this.dataForm.entryList.push(item)
    },
    count(row) {
      //金额 = 数量*单价
      row.amount = this.jnpf.toDecimal(parseFloat(row.price) * parseFloat(row.proportioning))
    },
    handleDel(index) {
      this.dataForm.entryList.splice(index, 1);
    }
  }
}
</script>