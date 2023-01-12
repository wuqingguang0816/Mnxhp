<template>
  <el-dialog title="表单外链配置" :visible.sync="dialogVisible" :close-on-click-modal="false"
    class="JNPF-dialog JNPF-dialog_center short_link_class" lock-scroll width="800px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px"
      v-loading="loading">
      <el-form-item label="外链填单">
        <el-switch v-model="dataForm.formUse" :active-value="1" :inactive-value="0"></el-switch>
        <span class="short_link_span">开启后，会生成表单填写链接，无需登录即可填写表单。</span>
      </el-form-item>
      <el-form-item label="外链地址" v-if="dataForm.formUse==1">
        <el-row class="form-use-row">
          <el-input v-model="dataForm.formLink" class="form-use-input float-left" readonly>
          </el-input>
          <el-button @click="open(dataForm.formLink)" class="float-left">打开</el-button>
          <el-button type="primary" @click="copy(dataForm.formLink,$event)" class="float-left">复制
          </el-button>
          <el-popover placement="bottom-end" width="180" trigger="hover">
            <div class="qrcode">
              <p>扫描二维码，分享此链接</p>
              <div id="qrcode" ref="qrCode" style="display: inline-block;margin: 2px 0px;"></div>
            </div>
            <div style="text-align: center; ">
              <el-button icon="icon-ym icon-ym-download" style="width: 100%;" size="mini"
                @click="download(1)">下载</el-button>
            </div>
            <div slot="reference" class="form-use-icon float-left ym-custom ym-custom-qrcode "
              @mouseover="getQRimg"></div>
          </el-popover>
        </el-row>
      </el-form-item>
      <el-form-item label="凭密码填写" v-if="dataForm.formUse==1" class="spacing"
        :prop='dataForm.formPassUse==1?"formPassword":""'>
        <el-row class="distance">
          <el-col :span="6">
            <el-switch v-model="dataForm.formPassUse" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-col>
          <el-col :span="18">
            <el-input v-model="dataForm.formPassword" v-if="dataForm.formPassUse==1"
              :required='dataForm.formPassUse==1'>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="公开查询">
        <el-switch v-model="dataForm.columnUse" :active-value="1" :inactive-value="0">
        </el-switch>
        <span class="short_link_span">开启后，无需登录即可查询已有数据。</span>
      </el-form-item>
      <el-form-item label="查询地址" v-if="dataForm.columnUse==1">
        <el-row class="form-use-row">
          <el-input v-model="dataForm.columnLink" class="form-use-input float-left" readonly>
          </el-input>
          <el-button @click="open(dataForm.columnLink)" class="float-left">打开</el-button>
          <el-button type="primary" @click="copy(dataForm.columnLink,$event)" class="float-left">复制
          </el-button>
          <el-popover placement="bottom-end" width="180" trigger="hover">
            <div class="qrcode">
              <p>扫描二维码，分享此链接</p>
              <div id="qrcode2" ref="qrCode2" style="display: inline-block;margin: 2px 0px;">
              </div>
            </div>
            <div style="text-align: center; ">
              <el-button icon="icon-ym icon-ym-download" style="width: 100%;" size="mini"
                @click="download(2)">下载</el-button>
            </div>
            <div slot="reference" class="form-use-icon float-left ym-custom ym-custom-qrcode "
              @mouseover="getQRimg2"></div>
          </el-popover>
        </el-row>
      </el-form-item>
      <template v-if="dataForm.columnUse==1">
        <el-row class="spacing">
          <el-form-item label="查询条件" prop="columnCondition">
            <el-input v-model="columnCondition" @click.native="change(1)"> </el-input>
          </el-form-item>
          <el-form-item label="显示内容" prop="columnText">
            <el-input v-model="columnText" @click.native="change(2)"> </el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="凭密码填写" :prop='dataForm.columnPassUse==1?"columnPassword":""'>
          <el-row class="distance">
            <el-col :span="6">
              <el-switch v-model="dataForm.columnPassUse" :active-value="1" :inactive-value="0">
              </el-switch>
            </el-col>
            <el-col :span="18">
              <el-input v-model="dataForm.columnPassword" v-if="dataForm.columnPassUse==1"
                :required='dataForm.columnPassUse==1'>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
        {{$t('common.confirmButton')}}</el-button>
    </span>
    <ChangeField v-if="changeFieldVisible" ref='ChangeField' multiline
      :selectedList='type==1?dataForm.columnCondition:dataForm.columnText'
      @changeField="changeFields" :list='listOptions' :type='type' />
  </el-dialog>
</template>

