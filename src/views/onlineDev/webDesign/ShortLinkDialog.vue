<template>
  <el-dialog title="表单外链配置" :visible.sync="dialogVisible"
    class="JNPF-dialog JNPF-dialog_center short_link_class" lock-scroll width="800px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      v-loading="loading">

      <jnpf-form-tip-item label="外链填单">
        <el-switch v-model="dataForm.formUse" :active-value="1" :inactive-value="0"></el-switch>
        <span class="short_link_span">开启后，会生成表单填写链接，无需登录即可填写表单。</span>
      </jnpf-form-tip-item>
      <el-row v-if="dataForm.formUse==1" class="form-use-row">
        <el-input v-model="dataForm.formUse" class="form-use-input float-left"> </el-input>
        <el-button @click="visible = false" class="float-left">打开</el-button>
        <el-button type="primary" @click="visible = false" class="float-left">复制</el-button>
        <!-- <div class="form-use-icon float-left ym-custom ym-custom-qrcode"></div> -->

        <el-popover placement="bottom-end" width="160" v-model="visible">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>
          <div slot="reference" class="form-use-icon float-left ym-custom ym-custom-qrcode"></div>
        </el-popover>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form label-width="100px">
            <el-form-item label="二维码内容">
              <el-input v-model="qrcode" placeholder="输入要生成二维码的字符串">
                <el-button slot="append" @click="getQRimg">生成</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="二维码图像">
              <div id="qrcode" ref="qrCode"></div>
              <p style="color:#666">使用微信扫一扫</p>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <jnpf-form-tip-item label="公开查询">
        <el-switch v-model="dataForm.cloumnUse" :active-value="1" :inactive-value="0"></el-switch>
        <span class="short_link_span">开启后，无需登录即可查询已有数据。</span>
      </jnpf-form-tip-item>
      <el-row v-if="dataForm.cloumnUse==1">
        <el-row style="margin-bottom:18px;">
          <el-input v-model="dataForm.formUse" class="form-use-input float-left"> </el-input>
          <el-button @click="visible = false" class="float-left">打开</el-button>
        </el-row>
        <el-row>
          <jnpf-form-tip-item label="查询条件" prop="toUserId">
            <el-input v-model="dataForm.formUse"></el-input>
          </jnpf-form-tip-item>
          <jnpf-form-tip-item label="显示内容" prop="toUserId">
            <el-input v-model="dataForm.id"></el-input>
          </jnpf-form-tip-item>
        </el-row>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
        {{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      previewAppVisible: false,
      qrCodeText: '',
      dialogVisible: false,
      loading: false,
      btnLoading: false,
      dataForm: {
        id: '',
        formUse: 0,
        userId: '',
        toUserId: '',
        flowId: [],
        description: '',
        startTime: '',
        endTime: '',
        flowName: '',
        toUserName: '',
        type: [],
      },
      dataRule: {

      },
      qrcode: '',
    }
  },
  methods: {
    init(id) {
      console.log(id)
      this.dialogVisible = true
    },
    getQRimg() {
      if (!this.qrcode) {
        return
      }
      this.$refs.qrCode.innerHTML = "";
      let qrcode = new QRCode(this.$refs.qrCode, {
        width: 265,
        height: 265, // 高度
        text: this.qrcode, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
    },

  }
}
</script>
<style  lang="scss" scoped>
.short_link_class {
  >>> .el-form-item__label {
    font-weight: bolder;
  }
  .short_link_span {
    margin-left: 15px;
  }

  .form-use-row {
    display: flex;
    align-items: center;
  }
  .form-use-input {
    width: 500px;
  }

  .form-use-icon {
    font-size: 32px;
  }
}
</style>