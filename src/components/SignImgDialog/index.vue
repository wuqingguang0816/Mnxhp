<template>
  <div>
    <el-dialog title="请签名" class="JNPF-dialog JNPF-dialog_center sign-dialog"
      :closeOnClickModal='false' :visible.sync="signVisible" append-to-body width="600px">
      <div class="sign-main">
        <vue-esign ref="esign" :height='300' :width="560" :lineWidth="lineWidth" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleReset">清空</el-button>
        <el-button type="primary" @click="handleGenerate()">确定签名</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { createSign } from '@/api/permission/userSetting'
import vueEsign from 'vue-esign'
export default {
  name: 'SelectDialog',
  components: { vueEsign },
  props: {
    lineWidth: {
      required: true,
      type: Number
    },
    isDefault: {
      required: true,
      type: Number

    },
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      signVisible: false,
      signImg: '',
    }
  },
  methods: {
    init() {
      this.handleReset()
      this.signVisible = true
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
          isDefault: this.isDefault
        }
        createSign(query).then(res => {
          if (this.isDefault == 0) {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500
            })
            if (!this.userInfo.signImg) this.$store.commit('user/SET_USERINFO_SIGNIMG', this.signImg)
          }
          if (this.isDefault == 1) {
            this.$store.commit('user/SET_USERINFO_SIGNIMG', this.signImg)
          }
          this.signVisible = false
          this.$emit('close', this.signImg)
          this.handleReset()

        }).catch(err => {
          this.signVisible = false
          this.$emit('close')
          this.handleReset()
        })
      }).catch(err => {
        this.$message.warning("请签名")
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.sign-dialog {
  >>> .el-dialog__body {
    overflow: hidden;
    height: 320px;
    overflow: auto;
    overflow-x: hidden;
    padding: 23px 14px 2px !important;
  }
}

.sign-main {
  border: 1px solid rgb(224, 238, 238);
  width: 100%;
  height: 300px;
  background-color: rgb(247, 247, 247);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  margin-bottom: -10px;
}
</style>