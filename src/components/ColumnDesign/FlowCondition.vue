<template>
  <el-dialog
    title="过滤规则配置"
    :visible.sync="dialogVisible"
    width="800px"
    append-to-body
    :before-close="handleClose"
  >
    <Condition
      :value="pconditions"
      ref="base"
      :modelType="modelType"
      :columnDataMap="columnDataMap"
      :dataOptionMap="dataOptionMap"
      :columnOptions="columnOptions"
    ></Condition>
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
    modelType: {
      type: String,
      default: ""
    },
    value: {
      type: Array,
      default: () => []
    },
    columnData: {
      type: Object,
      default: {}
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columnDataMap: {},
      dataOptionMap: {},
      dialogVisible: false,
      pconditions: [],
      columnOptions: []
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
        if (Array.isArray(data)) data.forEach(d => loop(d, parent));
        if (data.__vModel__ && data.__config__.jnpfKey !== "table")
          list.push(data);
      };
      loop(getDrawingList());
      const formItems = list;
      return formItems;
    }
  },
  created() {},
  mounted() {},
  watch: {
    columnData: {
      handler(val) {
        this.columnOptions = val.columnOptions;
        val.columnOptions.map(item => {
          this.columnDataMap[item.__vModel__] = item;
        });
        // 基本下拉数据
        let arr = val.columnOptions.filter(item =>
          ["radio", "checkbox", "select"].includes(item.__config__.jnpfKey)
        );
        arr.forEach(item => {
          let dataLabel = item.__config__.props.label;
          let dataValue = item.__config__.props.value;
          let options = item.__slot__.options.map(i => {
            return {
              ...i,
              dataLabel: dataLabel,
              dataValue: dataValue
            };
          });
          this.dataOptionMap[item.__vModel__] = { options };
        });
        // 树型数据
        let arrTree = val.columnOptions.filter(item =>
          ["cascader", "treeSelect"].includes(item.__config__.jnpfKey)
        );
        arrTree.forEach(item => {
          this.dataOptionMap[item.__vModel__] = {
            options: item.options,
            props: item.props.props
          };
        });
      },
      deep: true
    }
  },
  methods: {
    init(data) {
      this.pconditions = data[0].pconditions;
    },
    confirm() {
      // 获取属性配置
      this.$nextTick(() => {
        this.pconditions = this.$refs.base.getData();
        let valid = true;
        this.pconditions.forEach(k => {
          if (!["null", "notNull"].includes(k.symbol)) {
            if (!k.field) {
              this.$message.warning("条件字段不能为空");
              valid = false;
              return;
            }
            if (!k.symbol) {
              this.$message.warning("条件符号不能为空");
              valid = false;
              return;
            }
            if (!k.fieldValue) {
              this.$message.warning("数据值不能为空");
              valid = false;
              return;
            }
          }
        });
        if (!valid) {
          return;
        }
        let cloneConditions = JSON.parse(JSON.stringify(this.pconditions));
        let data = cloneConditions.map(item => {
          // if(['cascader'].includes(item.jnpfKey)){
          //   item.dataOptions = []
          //   item.options = []
          // }
          return item;
        });
        this.$emit("ruleConfig", {
          pconditions: data
        });

        this.dialogVisible = false;
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    show(data) {
      this.dialogVisible = true;
      if (data.length == 0) {
        this.pconditions = []
        this.addCondition();
      } else {
        this.init(data);
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
        jnpfKey: ""
      };
      this.pconditions.push(item);
    }
  },
  components: {
    Condition
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 15px;
  color: black;
  font-weight: 400;
}
</style>
