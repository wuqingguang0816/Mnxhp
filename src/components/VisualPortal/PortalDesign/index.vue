<template>
  <el-dialog :visible.sync="visible" fullscreen lock-scroll class="JNPF-full-dialog"
    :show-close="false" :modal="false">
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <el-tooltip class="item" effect="dark" :content="fullName" placement="top">
          <p class="header-txt"> · {{fullName}}</p>
        </el-tooltip>
      </div>
      <div>
        <el-tooltip effect="dark" content="pc" placement="top">
          <el-link icon="icon-ym icon-ym-pc" :underline="false"
            :class="showType=='pc'?'selectActive':'unActive'" @click="showType='pc'" />
        </el-tooltip>
        <el-tooltip effect="dark" content="app" placement="top">
          <el-link icon="icon-ym icon-ym-mobile" :underline="false"
            :class="showType=='app'?'selectActive':'unActive'" @click="showType='app'" />
        </el-tooltip>
      </div>
      <div class="options">
        <el-tooltip effect="dark" content="撤销" placement="top">
          <el-link icon="icon-ym icon-ym-report-icon-undo" :underline="false" class="active-btn"
            @click="handleRedo('handleUndo')" />
        </el-tooltip>
        <el-tooltip effect="dark" content="重做" placement="top">
          <el-link icon="icon-ym icon-ym-report-icon-restore" :underline="false" class="active-btn"
            @click="handleRedo('handleRedo')" />
        </el-tooltip>
        <el-tooltip effect="dark" content="清空" placement="top">
          <el-link icon="icon-ym icon-ym-clean" :underline="false" @click="empty"
            class="active-btn" />
        </el-tooltip>
        <el-tooltip effect="dark" content="预览" placement="top">
          <el-link icon="icon-ym el-icon-video-play" :underline="false" @click="preview()"
            class="active-btn" />
        </el-tooltip>
        <el-divider direction='vertical' class="divider"></el-divider>
        <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
          保 存</el-button>
        <el-button @click="closeDialog()">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <div class="main" v-if="!loading">
      <PortalDesigner ref="portalDesigner" :conf="formData" :showType='showType' />
    </div>
  </el-dialog>
</template>

<script>
import { getPortalInfo, Update, Create } from '@/api/onlineDev/portal'
import PortalDesigner from './components'
export default {
  components: { PortalDesigner },
  data() {
    return {
      visible: false,
      loading: false,
      formVisible: false,
      btnLoading: false,
      formData: null,
      categoryList: [],
      showType: 'pc',
      fullName: '',
      id: '',
      key: false,
      showFullName: false,
    }
  },
  methods: {
    init(fullName, id) {
      this.visible = true
      this.loading = false
      this.formData = null
      this.fullName = fullName
      this.btnLoading = false
      this.id = id || 0
      this.showType = 'pc'
      this.$nextTick(() => {
        if (id) {
          this.loading = true
          getPortalInfo(id).then(res => {
            this.loading = false
            this.formData = JSON.parse(res.data.formData)
          }).catch(() => { this.loading = false })
        }
      })
    },
    dataFormSubmit() {
      this.$refs['portalDesigner'].getData().then(res => {
        this.btnLoading = true
        this.formData = res.formData
        let query = {
          formData: JSON.stringify(this.formData),
          id: this.id
        }
        const formMethod = this.id ? Update : Create
        formMethod(query).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.closeDialog(true)
            }
          })
        }).catch(() => { this.btnLoading = false })
      }).catch(err => {
        err.msg && this.$message.warning(err.msg)
      })
    },
    closeDialog(isRefresh) {
      this.visible = false
      this.$emit('close', isRefresh)
    },
    handleRedo(func) {
      this.$refs.portalDesigner[func](this.$refs.portalDesigner.handleData)
    },
    preview() {
      this.$refs.portalDesigner.preview()
    },
    empty() {
      this.$refs.portalDesigner.empty()
    }
  }
}
</script>
<style lang="scss" scoped>
.unActive {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdfe6;
  color: #606266 !important;
}
.selectActive {
  width: 30px;
  height: 30px;
  line-height: 30px;
  color: #fff !important;
  background: #1890ff !important;
}
.active-btn {
  >>> .icon-ym {
    font-size: 20px;
    margin-left: 15px;
  }
}
.divider {
  height: 28px;
  margin: 0 15px;
}
</style>