<template>
  <el-dialog class="JNPF-dialog JNPF-dialog_center" title="过滤规则配置" :visible.sync="dialogVisible"
    width="800px" append-to-body :before-close="handleClose">
    <Condition :value="pconditions" ref="base" :modelType="modelType" :columnDataMap="columnDataMap"
      :dataOptionMap="dataOptionMap" :columnOptions="columnOptions"></Condition>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup></script>

<script>
import { dyOptionsList } from '@/components/Generator/generator/comConfig'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
import Condition from "./condition";
export default {
  props: {
    modelType: {
      type: [String, Number],
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
      tempCondition: [],
      columnDataMap: {},
      dataOptionMap: {},
      dialogVisible: false,
      pconditions: [],
      columnOptions: []
    };
  },
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
      this.pconditions = data;
      this.buildOptions(data)
      this.tempCondition = JSON.parse(JSON.stringify(this.pconditions));
    },
    buildOptions(componentList) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (config.jnpfKey === 'cascader') cur.props.props.multiple = false
        if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
          let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
          if (config.dataType === 'dictionary') {
            if (!config.dictionaryType) return
            getDictionaryDataSelector(config.dictionaryType).then(res => {
              isTreeSelect ? cur.options = res.data.list : cur.__slot__.options = res.data.list
            })
          }
          if (config.dataType === 'dynamic') {
            if (!config.propsUrl) return
            getDataInterfaceRes(config.propsUrl).then(res => {
              let data = res.data
              if (Array.isArray(data)) {
                isTreeSelect ? cur.options = data : cur.__slot__.options = data
              } else {
                isTreeSelect ? cur.options = [] : cur.__slot__.options = []
              }
            })
          }
        }
      })
      return componentList
    },
    validData() {
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
          if (Array.isArray(k.fieldValue) && k.fieldValue.length == 0) {
            this.$message.warning("数据值不能为空");
            valid = false;
            return;
          }
        }
      });
      return valid;
    },
    confirm() {
      // 获取属性配置
      this.$nextTick(() => {
        this.pconditions = this.$refs.base.getData();

        if (!this.validData()) {
          return;
        }
        // 处理精度
        this.pconditions = this.pconditions.map(item => {
          if (item.jnpfKey === "calculate") {
            item.fieldValue = Number(item.fieldValue).toFixed(2);
          }
          return item;
        });
        let cloneConditions = JSON.parse(JSON.stringify(this.pconditions));
        this.$emit("ruleConfig", cloneConditions);
        this.tempCondition = cloneConditions;

        this.dialogVisible = false;
      });
    },
    handleClose() {
      this.$emit("ruleConfig", this.tempCondition);
      this.dialogVisible = false;
    },
    show(data) {
      this.dialogVisible = true;
      if (data.length == 0) {
        this.pconditions = [];
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
