<template>

  <section class="condition-pane pd-10">
    <el-row class="condition-list condition-list-header">
      <el-col :span="5" class="label">条件字段</el-col>
      <el-col :span="4">比较</el-col>
      <el-col :span="7" v-if="type=='base'">数据值</el-col>
      <el-col :span="4" v-else>数据值</el-col>
      <el-col :span="4">逻辑</el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <template>
    
      <el-row class="condition-list  mt-10" v-for="(item, index) in pconditions" :key="index">
        <el-col :span="5" class="label">
          <!-- <el-col :span="12">
            <el-select v-model="item.fieldType" placeholder="请选择" class="condition-select condition-type-select"
              @change="fieldTypeChange(item)">
              <el-option v-for="item in conditionTypeOptions" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-col> -->

          <el-col :span="24">
            <el-button size="mini" v-if="item.fieldType === 3" class="edit-script-btn" @click="editFormula(item)">公式编辑
            </el-button>
            <el-select v-model="item.field" placeholder="请选择" @change="fieldNameChange($event, item, index)" v-else>
              <el-option v-for="item in usedFormItems" :key="item.__vModel__" :label="item.__config__.label"
                :value="item.__vModel__">
              </el-option>
            </el-select>
          </el-col>



        </el-col>
        <el-col :span="4">
          <el-select v-model="item.symbol" placeholder="请选择" class="condition-select" v-if="type=='base'"
            @change="symbolChange($event, item)">
            <el-option v-for="item in symbolOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="item.symbol" placeholder="请选择" class="condition-select" v-else
            @change="symbolChange($event, item)">
            <el-option v-for="item in symbolOptionsAddtion" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>


        <el-col :span="7" class="fieldValue" v-if="type=='base'">
          <el-col :span="12">
            <el-select v-model="item.fieldValueType" placeholder="请选择" class="condition-select condition-type-select"
              @change="fieldValueTypeChange(item)">
              <el-option v-for="item in conditionTypeOptions1" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="12">
            <div v-if="item.fieldValueType === 2">
              <template v-if="item.jnpfKey === 'numInput'">
                <el-input-number v-model="item.fieldValue" placeholder="请输入" :precision="item.precision"
                  controls-position="right" />
              </template>
              <template v-else-if="item.jnpfKey === 'calculate'">
                <el-input-number v-model="item.fieldValue" placeholder="请输入" :precision="2" controls-position="right" />
              </template>
              <template v-else-if="['rate', 'slider'].includes(item.jnpfKey)">
                <el-input-number v-model="item.fieldValue" placeholder="请输入" controls-position="right" />
              </template>
              <template v-else-if="item.jnpfKey === 'switch'">
                <el-switch v-model="item.fieldValue" :active-value="1" :inactive-value="0" />
              </template>
              <template v-else-if="item.jnpfKey === 'time'">
                <el-time-picker v-model="item.fieldValue" :picker-options="item['picker-options']" placeholder="请选择"
                  clearable :value-format="item['value-format']" :format="item.format">
                </el-time-picker>
              </template>
              <template v-else-if="['date', 'createTime', 'modifyTime'].includes(item.jnpfKey)">
                <el-date-picker v-model="item.fieldValue" clearable placeholder="请选择"
                  :type="item.jnpfKey === 'date' && item.type ? item.type : 'datetime'" value-format="timestamp"
                  @change="onConditionDateChange($event, item)" :format="item.format || 'yyyy-MM-dd HH:mm:ss'">
                </el-date-picker>
              </template>
              <template v-else-if="['comSelect', 'currOrganize'].includes(item.jnpfKey)">
                <comSelect v-model="item.fieldValue" placeholder="请选择" clearable
                  @change="onConditionListChange(arguments, item)" />
              </template>
              <template v-else-if="['depSelect'].includes(item.jnpfKey)">
                <depSelect v-model="item.fieldValue" placeholder="请选择" clearable
                  @change="onConditionObjChange(arguments, item)" />
              </template>
              <template v-else-if="['userSelect', 'createUser', 'modifyUser'].includes(item.jnpfKey)">
                <userSelect v-model="item.fieldValue" placeholder="请选择" hasSys clearable
                  @change="onConditionObjChange(arguments, item)" />
              </template>
              <template v-else-if="['posSelect', 'currPosition'].includes(item.jnpfKey)">
                <posSelect v-model="item.fieldValue" placeholder="请选择" clearable
                  @change="onConditionObjChange(arguments, item)" />
              </template>
              <template v-else-if="item.jnpfKey === 'address'">
                <JNPFAddress v-model="item.fieldValue" placeholder="请选择" :level="item.level" clearable
                  @change="onConditionListChange(arguments, item)" />
              </template>
              <template v-else-if="item.jnpfKey === 'groupSelect'">
                <groupSelect v-model="item.fieldValue" placeholder="请选择" clearable
                  @change="onConditionObjChange(arguments, item)" />
              </template>
              <template v-else-if="item.jnpfKey === 'roleSelect'">
                <roleSelect v-model="item.fieldValue" placeholder="请选择" clearable
                  @change="onConditionObjChange(arguments, item)" />
              </template>
              <template v-else>
                <el-input v-model="item.fieldValue" placeholder="请输入"></el-input>
              </template>
            </div>
            <el-select v-model="item.fieldValue" placeholder="请选择" v-if="item.fieldValueType === 1"
              @change="fieldValueChange($event, item)">
              <el-option v-for="item in usedFormItems" :key="item.__vModel__" :label="item.__config__.label"
                :value="item.__vModel__">
              </el-option>
            </el-select>
          </el-col>



        </el-col>
        <el-col :span="4" class="fieldValue" v-else>
          <el-col :span="24">

            <el-select v-model="item.fieldValueType" placeholder="请选择" class="condition-select condition-type-select"
              @change="fieldValueTypeChange(item)">
              <el-option v-for="item in conditionTypeAddtion" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-col>




        </el-col>


        <el-col :span="3">
          <el-select v-model="item.logic" placeholder="请选择" class="condition-select"
            @change="logicChange($event, item)">
            <el-option v-for="item in logicOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>


        <el-col :span="1" style="text-align:center;font-size:16px">
          <i class="el-icon-delete" @click="onDelCondition(index)"></i>
        </el-col>
      </el-row>
    </template>
    <div style="padding-left:4px;margin-top:10px;">
      <el-button size="small" icon="el-icon-plus" @click="addCondition()">添加条件</el-button>
    </div>
  </section>

