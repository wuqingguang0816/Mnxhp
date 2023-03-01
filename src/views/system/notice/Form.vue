<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="!dataForm.id ? '新建公告' : '编辑公告'" />
        <div class="options">
          <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="formLoading"
        label-width="100px" class="main">
        <jnpf-form-tip-item label="标题" prop="title">
          <el-input v-model="dataForm.title" placeholder="公告标题" />
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="用户" prop="toUserIds">
          <usersSelect v-model="toUserIds" placeholder="全部用户" multiple clearable />
        </jnpf-form-tip-item>
        <el-row>
          <el-col :span="12">
            <jnpf-form-tip-item label="分类" prop="classify">
              <el-select v-model="dataForm.classify" placeholder="选择消息来源" clearable
                :disabled="this.dataForm.id?true:false">
                <el-option v-for="(item,index) in classifyList" :key="index" :label="item.fullName"
                  :value="item.enCode">
                </el-option>
              </el-select>
            </jnpf-form-tip-item>
          </el-col>
          <el-col :span="12">
            <jnpf-form-tip-item label="失效时间" prop="timeExpires" tipLabel='当前时间超过失效时间，状态更新已过期'>
              <el-date-picker v-model="dataForm.timeExpires" type="date" placeholder="选择失效时间"
                value-format="timestamp">
              </el-date-picker>
            </jnpf-form-tip-item>
          </el-col>
        </el-row>
        <jnpf-form-tip-item label="附件" prop="files">
          <JNPF-UploadFz v-model="files" />
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="封面图片" prop="title" tipLabel='门户公告通知缩略图展示，无设置则系统默认图片'>
          <el-upload class="avatar-uploader" :headers="uploadHeaders"
            :action="define.comUploadUrl+'/userAvatar'" :show-file-list="false"
            :on-success="handleAvatarSuccess" accept="image/*">
            <img v-if="dataForm.headIcon" :src="define.comUrl+dataForm.headIcon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="正文" prop="bodyText">
          <JNPFQuill v-model="dataForm.bodyText" />
        </jnpf-form-tip-item>
        <el-row>
          <el-col :span="12">
            <jnpf-form-tip-item label="提醒方式" prop="remindWays">
              <el-select v-model="dataForm.remindWays" placeholder="选择消息来源" clearable
                :disabled="this.dataForm.id?true:false">
                <el-option v-for="(item,index) in remindWaysList" :key="index"
                  :label="item.fullName" :value="item.enCode">
                </el-option>
              </el-select>
            </jnpf-form-tip-item>
          </el-col>
          <el-col :span="12" v-if="dataForm.remindWays == 1">
            <jnpf-form-tip-item label="发送配置" prop="sendConfigured">
              <msg-dialog :value="dataForm.send" :title="dataForm.sendName" @change="onMsgChange"
                :messageSource="3" />
            </jnpf-form-tip-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </transition>
</template>

<script>
import { createNotice, updateNotice, getNoticeInfo } from '@/api/system/message'
import MsgDialog from "@/components/VisualPortal/HSchedule/msgDialog";
export default {
  components: { MsgDialog },
  data() {
    return {
      uploadHeaders: { Authorization: this.$store.getters.token },
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        toUserIds: '',
        title: '',
        files: '',
        bodyText: '',
        headIcon: '',
        remindWays: 0,
        classify: 0,
        sendConfigured: 0,
        timeExpires: null
      },
      sendConfiguredList: [],
      remindWaysList: [{ 'fullName': '站内信', 'enCode': 0 }, { 'fullName': '自定义', 'enCode': 1 }, { 'fullName': '不提醒', 'enCode': 2 }],
      classifyList: [{ 'fullName': '公告', 'enCode': 0 }, { 'fullName': '通知', 'enCode': 1 }],
      toUserIds: [],
      files: [],
      dataRule: {
        title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.dataForm.id = id || 0
      this.files = []
      this.toUserIds = []
      this.visible = true
      this.formLoading = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          getNoticeInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.files = res.data.files ? JSON.parse(res.data.files) : []
            this.toUserIds = res.data.toUserIds ? res.data.toUserIds.split(',') : []
          })
        }
        this.formLoading = false
      })
    },
    onMsgChange(id, item) {
      if (!id) {
        this.dataForm.send = ''
        this.dataForm.sendName = ''
        return
      }
      if (this.dataForm.send === id) return
      this.dataForm.send = id
      this.dataForm.sendName = item.fullName
    },
    handleAvatarSuccess(res) {
      if (res.code === 200 && res.data && res.data.url) {
        this.dataForm.headIcon = res.data.url
      } else {
        this.$message.error('头像上传失败');
      }
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.dataForm.files = JSON.stringify(this.files)
          this.dataForm.toUserIds = this.toUserIds.join(',')
          const formMethod = this.dataForm.id ? updateNotice : createNotice
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
                this.goBack()
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
.JNPF-preview-main {
  >>> .avatar-uploader {
    .el-upload {
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
  .content {
    >>> {
      p {
        line-height: 30px;
        img {
          display: block;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
  .vab-quill-content {
    >>> {
      .jnpf-form-tip-item__content {
        line-height: normal;
      }
    }
  }
}
.transfer-pane__body-tab {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .el-tabs__header {
    margin-bottom: 0;
    flex-shrink: 0;

    .el-tabs__nav {
      width: 100%;

      .el-tabs__item {
        width: 25%;
        text-align: center;
        padding: 0 20px;
      }
    }
  }

  &.hasSys-tab {
    .el-tabs__header .el-tabs__nav .el-tabs__item {
      width: 25%;
    }
  }

  .el-tabs__content {
    flex: 1;

    .el-tab-pane {
      height: 100%;
      padding: 10px;
      overflow: auto;

      .JNPF-common-el-tree {
        margin: 0;
      }
    }
  }
}
</style>