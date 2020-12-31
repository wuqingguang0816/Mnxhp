<template>
  <el-dialog :title="!dataForm.id ? '新建方案' : '编辑方案'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="630px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading">
      <el-form-item prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="请输入方案名称" />
      </el-form-item>
      <el-form-item v-for="(item, index) in condition" :key="index">
        <el-row :gutter="5">
          <el-col :span="7" class="mb-10">
            <el-select v-model="item.logic" placeholder="请选择">
              <el-option v-for="item in logicOptions" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="mb-10">
            <el-button type="primary" icon="el-icon-plus" @click="addItem(index)">添加条件</el-button>
          </el-col>
          <el-col :span="12" class="mb-10" style="text-align:right">
            <el-button type="danger" icon="el-icon-close" @click="delGroup(index)">删除分组</el-button>
          </el-col>
          <el-col :span="24" v-for="(subItem, i) in item.groups" :key="index + i" class="mb-10">
            <el-row :gutter="5">
              <el-col :span="7">
                <el-select v-model="subItem.id" placeholder="选择字段" clearable @change="changeField">
                  <el-option v-for="item in fieldOptions" :key="item.id" :label="item.fullName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="7">
                <el-select v-model="subItem.op" placeholder="选择符号" clearable>
                  <el-option v-for="item in opOptions" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input v-model="subItem.value" :disabled="disabled" placeholder="输入字段值" />
              </el-col>
              <el-col :span="2" style="text-align:right">
                <el-button type="danger" icon="el-icon-close" @click="delItem(index,i)"
                  style="width:100%" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGroup">添加分组</el-button>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t("common.cancelButton")}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{ $t("common.confirmButton")}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  createDataScheme,
  updateDataScheme,
  getDataSchemeInfo,
  getDataAuthorizeList,
} from "@/api/system/dataAuthorize"

export default {
  data() {
    return {
      visible: false,
      disabled: false,
      formLoading: false,
      btnLoading: false,
      logicOptions: [
        {
          value: "and",
          label: "and",
        },
        {
          value: "or",
          label: "or",
        },
      ],
      fieldOptions: [],
      opOptions: [{
        value: 'Equal',
        label: '等于'
      }, {
        value: 'NotEqual',
        label: '不等于'
      }, {
        value: 'GreaterThan',
        label: '大于'
      }, {
        value: 'GreaterThanOrEqual',
        label: '大于等于'
      }, {
        value: 'LessThan',
        label: '小于'
      }, {
        value: 'LessThanOrEqual',
        label: '小于等于'
      }],
      field: "",
      symbol: "",
      filedValue: "",
      logic: "",
      dataForm: {
        id: "",
        moduleId: "",
        fullName: "",
        conditionJson: ""
      },
      condition: [],
      dataRule: {
        fullName: [
          { required: true, message: "方案名称不能为空", trigger: "blur" },
        ]
      }
    }
  },
  methods: {
    init(moduleId, id) {
      this.dataForm.id = id || ""
      this.dataForm.moduleId = moduleId
      this.condition = []
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields()
        // 获取字段数据
        getDataAuthorizeList(this.dataForm.moduleId).then((res) => {
          this.fieldOptions = res.data.list
          if (this.dataForm.id) {
            this.fetchDataSchemeInfo(this.dataForm.id)
          } else {
            this.condition = [{
              logic: "and",
              groups: [{
                id: "",
                field: "",
                type: "",
                op: "",
                value: ""
              }]
            }]
          }
          this.formLoading = false
        })
      })
    },
    fetchDataSchemeInfo(id) {
      getDataSchemeInfo(id).then((res) => {
        this.dataForm = res.data
        if (res.data.conditionJson) this.condition = JSON.parse(res.data.conditionJson)
      })
    },
    changeField(val) {
      this.symbol = ""
      this.filedValue = ""
    },
    addItem(index) {
      this.condition[index].groups.push({
        id: "",
        field: "",
        type: "",
        op: "",
        value: ""
      })
    },
    delItem(index, childIndex) {
      this.condition[index].groups.splice(childIndex, 1)
    },
    delGroup(index) {
      this.condition.splice(index, 1)
    },
    addGroup() {
      this.condition.push({
        logic: "and",
        groups: [{
          id: "",
          field: "",
          type: "",
          op: "",
          value: ""
        }]
      })
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          this.dataForm.conditionJson = JSON.stringify(this.condition)
          const formMethod = this.dataForm.id ? updateDataScheme : createDataScheme;
          formMethod(this.dataForm).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit("refreshDataList")
              },
            });
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>