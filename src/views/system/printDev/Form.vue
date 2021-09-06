<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="JNPF-full-dialog"
    :show-close="false" :modal="false">
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <p class="header-txt"> · 打印模板</p>
      </div>
      <el-steps :active="activeStep" finish-status="success" simple class="steps steps2"
        v-if="!loading">
        <el-step title="基础设置" @click.native="stepChick(0)" />
        <el-step title="打印设计" @click.native="stepChick(1)" />
      </el-steps>
      <div class="options">
        <el-button @click="prve" :disabled="activeStep<=0">{{$t('common.prev')}}</el-button>
        <el-button @click="next" :disabled="activeStep>=1 || loading">{{$t('common.next')}}
        </el-button>
        <el-button type="primary" @click="dataFormSubmit()" :disabled="activeStep!=1"
          :loading="btnLoading">{{$t('common.confirmButton')}}</el-button>
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="main" v-loading="loading">
      <el-row type="flex" justify="center" align="middle" v-if="!activeStep" class="basic-box">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="10" class="basicForm">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px"
            @submit.native.prevent label-position="right">
            <el-form-item label="模板名称" prop="fullName">
              <el-input v-model="dataForm.fullName" placeholder="模板名称" maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item label="模板编码" prop="enCode">
              <el-input v-model="dataForm.enCode" placeholder="模板编码" maxlength="50">
              </el-input>
            </el-form-item>
            <el-form-item label="模板类型" prop="type">
              <el-radio-group v-model="dataForm.type">
                <el-radio :label="1">流程表单</el-radio>
                <el-radio :label="2">功能表单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="模板分类" prop="category">
              <el-select v-model="dataForm.category" placeholder="选择分类">
                <el-option :key="item.id" :label="item.fullName" :value="item.enCode"
                  v-for="item in categoryList" />
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sortCode">
              <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode"
                controls-position="right" />
            </el-form-item>
            <el-form-item label="模板状态" prop="enabledMark">
              <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="模板说明" prop="description">
              <el-input v-model="dataForm.description" placeholder="模板说明" type="textarea"
                :rows="3" />
            </el-form-item>
            <!-- <group-title content="数据来源" class="mb-10" />
            <div class="mb-20">
              <el-alert title="默认打印的时候必须传业务主键@formId给SQL语句里面作为Where查询条件" type="warning" show-icon
                :closable="false"></el-alert>
            </div> -->
            <el-form-item label="数据连接" prop="dbLinkId">
              <el-select v-model="dataForm.dbLinkId" placeholder="请选择数据库" @change="onDbChange"
                clearable>
                <el-option-group v-for="group in dbOptions" :key="group.fullName"
                  :label="group.fullName">
                  <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
                    :value="item.id" />
                </el-option-group>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="SQL语句" prop="leftFields">
              <el-input v-model="dataForm.leftFields" placeholder="SQL语句" type="textarea"
                :rows="10" />
            </el-form-item> -->
            <el-table :data="tables" class="JNPF-common-table"
              empty-text="点击“新增”可选择 1 条（单表）或 2 条以上（多表）">
              <el-table-column type="index" label="序号" width="50" align="center" />
              <el-table-column prop="typeId" label="类别" width="65">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.typeId=='1'">主表</el-tag>
                  <el-tag type="warning" v-else @click="changeTable(scope.row)"
                    style="cursor:pointer" title="点击设置成主表">子表</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="tableName" label="说明" />
              <el-table-column prop="table" label="表名" />
              <el-table-column prop="tableField" label="外键字段">
                <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                  <el-select v-model="scope.row.tableField" placeholder="请选择">
                    <el-option v-for="item in scope.row.fields" :key="item.field"
                      :label="item.field" :value="item.field">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="relationTable" label="关联主表" /> -->
              <el-table-column prop="relationField" label="关联主键">
                <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                  <el-select v-model="scope.row.relationField" placeholder="请选择">
                    <el-option v-for="item in mainTableFields" :key="item.field" :label="item.field"
                      :value="item.field">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="50">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" class="JNPF-table-delBtn"
                    @click="delItem(scope.row,scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="table-actions" @click="openTableBox">
              <el-button type="text" icon="el-icon-plus">新增一行</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <template v-if="activeStep==1">
        <print-templater ref="printTemplater" :treeData="treeData"
          v-model="dataForm.printTemplate" />
      </template>
    </div>
    <TableForm :visible.sync="formVisible" ref="tableForm" @closeForm="colseForm"
      :dbLinkId="dataForm.dbLinkId" />
  </el-dialog>
</template>

<script>
import { getPrintDevInfo, Update, Create } from '@/api/system/printDev'
import PrintTemplater from './ts-print-templater'
import TableForm from '@/views/generator/TableForm'
import mixin from '@/mixins/generator/common'
export default {
  mixins: [mixin],
  components: { PrintTemplater, TableForm },
  data() {
    return {
      visible: false,
      loading: false,
      activeStep: 0,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        dbLinkId: '0',
        type: 1,
        enabledMark: 1,
        sortCode: 0,
        category: '',
        sqlTemplate: '',
        leftFields: '',
        printTemplate: '',
        description: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '模板名称不能为空', trigger: 'blur' },
        ],
        enCode: [
          { required: true, message: '模板编码不能为空', trigger: 'blur' },
          { validator: this.formValidate('enCode'), trigger: 'blur' },
        ],
        category: [
          { required: true, message: '模板分类不能为空', trigger: 'change' },
        ],
        dbLinkId: [
          { required: true, message: '数据连接不能为空', trigger: 'change' },
        ],
        // leftFields: [
        //   { required: true, message: 'SQL语句不能为空', trigger: 'blur' },
        // ]
      },
      formVisible: false,
      btnLoading: false,
      printTemplate: null,
      tables: [],
      categoryList: [],
      dbOptions: [],
      mainTableFields: [],
      relationTable: "",
      treeData: []
    }
  },
  methods: {
    init(categoryList, id) {
      this.categoryList = categoryList
      this.activeStep = 0
      this.dataForm.id = id || ''
      this.getDbOptions()
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.loading = true
          getPrintDevInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.tables = this.dataForm.leftFields && JSON.parse(this.dataForm.leftFields) || []
            this.updateFields()
            this.loading = false
          }).catch(() => { this.loading = false })
        }
      })
    },
    dataFormSubmit() {
      this.btnLoading = true
      this.dataForm.leftFields = JSON.stringify(this.tables)
      const formMethod = this.dataForm.id ? Update : Create
      formMethod(this.dataForm).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.closeDialog(true)
          }
        })
      }).catch(() => { this.btnLoading = false })
    },
    next() {
      if (this.activeStep < 1) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (!this.tables.length) {
              this.$message.warning('请至少选择一个数据表')
              return
            }
            if (!this.exist()) return
            let mainTable = this.tables.filter(o => o.typeId == '1')[0]
            let subTable = this.tables.filter(o => o.typeId == '0')
            let treeData = mainTable.fields.map(o => ({ field: o.field, fieldName: o.fieldName }))
            outer: for (let i = 0; i < subTable.length; i++) {
              inner: for (let j = 0; j < treeData.length; j++) {
                if (subTable[i].relationField === treeData[j].field) {
                  treeData[j].children = subTable[i].fields.map(o => ({ field: o.field, fieldName: o.fieldName }))
                  break inner
                }
              }
            }
            this.treeData = treeData
            this.activeStep += 1
          }
        })
      }
    }
  }
}
</script>