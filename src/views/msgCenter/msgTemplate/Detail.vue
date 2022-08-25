<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="详情" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-row class="main" v-loading="loading">
        <el-form :model="dataForm" ref="dataForm" label-width="100px" @submit.native.prevent>
          <el-col :span="12">
            <el-form-item label="名称" prop="fullName">
              <p>{{dataForm.fullName}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码" prop="enCode">
              <p>{{dataForm.enCode}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板类型">
              <p>{{dataForm.templateType=='0'?'自定义模板':'系统模板'}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息来源" prop="messageSource">
              <p>{{dataForm.messageSourceVal}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息类型" prop="messageType">
              <p>{{dataForm.messageTypeVal}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="enabledMark">
              <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0"
                disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sortCode">
              <p>{{dataForm.sortCode}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="说明" prop="description">
              <p>{{dataForm.description}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="right-pane" v-if="dataForm.messageType != 3">
              <el-form-item label="消息标题" prop="title">
                <p>{{dataForm.title}}</p>
              </el-form-item>
              <el-form-item label="消息内容" prop="content" v-if="dataForm.messageType == 2">
                <p v-html="dataForm.content"></p>
              </el-form-item>
              <el-form-item label="消息内容" prop="content" class="jnpf-textarea-item" v-else>
                <p>{{dataForm.content}}</p>
              </el-form-item>
            </div>
            <div class="right-pane" v-else>
              <jnpf-form-tip-item label="模版编号" prop="templateCode"
                tipLabel="阿里云：在模板管理⻚⾯查看模板CODE<br/>腾讯云：在正⽂模板管理⻚⾯查看模板ID">
                <p>{{dataForm.templateCode}}</p>
              </jnpf-form-tip-item>
              <div class="msg-pane">
                <div class="list">
                  <el-table :data="smsList" ref="dragTable" row-key="id" height="100%">
                    <el-table-column label="序号" type="index" width="300"></el-table-column>
                    <el-table-column prop="smsField">
                      <template slot="header">
                        <p>
                          短信变量
                          <el-tooltip content="内容在第三方平台维护，绑定第三方平台短信变量，如：腾讯云：{1}，阿里云格式：${name}"
                            placement="top">
                            <a class="el-icon-warning-outline"></a>
                          </el-tooltip>
                        </p>
                      </template>
                    </el-table-column>
                    <el-table-column label="参数" prop="field"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </transition>
</template>
<script>
import { getMsgTemplateDetail, getMsgTypeList } from '@/api/msgCenter/msgTemplate'
export default {
  name: 'msgTemplate-Detail',
  data() {
    return {
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        templateType: 0,
        messageType: '',
        messageSource: '',
        enabledMark: 0,
        sortCode: '',
        description: '',
        title: '',
        content: '',
        templateCode: '',
      },
      btnLoading: false,
      loading: false,
      messageSourceList: [],
      messageTypeList: [],
      smsList: []
    }
  },
  methods: {
    init(id, messageTypeList) {
      this.dataForm.id = id || ''
      this.messageTypeList = messageTypeList || []
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.getConfig()
      })
    },
    getConfig() {
      this.loading = true
      getMsgTypeList(4).then(res => {
        this.messageSourceList = res.data
        if (this.dataForm.id) {
          getMsgTemplateDetail(this.dataForm.id).then(res => {
            this.loading = false
            this.dataForm = res.data
            if (this.dataForm.enabledMark) this.dataForm.enabledMark = Number(this.dataForm.enabledMark)
            this.smsList = res.data.smsFieldList
            const sourceItem = this.messageSourceList.find(item => {
              return item.enCode == this.dataForm.messageSource
            })
            const typeItem = this.messageTypeList.find(item => {
              return item.enCode == this.dataForm.messageType
            })
            if (sourceItem) this.dataForm.messageSourceVal = sourceItem.fullName
            if (typeItem) this.dataForm.messageTypeVal = typeItem.fullName
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    goBack() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  p {
    color: #606266;
  }
}
</style>