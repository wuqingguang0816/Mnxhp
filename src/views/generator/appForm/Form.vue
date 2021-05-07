<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="JNPF-full-dialog"
    :show-close="false" :modal="false" append-to-body>
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <p class="header-txt"> · 代码生成器</p>
      </div>
      <el-steps :active="activeStep" finish-status="success" simple class="steps">
        <el-step title="基础设置" @click.native="stepChick(0)"></el-step>
        <el-step title="表单设计" @click.native="stepChick(1)"></el-step>
        <el-step title="列表设计" @click.native="stepChick(2)"></el-step>
      </el-steps>
      <div class="options">
        <el-button @click="prve" :disabled="activeStep<=0">{{$t('common.prev')}}</el-button>
        <el-button @click="next" :disabled="activeStep>=2 || loading">{{$t('common.next')}}
        </el-button>
        <el-button type="primary" @click="dataFormSubmit()" :disabled="activeStep!=2"
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
            <el-form-item label="模板分类" prop="category">
              <el-select v-model="dataForm.category" placeholder="选择分类">
                <el-option :key="item.id" :label="item.fullName" :value="item.id"
                  v-for="item in categoryList" />
              </el-select>
            </el-form-item>
            <el-form-item label="模板说明" prop="description">
              <el-input v-model="dataForm.description" placeholder="模板说明" type="textarea"
                :rows="3" />
            </el-form-item>
          </el-form>
          <div class="JNPF-common-title">
            <h2>绑定数据库表</h2>
          </div>
          <el-table :data="tables" class="JNPF-common-table"
            empty-text="点击“新增”可选择 1 条（单表）或 2 条以上（多表）">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="typeId" label="类别" width="65">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.typeId=='1'">主表</el-tag>
                <el-tag type="warning" v-else @click="changeTable(scope.row)" style="cursor:pointer"
                  title="点击设置成主表">子表</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="tableName" label="说明" />
            <el-table-column prop="table" label="表名" />
            <el-table-column prop="tableField" label="外键字段">
              <template slot-scope="scope" v-if="scope.row.typeId !=='1'">
                <el-select v-model="scope.row.tableField" placeholder="请选择">
                  <el-option v-for="item in scope.row.fields" :key="item.field" :label="item.field"
                    :value="item.field">
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
          <div class="table-actions" @click="formVisible = true">
            <el-button type="text" icon="el-icon-plus">新增一行</el-button>
          </div>
        </el-col>
      </el-row>
      <template v-if="activeStep==1">
        <Generator ref="generator" :conf="formData" @drawingListChange="onDrawingListChange" />
      </template>
      <template v-if="activeStep==2">
        <columnDesign ref="columnDesign" :conf="columnData" />
      </template>
    </div>
    <TableForm :visible.sync="formVisible" ref="tableForm" @closeForm="colseForm" />
  </el-dialog>
</template>

<script>
import Generator from '@/components/Generator/index/HomeApp'
import TableForm from '../TableForm'
import ColumnDesign from '@/components/ColumnDesign/indexApp'
import mixin from '@/mixins/generator/form'
export default {
  mixins: [mixin],
  components: { Generator, ColumnDesign, TableForm },
  data() {
    return {
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
        state: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      }
    }
  }
}
</script>