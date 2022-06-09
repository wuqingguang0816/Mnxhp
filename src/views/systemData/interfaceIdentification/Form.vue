<template>
  <div class="JNPF-preview-main">
    <div class="JNPF-common-page-header">
      <el-page-header @back="goBack" content="接口认证" />
      <div class="options">
        <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">{{$t('common.confirmButton')}}</el-button>
        <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <el-row class="main">
      <el-col :span="14" :offset="5" class="mt-20">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" class="mt-20" label-width="100px" @submit.native.prevent>
          <el-col :span="24">
            <el-form-item label="appId" prop="appId">
              <el-input v-model="dataForm.appId" placeholder="输入appId" maxlength="100">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="应用名称" prop="appName">
              <el-input v-model="dataForm.appName" placeholder="输入应用名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="appSecret" prop="appSecret">
              <el-input v-model="dataForm.appSecret" placeholder="输入appSecret" show-password readOnly>
                <el-button slot="append" style="background-color: #1890FF;color:#FFF;" @click="getappSecret">获取秘钥</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="使用期限" prop="usefulLife">
              <div slot="label">使用期限
                <el-tooltip content="未选择日期默认永久有效" placement="top">
                  <a class="el-icon-warning-outline"></a>
                </el-tooltip>
              </div>
              <el-date-picker v-model="dataForm.usefulLife" type="date" placeholder="请选择" default-time="00:00:00" style="width:100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="白名单" prop="whiteList">
              <el-input v-model="dataForm.whiteList" placeholder="" type="textarea" :rows="5" />
              <span style="color:#C0C4CC">多个IP设置，用英文符号隔开，如192.168.0.1,192.168.0.2</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="排序" prop="sortCode">
              <el-input-number v-model="dataForm.sortCode" controls-position="right" @change="handleChange" :min="0" style="width:25%"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="dataForm.status" :active-value="1" :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="说明" prop="description">
              <el-input v-model="dataForm.description" placeholder="" type="textarea" :rows="5" />
            </el-form-item>
          </el-col>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { create, update, getAppSecret } from '@/api/systemData/interfaceIdentification.js'

export default {
  data() {
    return {
      btnLoading: false,
      dataForm: {
        appSecret: '',
        sortCode: 0,
        status: 1,
      },
      dataRule: {
        appId: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        appName: [
          {
            required: true,
            message: '应用名称不能为空',
            trigger: 'blur'
          }
        ],
        appSecret: [
          {
            required: true,
            message: 'appSecret不能为空',
            trigger: 'change'
          }
        ],
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('close', true)
    },
    init(data) {
      if (data) {
        console.log("data", data);
        this.initData(data)
      }
      // if (!id) return this.$emit('close')
      // this.id = id
      // this.title = title
      // this.reset()
    },

    initData(data) {
      this.dataForm = data
    },
    handleChange(value) {
      console.log(value);
    },

    getappSecret() {
      console.log("获取秘钥")
      getAppSecret().then(res => {
        this.dataForm.appSecret = res.data
      }).catch(() => { })

    },
    dataFormSubmit() {
      console.log("表单提交", this.dataForm)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? update : create
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.btnLoading = false
                this.$emit('close', true)
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
.main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px;
  >>> .el-table {
    flex: 1;
    border-top: none;
  }
}
</style>