<template>
  <el-dialog :title="!dataForm.id?'新建':'编辑'" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="900px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="100px">
      <el-alert title="设置当前组织部门的管理和相关操作权限" type="warning" :closable="false" show-icon class="mb-20">
      </el-alert>
      <el-form-item label="设置管理员" prop="userId" v-if="!dataForm.id">
        <user-select v-model="dataForm.userId" placeholder="请选择管理员" @change="onChange" />
      </el-form-item>
      <el-form-item label="设置管理员" prop="userId" v-if="dataForm.id">
        <user-select v-model="dataForm.userId" placeholder="请选择管理员" @change="onChange" disabled />
      </el-form-item>
      <el-table v-loading="listLoading" :data="treeList" row-key="organizeId" lazy
        :load="loadExpandData" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="height:400px;overflow: auto">
        <el-table-column prop="fullName" label="组织架构" width="180" />
        <el-table-column label="组织操作权限(本层级)" width="300">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.thisLayerSelect"
              :checked='scope.row.thisLayerSelect===1?true:false' true-label="1" false-label="0">查看
            </el-checkbox>
            <el-checkbox class="checkbox" :checked='scope.row.thisLayerAdd==1?true:false'
              v-model="scope.row.thisLayerAdd" true-label="1" false-label="0">添加
            </el-checkbox>
            <el-checkbox class="checkbox" v-model="scope.row.thisLayerEdit"
              :checked='scope.row.thisLayerEdit===1?true:false' true-label="1" false-label="0">编辑
            </el-checkbox>
            <el-checkbox class="checkbox" v-model="scope.row.thisLayerDelete"
              :checked='scope.row.thisLayerDelete===1?true:false' true-label="1" false-label="0">删除
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="子组织操作权限(子层级)">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.subLayerSelect"
              :checked='scope.row.subLayerSelect===1?true:false' true-label="1" false-label="0">查看
            </el-checkbox>
            <el-checkbox class="checkbox" v-model="scope.row.subLayerAdd"
              :checked='scope.row.subLayerAdd===1?true:false' true-label="1" false-label="0"> 添加
            </el-checkbox>
            <el-checkbox class="checkbox" v-model="scope.row.subLayerEdit"
              :checked='scope.row.subLayerEdit===1?true:false' true-label="1" false-label="0">编辑
            </el-checkbox>
            <el-checkbox class="checkbox" v-model="scope.row.subLayerDelete"
              :checked='scope.row.subLayerDelete===1?true:false' true-label="1" false-label="0">删除
            </el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getSelectorOrgList, saveGradeManage } from '@/api/permission/gradeManage'
export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        userId: ''
      },
      listLoading: false,
      refreshTable: true,
      treeList: [],
      dataRule: {
        userId: [
          { required: true, message: '请选择管理员', trigger: 'click' }
        ]
      }
    }
  },
  methods: {
    setRecursion(list, id, data) {  //递归添加子级
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          list[i] = { ...list[i], children: data }
        } else {
          if (list[i].children) {
            this.setRecursion(list[i].children, id, data)
          }
        }
      }
    },
    loadExpandData(tree, treeNode, resolve) {
      getSelectorOrgList(tree.organizeId, this.dataForm.userId || '').then(res => {
        this.setRecursion(this.treeList, tree.id, res.data)
        resolve(res.data)
      })
    },
    onChange(val) {
      if (!val) return
      this.initData()
    },
    handleCheckedDatesChange(val) {
      console.log(val)
    },
    initData() {
      this.listLoading = true
      if (this.dataForm.id) {
        getSelectorOrgList(0, this.dataForm.userId || '').then(res => {
          this.treeList = res.data || []
          this.listLoading = false
          this.btnLoading = false
        }).catch(() => {
          this.listLoading = false
          this.btnLoading = false
        })
      } else {
        getSelectorOrgList(0, '').then(res => {
          this.treeList = res.data || []
          this.listLoading = false
          this.btnLoading = false
        }).catch(() => {
          this.listLoading = false
          this.btnLoading = false
        })
      }

    },
    init(id) {
      this.treeList = []
      this.dataForm.id = id || ""
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.userId = id || ""
        this.initData()
      })
      this.formLoading = false
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let query = {
            ...this.dataForm, orgAdminModel: this.treeList
          }
          this.btnLoading = true
          saveGradeManage(query).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  margin-left: -20px;
}
</style>