<script>
import QRCode from 'qrcodejs2'
import clipboard from '@/utils/clipboard'
import { getShortLink, save } from '@/api/onlineDev/webDesign'
import { getDrawingList } from '@/components/Generator/utils/db'
import { getVisualDevInfo } from '@/api/onlineDev/visualDev'
import ChangeField from '@/components/ChangeField'
export default {
  components: { ChangeField },
  data() {
    const validatePassword = (rule, value, callback) => {
      const passwordreg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^(0-9a-zA-Z)]).{6,16}$/
      if (!value) {
        callback(new Error('请输入凭密码填写'));
      } else if (!passwordreg.test(value)) {
        callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
      } else {
        if (this.dataForm.columnPassword !== '' || this.dataForm.columnPassword !== '') {
          this.$refs.dataForm.validateField('validatePassword');
        }
        callback()
      }
    }
    return {
      previewAppVisible: false,
      changeFieldVisible: false,
      qrCodeText: '',
      dialogVisible: false,
      loading: false,
      btnLoading: false,
      visible: false,
      dataForm: {
        id: '',
        formLink: '',
        formUse: 0,
        formPassUse: 0,
        formPassword: '',
        columnUse: 0,
        columnLink: '',
        columnPassUse: 0,
        columnPassword: '',
        columnCondition: [],
        columnText: [],
      },
      columnCondition: '',
      columnText: '',
      dataRule: {
        formPassword: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        columnPassword: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
      },
      qrcode: '',
      formData: '',
      listOptions: [],
      type: ''
    }
  },
  methods: {
    download(type) {
      let qrcode = ''
      if (type == 1) {
        qrcode = document.querySelector('#qrcode')
      } else {
        qrcode = document.querySelector('#qrcode2')
      }
      const canvas = qrcode.querySelector('canvas')
      const imgurl = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = imgurl
      a.download = '二维码' // 图片名称
      a.click()
    },
    changeFields(list) {
      if (this.type == 1) {
        this.dataForm.columnCondition = list
        let listArr = []
        for (let index = 0; index < this.dataForm.columnCondition.length; index++) {
          const element = this.dataForm.columnCondition[index];
          listArr.push(element.__config__.label ? element.__vModel__ + '(' + element.__config__.label + ')' : element.__vModel__)
        }
        this.columnCondition = listArr.join(",")
      } else {
        this.dataForm.columnText = list
        let listArr = []
        for (let index = 0; index < this.dataForm.columnText.length; index++) {
          const element = this.dataForm.columnText[index];
          listArr.push(element.__config__.label ? element.__vModel__ + '(' + element.__config__.label + ')' : element.__vModel__)
        }
        this.columnText = listArr.join(",")
      }
    },
    init(id) {
      this.btnLoading = false
      getShortLink(id).then(res => {
        this.dataForm = res.data || {}
        this.dataForm.columnCondition = this.dataForm.columnCondition ? JSON.parse(this.dataForm.columnCondition) : []
        this.dataForm.columnText = this.dataForm.columnText ? JSON.parse(this.dataForm.columnText) : []
        let listArr = []
        if (this.dataForm.columnCondition.length) {
          for (let index = 0; index < this.dataForm.columnCondition.length; index++) {
            const element = this.dataForm.columnCondition[index];
            listArr.push(element.__config__.label ? element.__vModel__ + '(' + element.__config__.label + ')' : element.__vModel__)
          }
          this.columnCondition = listArr.join(",")
        }
        let columnTextList = []
        if (this.dataForm.columnText.length) {
          for (let index = 0; index < this.dataForm.columnText.length; index++) {
            const element = this.dataForm.columnText[index];
            columnTextList.push(element.__config__.label ? element.__vModel__ + '(' + element.__config__.label + ')' : element.__vModel__)
          }
          this.columnText = columnTextList.join(",")
        }
      })
      getVisualDevInfo(id).then(res => {
        this.formData = res.data.formData && JSON.parse(res.data.formData)
        const noAllowList = ['table', 'uploadImg', 'uploadFz', 'modifyUser', 'modifyTime']
        let list = []
        const loop = (data, parent) => {
          if (!data) return
          if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
            loop(data.__config__.children, data)
          }
          if (Array.isArray(data)) data.forEach(d => loop(d, parent))
          if (data.__vModel__ && !noAllowList.includes(data.__config__.jnpfKey)) list.push(data)
        }
        loop(this.formData.fields)
        this.listOptions = list
      })
      this.dialogVisible = true
    },
    change(type) {
      this.type = type
      this.changeFieldVisible = true
      this.$nextTick(() => {
        this.$refs.ChangeField.openDialog()
      })
    },
    copy(text, event) {
      clipboard(text, event)
    },
    open(val) {
      window.open(val)
    },
    getQRimg() {
      if (!this.dataForm.formLink) {
        return
      }
      this.$refs.qrCode.innerHTML = "";
      this.qrcode = new QRCode(this.$refs.qrCode, {
        width: 150,
        height: 150, // 高度
        text: this.dataForm.formLink, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
    },
    getQRimg2() {
      if (!this.dataForm.columnLink) {
        return
      }
      this.$refs.qrCode2.innerHTML = "";
      this.qrcode = new QRCode(this.$refs.qrCode2, {
        width: 150,
        height: 150, // 高度
        text: this.dataForm.columnLink, // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
    },
    dataFormSubmit() {
      this.btnLoading = true
      if (this.dataForm.formPassUse == 1) this.dataForm.formPassword = ''
      if (this.dataForm.columnPassUse == 1) this.dataForm.columnPassword = ''
      if (typeof this.dataForm.columnCondition !== 'string') this.dataForm.columnCondition = JSON.stringify(this.dataForm.columnCondition)
      if (typeof this.dataForm.columnText !== 'string') this.dataForm.columnText = JSON.stringify(this.dataForm.columnText)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          save(this.dataForm).then(res => {
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000,
              onClose: () => {
                this.$nextTick(() => {
                  this.dialogVisible = false
                  this.visible = false
                  this.btnLoading = false
                  this.$emit('close', true)
                })
              }
            })
          })
        } else {
          this.btnLoading = false
        }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
.short_link_class {
  >>> .el-form-item__label {
    font-weight: bolder;
  }
  >>> .el-dialog__body {
    height: 500px;
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
.spacing {
  margin-top: 18px;
}
.distance {
  width: 200px;
}
.qrcode {
  text-align: center;
}
>>> .el-form-item__error {
  margin-left: 50px;
}
</style>