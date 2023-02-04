<template>
  <el-dialog
    title="过滤规则配置"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <Condition
      :value="pconditions"
      ref="base"
      :dataOptionMap="dataOptionMap"
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
import handleClipboard from "@/utils/clipboard";
export default {
  props: {
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
      dataOptionMap: {},
      dialogVisible: false,
      pconditions: []
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
        // 基本下拉数据
        let arr = val.defaultColumnList.filter(item =>
          ["radio", "checkbox", "select"].includes(item.jnpfKey)
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
        let arrTree = val.defaultColumnList.filter(item =>
          ["cascader", "treeSelect"].includes(item.jnpfKey)
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
        this.$emit("ruleConfig", {
          pconditions: this.pconditions
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
