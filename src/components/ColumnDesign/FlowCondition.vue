<template>
  <el-dialog
    title="过滤规则配置"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <Condition :value="pconditions" ref="base"></Condition>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup></script>

<script>
import { getDrawingList } from "@/components/Generator/utils/db";
import Condition from "./condition";

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chooseNode: "",
      dialogVisible: false,
      progressOptions: ["10", "20", "30", "40", "50", "60", "70", "80", "90"],
      symbolOptions: [
        {
          label: "大于等于",
          value: ">=",
        },
        {
          label: "大于",
          value: ">",
        },
        {
          label: "等于",
          value: "==",
        },
        {
          label: "小于等于",
          value: "<=",
        },
        {
          label: "小于",
          value: "<",
        },
        {
          label: "不等于",
          value: "<>",
        },
        {
          label: "包含",
          value: "like",
        },
        {
          label: "不包含",
          value: "notLike",
        },
      ],
      logicOptions: [
        {
          label: "并且",
          value: "&&",
        },
        {
          label: "或者",
          value: "||",
        },
      ],
      conditionTypeOptions: [
        {
          label: "字段",
          value: 1,
        },
        // {
        //   label: '公式',
        //   value: 3
        // }
      ],
      conditionTypeOptions1: [
        {
          label: "字段",
          value: 1,
        },
        {
          label: "自定义",
          value: 2,
        },
      ],

      conditionTypeAddtion: [
        {
          label: "当前值",
          value: 3,
        },
      ],

      pconditions: [],
      pconditionsAddtion: [],
    };
  },
  computed: {
    // 未使用的条件个数
    notUseConNum() {
      // 发起人是默认就有得  所以需要加 1
      return this.pconditions.length - this.showingPCons.length + 1;
    },
    usedFormItems() {
      let list = [];
      const loop = (data, parent) => {
        if (!data) return;
        if (
          data.__config__ &&
          data.__config__.jnpfKey !== "table" &&
          data.__config__.children &&
          Array.isArray(data.__config__.children)
        ) {
          loop(data.__config__.children, data);
        }
        if (Array.isArray(data)) data.forEach((d) => loop(d, parent));
        if (data.__vModel__ && data.__config__.jnpfKey !== "table") list.push(data);
      };
      loop(getDrawingList());
      const formItems = list;
      return formItems;
    },
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    init(data) {
      this.pconditions = data[0].pconditions
    },
    confirm() {
      // 获取属性配置
      this.$nextTick(() => {
        this.pconditions = this.$refs.base.getData();
        // 显示信息
        // this.pconditions.forEach((item, index) => {
        //   if (index == this.pconditions.length - 1) {
        //     desc += item.field + item.symbol + item.fieldValue;
        //   } else {
        //     desc += item.field + item.symbol + item.fieldValue + item.logicName;
        //   }
        // });
        // 返回数据库关系对照
        let fieldList = this.$store.state.generator.formItemList
        let keyMap = fieldList.map(item=>{
          let key = item.field
          return {
            [key]:item.columnName
          }
        })
        this.$emit("ruleConfig", {
          pconditions: this.pconditions,
          keyMap
        });

        this.dialogVisible = false
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    show(data) {
      console.log(data);
      this.dialogVisible = true;
      if(data.length==0){
        this.addCondition()
      }else{
        this.init(data)
      }
    },
    addCondition() {
      let item = {
        fieldName: "",
        symbolName: "",
        fieldValue: "",
        fieldType: 1,
        fieldValueType: 2,
        fieldLabel: "",
        logicName: "并且",
        field: "",
        symbol: "",
        logic: "&&",
        jnpfKey: "",
      };
      this.pconditions.push(item);
    },
    fieldNameChange(val, item, i) {
      let obj = this.usedFormItems.filter((o) => o.__vModel__ == val)[0];
      item.fieldName = obj.__config__.label;
      item.jnpfKey = obj.__config__.jnpfKey;
      item = { ...item, ...obj };
      item.fieldValue = undefined;
      item.fieldLabel = "";
      this.$set(this.pconditions, i, item);
    },
    symbolChange(val, item) {
      let obj = this.symbolOptions.filter((o) => o.value == val)[0];
      item.symbolName = obj.label;
    },
    logicChange(val, item) {
      let obj = this.logicOptions.filter((o) => o.value == val)[0];
      item.logicName = obj.label;
    },
    fieldValueTypeChange(item) {
      item.fieldValue = "";
      item.fieldLabel = "";
    },
    fieldTypeChange(item) {
      item.field = "";
      item.fieldName = "";
    },
    fieldValueChange(val, item) {
      let obj = this.usedFormItems.filter((o) => o.__vModel__ == val)[0];
      item.fieldLabel = obj.__config__.label;
    },
    // 条件节点
    onConditionDateChange(val, item) {
      if (!val) return (item.fieldLabel = "");
      let format = item.format || "yyyy-MM-dd HH:mm:ss";
      item.fieldLabel = this.jnpf.toDate(val, format);
    },
    onConditionListChange(data, item) {
      if (!data || !data[1]) return (item.fieldLabel = "");
      let labelList = data[1].map((o) => o.fullName);
      item.fieldLabel = labelList.join("/");
    },
    onConditionObjChange(data, item) {
      if (!data || !data[1]) return (item.fieldLabel = "");
      item.fieldLabel = data[1].fullName || "";
    },
    editFormula(item) {
      this.activeItem = item;
      this.$nextTick(() => {
        this.formulaVisible = true;
      });
    },
    updateFormula(formula) {
      this.activeItem.field = formula;
      this.activeItem.fieldName = formula;
    },
    /**
     * 删除流程条件
     */
    onDelCondition(index) {
      this.pconditions.splice(index, 1);
    },
  },
  components: {
    Condition,
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
