<template>
  <el-dialog :title="!enCode ? '新建翻译' : '编辑翻译'" :close-on-click-modal="false"
    :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
    <el-form ref="dataForm" label-width="100px" :model="dataForm">
      <el-form-item label="翻译分类">
        <el-input v-model="languageTypeText" placeholder="翻译分类" disabled />
      </el-form-item>
      <el-form-item label="翻译标记" prop="signKey"
        :rules="[{ required: true,message: '翻译标记不能为空', trigger: 'blur' }, { pattern: /^[A-Za-z0-9_\.\-]+$/, message: '请输入正确的翻译标记'}]">
        <el-input v-model="dataForm.signKey" placeholder="翻译标记" maxlength="50" />
      </el-form-item>
      <el-form-item :label="item.placeholderText" :prop="'translateList.' + i + '.fullName'"
        v-for="(item,i) in dataForm.translateList" :key="item.enCode" :rules="item.rules">
        <el-input v-model="item.fullName" :placeholder="item.placeholderText" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { LanguageMapInfo, LanguageMapUpdate, LanguageMapCreate } from '@/api/systemData/languageMap'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        languageTypeId: '',
        signKey: '',
        translateList: [],
      },
      enCode: '',
      languageTypeText: '',
      btnLoading: false,
    }
  },
  methods: {
    init(languageList, languageTypeId, languageTypeText, enCode) {
      this.dataForm.translateList = languageList.map(o => ({
        fullName: '',
        language: o.enCode,
        placeholderText: o.fullName,
        rules: { required: true, message: `${o.fullName}不能为空`, trigger: 'blur' }
      }))
      this.dataForm.languageTypeId = languageTypeId
      this.languageTypeText = languageTypeText
      this.enCode = enCode || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.enCode) {
          LanguageMapInfo(this.enCode).then(res => {
            this.dataForm.languageTypeId = res.data.languageTypeId
            this.dataForm.signKey = res.data.signKey
            outer: for (let i = 0; i < this.dataForm.translateList.length; i++) {
              let e = this.dataForm.translateList[i];
              inner: for (let j = 0; j < res.data.translateList.length; j++) {
                if (e.language == res.data.translateList[j].language) {
                  e.fullName = res.data.translateList[j].fullName
                  break inner
                }
              }
            }
          })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let translateList = this.dataForm.translateList.map(o => ({
            language: o.language,
            fullName: o.fullName
          }))
          let data = {
            languageTypeId: this.dataForm.languageTypeId,
            signKey: this.dataForm.signKey,
            translateList
          }
          const formMethod = this.enCode ? LanguageMapUpdate : LanguageMapCreate
          formMethod(data, this.enCode).then(res => {
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
          }).catch(() => { this.btnLoading = false })
        }
      })
    }
  }
}
</script>