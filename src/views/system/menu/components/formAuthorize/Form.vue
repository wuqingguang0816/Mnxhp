<template>
  <el-dialog :title="!dataForm.id ? '新建字段' : '编辑字段'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      v-loading="formLoading" class="menuForm">
      <el-form-item label="字段名称" prop="enCode">
        <nameSelects :value="dataForm.enCode" :moduleId='dataForm.moduleId' :title="dataForm.enCode"
          :dataType="dataForm.dataType" :bindTable="dataForm.bindTable" :menuType="menuType"
          :treeData="treeData" @change="changeName" />
      </el-form-item>
      <el-form-item label="字段规则" prop="fieldRule">
        <el-select v-model="dataForm.fieldRule" placeholder="请选择字段名称" clearable>
          <el-option v-for="item in fieldRuleOptions" :key="item.value" :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段说明" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入字段说明" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="999999" v-model="dataForm.sortCode"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="dataForm.description" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{ $t("common.confirmButton") }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  createForm,
  updateForm,
  getFormInfo
} from "@/api/system/formAuthorize";
import nameSelects from '../NameSelect.vue'
import { getVisualTables } from "@/api/system/authorize"
export default {
  components: { nameSelects },
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: "",
        moduleId: "",
        bindTable: "",
        bindTableName: "",
        fullName: "",
        enCode: "",
        sortCode: 0,
        treeData: [],
        enabledMark: 1,
        description: "",
        dataType: "",
        fieldRule: 0
      },
      enCodeOptions: [],
      fieldRuleOptions: [
        { value: 0, label: "主表规则" },
        { value: 1, label: "副表规则" },
        { value: 2, label: "子表规则" }
      ],
      menuType: '',
      treeData: [],
      dataRule: {
        enCode: [
          { required: true, message: "字段名称不能为空", trigger: "blur" }
        ],
        fieldRule: [
          { required: true, message: "字段规则不能为空", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "字段说明不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(moduleId, id, menuType, tableName, dataType) {
      this.menuType = menuType;
      this.dataType = dataType
      this.dataForm.id = id || "";
      this.dataForm.moduleId = moduleId;
      this.visible = true;
      this.formLoading = true;
      this.treeData = []
      getVisualTables(moduleId, dataType).then(res => {
        let data = []
        for (const key in res.data.linkTables) {
          data.push({
            tableName: res.data.linkTables[key],
            dbLink: res.data.linkId
          })
        }
        this.treeData = data
      })
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.dataForm.bindTable = tableName;
        this.menuType = menuType;
        if (this.dataForm.id) {
          getFormInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data;
            this.formLoading = false;
          });
        } else {
          this.formLoading = false;
        }
      });
    },
    changeName(val, value) {
      this.dataForm.enCode = val
      this.dataForm.bindTable = value.tableName
      this.dataForm.fullName = value.fieldName || ''
    },
    onEnCodeChange(e) {
      let objVal;
      this.dataForm.fullName = "";
      this.dataForm.type = "";
      if (!!e) {
        this.enCodeOptions.forEach(o => {
          if (o.field === e) {
            objVal = {
              fullName: o.fieldName,
              type: o.dataType
            };
            return objVal;
          }
        });
        this.dataForm.fullName = objVal["fullName"];
        this.dataForm.type = objVal["type"];
      }
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          const formMethod = this.dataForm.id ? updateForm : createForm;
          formMethod(this.dataForm)
            .then(res => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.btnLoading = false;
                  this.$emit("refreshDataList");
                }
              });
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>
