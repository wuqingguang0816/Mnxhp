<template>
  <div>
    <el-dialog :title="title" :close-on-click-modal="false" width='600px' :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body>
      <el-form ref="dataForm" :model="dataForm" label-width="80px">
        <el-form-item label="转审给谁" prop="freeApproverUserId" v-if="eventType == 'transfer'"
          :rules="[{ required: true, message: '请选择转审给谁',trigger: 'blur'}]">
          <user-select v-model="dataForm.freeApproverUserId" placeholder="请选择转审给谁" />
        </el-form-item>
        <el-form-item :label="`${label}原因`" prop="handleOpinion" v-if="properties.hasOpinion">
          <el-input v-model="dataForm.handleOpinion" :placeholder="`请输入${label}原因`" type="textarea"
            :rows="4" />
        </el-form-item>
        <el-form-item label="手写签名" required v-if="properties.hasSign">
          <div class="sign-main">
            <img :src="dataForm.signImg" alt="" v-if="dataForm.signImg" class="sign-img">
            <div @click="addSign" class="sign-style">
              <i class="icon-ym icon-ym-signature add-sign"></i>
              <span class="sign-title">手写签名</span>
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
    <SignImgDialog v-if="signVisible" ref="SignImg" :lineWidth='3' :userInfo='userInfo'
      :isDefault='1' @close="signDialog" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SignImgDialog from '@/components/SignImgDialog'
export default {
  components: { SignImgDialog },
  data() {
    return {
      visible: false,
      properties: {},
      eventType: '',
      dataForm: {
        handleOpinion: '',
        freeApproverUserId: '',
        signImg: ''
      },
      btnLoading: false,
      title: '',
      label: '',
      signVisible: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    init(properties, eventType) {
      this.visible = true
      this.properties = properties
      this.eventType = eventType || ''
      this.dataForm.handleOpinion = ''
      this.dataForm.freeApproverUserId = ''
      this.dataForm.signImg = this.userInfo.signImg || ''
      switch (eventType) {
        case 'transfer':
          this.title = '转审'
          this.label = '转审'
          break;
        case 'revoke':
          this.title = '撤回流程'
          this.label = '撤回'
          break;
        case 'recall':
          this.title = '撤回审核'
          this.label = '撤回'
          break;
        default:
          break;
      }
      this.$nextTick(() => {
        this.handleReset()
        this.$refs['dataForm'].resetFields()
      })
    },
    addSign() {
      this.signVisible = true
      this.$nextTick(() => {
        this.$refs.SignImg.init()
      })
    },
    signDialog(val) {
      this.signVisible = true
      if (val) {
        this.dataForm.signImg = val
      }
    },
    handleSure() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.properties.hasSign && !this.dataForm.signImg) {
            this.$message({
              message: '请签名',
              type: 'error'
            })
            return
          }
          let query = {
            handleOpinion: this.dataForm.handleOpinion,
            freeApproverUserId: this.dataForm.freeApproverUserId,
            signImg: this.dataForm.signImg,
          }
          this.btnLoading = true
          this.$emit('submit', query)
        }
      })
    },
    closeDialog() {
      this.btnLoading = false
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.sign-main {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  .sign-img {
    width: 100px;
    height: 50px;
  }
  .add-sign {
    height: 50px;
    font-size: 36px;
    margin-top: 10px;
    color: #2188ff;
  }
  .sign-title {
    font-size: 16px;
    color: #2188ff;
  }
}
.sign-style {
  cursor: pointer;
}
</style>
