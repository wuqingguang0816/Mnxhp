<template>
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
        <div class="sign-mian">
          <img :src="userInfo.signImg" alt="" v-if="userInfo.signImg" class="sign-img">
          <div @click="addSign" class="sign-style">
            <i class="icon-ym icon-ym-signature add-sign"></i>
            <span class="sign-title">手写签名</span>
          </div>
        </div>
        <el-dialog title="请签名" class="JNPF-dialog JNPF-dialog_center sign-dialog"
          :closeOnClickModal='false' :visible.sync="dialogVisible" append-to-body width="600px">
          <div class="drawing-board">
            <vue-esign ref="esign" :height=' 300' :width="560" :lineWidth="3" />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleReset">清空</el-button>
            <el-button type="primary" @click="handleGenerate()">确定</el-button>
          </span>
        </el-dialog>
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
import { createSign } from '@/api/permission/userSetting'
import { mapGetters } from "vuex";
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
      title: '',
      label: '',
      dialogVisible: false
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
      this.signImg = ''
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
    handleReset() {
      this.signImg = ''
      this.$nextTick(() => {
        this.$refs.esign && this.$refs.esign.reset()
      })
    },
    handleGenerate() {
      this.$refs.esign.generate().then(res => {
        if (res) this.signImg = res
        let query = {
          signImg: this.signImg,
          isDefault: 1
        }
        createSign(query).then(res => {
          this.$store.commit('user/SET_USERINFO_SIGNIMG', this.signImg)
          this.dialogVisible = false
          this.handleReset()
        }).catch(err => {
          this.dialogVisible = false
          this.handleReset()
        })
      }).catch(err => {
        this.dialogVisible = true
        this.handleReset()
      })
    },
    addSign() {
      this.dialogVisible = true
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
.sign-mian {
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