</template>

<script setup>

</script>

<script>
import { getDrawingList } from '@/components/Generator/utils/db'
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'base'
    },
  },
  data() {
    return {
      chooseNode: '',
      dialogVisible: false,
      progressOptions: ['10', '20', '30', '40', '50', '60', '70', '80', '90'],
      symbolOptionsAddtion: [
        {
          label: '大于',
          value: ">"
        },
        {
          label: '小于',
          value: "<"
        },
      ],
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
      logicOptions: [
        {
          label: '并且',
          value: "&&"
        },
        {
          label: '或者',
          value: "||"
        }],
      conditionTypeOptions: [{
        label: '字段',
        value: 1
      },
        // {
        //   label: '公式',
        //   value: 3
        // }
      ],
      conditionTypeOptions1: [{
        label: '字段',
        value: 1
      },
      {
        label: '自定义',
        value: 2
      }],

      conditionTypeAddtion: [{
        label: '当前值',
        value: 3
      },],

      pconditions: [],
    };
  },
  computed: {
    // 未使用的条件个数
    notUseConNum() {
      // 发起人是默认就有得  所以需要加 1
      return this.pconditions.length - this.showingPCons.length + 1;
    },
    usedFormItems() {
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__ && data.__config__.jnpfKey !== 'table') list.push(data)
      }
      loop(getDrawingList())
      const formItems = list
      return formItems
    },
  },
  created() {

  },
  mounted() {

  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.pconditions = val
        }
      },
      immediate: true,
      deep: true
    },
    // options:{
    //   handler(val){
    //     if(val){
    //       this.conditionTypeOptions1 = val
    //     }

    //   },
    //   immediate:true,
    //   deep:true

    // }
  },
  methods: {

    getData() {
      return this.pconditions;
    },
    handleClose() {
      this.dialogVisible = false
    },
    show(data) {
      this.dialogVisible = true
      if (data != null) {
        this.init(data)
      }
    },
    addCondition() {
      let item = {
        fieldName: '',
        symbolName: '',
        fieldValue: '',
        fieldType: 1,
        fieldValueType: this.type == 'base' ? 2 : 3,
        fieldLabel: '',
        logicName: '并且',
        field: '',
        symbol: '',
        logic: '&&',
        jnpfKey: ''
      }
      this.pconditions.push(item)
    },
    fieldNameChange(val, item, i) {
      let obj = this.usedFormItems.filter(o => o.__vModel__ == val)[0]
      item.fieldName = obj.__config__.label
      item.jnpfKey = obj.__config__.jnpfKey
      item = { ...item, ...obj }
      item.fieldValue = undefined
      item.fieldLabel = ''
      this.$set(this.pconditions, i, item)
    },
    symbolChange(val, item) {
      let obj = this.symbolOptions.filter(o => o.value == val)[0]
      item.symbolName = obj.label
    },
    logicChange(val, item) {
      let obj = this.logicOptions.filter(o => o.value == val)[0]
      item.logicName = obj.label
    },
    fieldValueTypeChange(item) {
      item.fieldValue = ''
      item.fieldLabel = ''
    },
    fieldTypeChange(item) {
      item.field = ''
      item.fieldName = ''
    },
    fieldValueChange(val, item) {
      let obj = this.usedFormItems.filter(o => o.__vModel__ == val)[0]
      item.fieldLabel = obj.__config__.label
    },
    // 条件节点
    onConditionDateChange(val, item) {
      if (!val) return item.fieldLabel = ''
      let format = item.format || 'yyyy-MM-dd HH:mm:ss'
      item.fieldLabel = this.jnpf.toDate(val, format)
    },
    onConditionListChange(data, item) {
      if (!data || !data[1]) return item.fieldLabel = ''
      let labelList = data[1].map(o => o.fullName)
      item.fieldLabel = labelList.join('/')
    },
    onConditionObjChange(data, item) {
      if (!data || !data[1]) return item.fieldLabel = ''
      item.fieldLabel = data[1].fullName || ''
    },
    editFormula(item) {
      this.activeItem = item
      this.$nextTick(() => {
        this.formulaVisible = true
      })
    },
    updateFormula(formula) {
      this.activeItem.field = formula
      this.activeItem.fieldName = formula
    },
    /**
     * 删除流程条件
     */
    onDelCondition(index) {
      this.pconditions.splice(index, 1)
    },
  },
  components: {

  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 15px;
  color: black;
  font-weight: 400;
}
</style>
