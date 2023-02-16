<template>
  <el-dialog :title="!dataForm.id ? '新建' : '编辑'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll append-to-body
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      v-loading="formLoading" class="menuForm">
      <el-form-item label="门户名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入门户名称" />
      </el-form-item>
      <el-form-item label="默认首页" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="999999" v-model="dataForm.sortCode"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="说明" prop="bodyText">
        <el-input v-model="dataForm.description" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getMenuSelector, createMenu, updateMenu, getMenuInfo } from '@/api/system/menu'

export default {
  components: {},
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        sortCode: 0,
        enabledMark: 1,
        description: '',
        systemId: '',//系统id
      },
      dataRule: {
        fullName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
          { max: 50, message: '菜单名称最多为50个字符！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id, systemId) {
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        // 获取表单数据
        if (this.dataForm.id) {
          this.formLoading = true
          getMenuInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.$nextTick(() => { this.formLoading = false })
          }).catch(() => { })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateMenu : createMenu
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
    },
  }
}
</script>