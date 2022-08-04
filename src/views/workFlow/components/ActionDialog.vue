<template>
  <el-dialog :title="title" :close-on-click-modal="false" width='600px' :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body>
    <el-form ref="dataForm" :model="dataForm" label-width="80px">
      <el-form-item label="转审给谁" prop="freeApproverUserId" v-if="eventType == 'transfer'"
        :rules="[{ required: true, message: '请选择转审给谁',trigger: 'blur'}]">
        <user-select v-model="dataForm.freeApproverUserId" placeholder="请选择转审给谁" />
      </el-form-item>
      <el-form-item label="撤回原因" prop="handleOpinion" v-if="properties.handleOpinion"
        :rules="[{ required: true, message: '请输入撤回原因',trigger: 'blur'}]">
        <el-input v-model="dataForm.handleOpinion" placeholder="请输入撤回原因" type="textarea"
          :rows="4" />
      </el-form-item>
      <el-form-item label="撤回签名" required v-if="properties.hasSign">
        <div class="sign-main">
          <div class="sign-head">
            <div class="sign-tip">请在这里输入你的签名</div>
            <div class="sign-action">
              <el-button class="clear-btn" size="mini" @click="handleReset">清空</el-button>
              <el-button class="sure-btn" size="mini" @click="handleGenerate" :disabled="!!signImg">
                确定签名</el-button>
            </div>
          </div>
          <div class="sign-box">
            <vue-esign ref="esign" :height="330" v-if="!signImg" :lineWidth="5" />
            <img :src="signImg" alt="" v-if="signImg" class="sign-img">
          </div>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="handleSure()" :loading="btnLoading">
        {{$t('common.confirmButton')}}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import vueEsign from 'vue-esign'
export default {
  components: { vueEsign },
  data() {
    return {
      visible: false,
      properties: {},
      eventType: '',
      dataForm: {
        handleOpinion: '',
        freeApproverUserId: ''
      },
      signImg: '',
      btnLoading: false,
      title: ''
    }
  },
  methods: {
    init(properties, eventType) {
      this.visible = true
      this.properties = properties
      this.eventType = eventType || ''

      this.dataForm.handleOpinion = ''
      this.dataForm.freeApproverUserId = ''
      this.signImg = ''
      switch (eventType) {
        case 'transfer':
          this.title = '转审'
          break;
        case 'revoke':
          this.title = '撤回流程'
          break;
        case 'recall':
          this.title = '撤回审核'
          break;
        default:
          break;
      }

      this.$nextTick(() => {
        this.handleReset()
        this.$refs['dataForm'].resetFields()
      })
    },
    handleSure() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.properties.hasSign && !this.signImg) {
            this.$message({
              message: '请签名',
              type: 'error'
            })
            return
          }
          let query = {
            handleOpinion: this.dataForm.handleOpinion,
            freeApproverUserId: this.dataForm.freeApproverUserId,
            signImg: this.signImg,
          }
          this.btnLoading = true
          this.$emit('submit', query)
        }
      })
    },
    closeDialog() {
      this.btnLoading = false
      this.visible = false
    },
    handleReset() {
      this.signImg = ''
      this.$nextTick(() => {
        this.$refs.esign && this.$refs.esign.reset()
      })
    },
    handleGenerate() {
      this.$refs.esign.generate().then(res => {
        if (res) this.signImg = res
      }).catch(err => {
        this.$message({
          message: '请签名',
          type: 'warning'
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.sign-main {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  .sign-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    border-bottom: 1px solid #dcdfe6;
    .sign-tip {
      color: #a5a5a5;
      font-size: 12px;
    }
    .sign-action {
      display: flex;
      align-items: center;
      .clear-btn,
      .sure-btn {
        margin-left: 5px;
      }
    }
  }
  .sign-box {
    border-top: 0;
    height: 100px;
  }
  .sign-img {
    width: 100%;
  }
}
</style>
