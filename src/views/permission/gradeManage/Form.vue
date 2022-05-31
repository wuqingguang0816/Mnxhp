<template>
  <el-dialog :title="!dataForm.id?'新建':'编辑'" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="900px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
      label-width="100px">
      <el-alert title="设置当前组织部门的管理和相关操作权限" type="warning" :closable="false" show-icon class="mb-20">
      </el-alert>
      <el-form-item label="设置管理员" prop="userId">
        <user-select v-model="dataForm.userId" placeholder="请选择管理员" @change="onChange" />
      </el-form-item>
      <el-table v-loading="listLoading" :data="treeList" row-key="id" lazy :load="loadExpandData"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="height:400px;overflow: auto">
        <el-table-column prop="fullName" label="组织架构" width="180" />
        <el-table-column label="组织操作权限(本层级)" width="300">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.thisLayerSelect">查看
            </el-checkbox>
            <el-checkbox style="margin-left: -20px;" v-model="scope.row.thisLayerAdd">添加
            </el-checkbox>
            <el-checkbox style="margin-left: -20px;" v-model="scope.row.thisLayerEdit">编辑
            </el-checkbox>
            <el-checkbox style="margin-left: -20px;" v-model="scope.row.thisLayerDelete">删除
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="子组织操作权限(子层级)">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.subLayerSelect">查看</el-checkbox>
            <el-checkbox style="margin-left: -20px;" v-model="scope.row.subLayerAdd">添加
            </el-checkbox>
            <el-checkbox style="margin-left: -20px;" v-model="scope.row.subLayerEdit">编辑
            </el-checkbox>
            <el-checkbox style="margin-left: -20px;" v-model="scope.row.subLayerDelete">删除
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
import { getSelectorOrgList } from '@/api/permission/gradeManage'
export default {
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      typeOptions: [],
      dataForm: {
        id: '',
        fullName: '',
        userId: ''
      },
      listLoading: false,
      refreshTable: true,
      treeList: [],
      dataRule: {
        userId: [
          { required: true, message: '请选择管理员', trigger: 'click' }
        ],
        fullName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { validator: this.formValidate('fullName', '分组名称不能含有特殊符号'), trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入分组编码', trigger: 'blur' },
          { validator: this.formValidate('enCode', '分组编码只能输入英文、数字和小数点且小数点不能放在首尾'), trigger: 'blur' },
          { max: 50, message: '分组编码最多为50个字符！', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择分组类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initData()
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
      getSelectorOrgList(tree.id, this.dataForm.userId ? this.dataForm.userId : '').then(res => {
        res.data.forEach(element => {
          element.thisLayerSelect = element.thisLayerSelect == 0 ? false : true
          element.thisLayerEdit = element.thisLayerEdit == 0 ? false : true
          element.thisLayerDelete = element.thisLayerDelete == 0 ? false : true
          element.thisLayerAdd = element.thisLayerAdd == 0 ? false : true
          element.subLayerEdit = element.subLayerEdit == 0 ? false : true
          element.subLayerDelete = element.subLayerDelete == 0 ? false : true
          element.subLayerSelect = element.subLayerSelect == 0 ? false : true
          element.subLayerAdd = element.subLayerAdd == 0 ? false : true
        });
        this.setRecursion(this.treeList, tree.id, res.data)
        resolve(res.data)
      })
    },
    onChange(val) {
      if (!val) return
      this.initData()
      console.log(val)
    },
    handleCheckedDatesChange(val) {
      console.log(val)
    },
    initData() {
      this.loading = true
      getSelectorOrgList(0, this.dataForm.userId ? this.dataForm.userId : '').then(res => {
        res.data.forEach(element => {
          element.thisLayerSelect = element.thisLayerSelect == 0 ? false : true
          element.thisLayerEdit = element.thisLayerEdit == 0 ? false : true
          element.thisLayerDelete = element.thisLayerDelete == 0 ? false : true
          element.thisLayerAdd = element.thisLayerAdd == 0 ? false : true
          element.subLayerEdit = element.subLayerEdit == 0 ? false : true
          element.subLayerDelete = element.subLayerDelete == 0 ? false : true
          element.subLayerSelect = element.subLayerSelect == 0 ? false : true
          element.subLayerAdd = element.subLayerAdd == 0 ? false : true
        });
        console.log(res.data)
        this.treeList = res.data
        this.listLoading = false
        this.btnLoading = false
      }).catch(() => {
        this.listLoading = false
        this.btnLoading = false
      })
    },
    init(data) {
      this.dataForm.id = data ? (data.id ? data.id : '') : ''
      // this.dataForm.userId=data
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.$store.dispatch('base/getDictionaryData', { sort: 'groupType' }).then(res => {
          this.typeOptions = res
        })
        if (this.dataForm.id) {
          getGroupInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
          })
        }
      })
      this.formLoading = false
    },
    dataFormSubmit() {
      let s = {

        ...this.dataForm, orgAdminModel: this.treeList
      }
      console.log(s)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateGroup : createGroup
          formMethod(this.dataForm).then(res => {
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
// .JNPF-dialog.JNPF-dialog_center .el-dialog .el-dialog__body {
//   // overflow: auto;
//   // overflow-x: hidden;
//   max-height: 70vh;
//   padding: 10px 9px 2px;
// }
</style>