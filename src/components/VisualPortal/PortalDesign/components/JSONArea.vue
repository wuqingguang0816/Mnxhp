<template>
  <el-dialog title="数据设置" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px" append-to-body>
    <JSONEditor v-model="responseData" mode="json" class="preview" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="closeDialog()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import JSONEditor from '@/components/JsonEditor'

export default {
  components: { JSONEditor },
  data() {
    return {
      visible: false,
      responseData: ''
    }
  },
  methods: {
    init(option) {
      this.visible = true
      this.responseData = JSON.stringify(option, null, 2)
    },
    closeDialog() {
      this.visible = false
      this.$emit('refresh', this.responseData)
    },
  }
}
</script>
<style lang="scss" scoped>
.JNPF-dialog_center {
  >>> .el-dialog__body {
    padding-bottom: 20px !important;
  }
}
>>> .preview {
  border: 1px solid #dcdfe6;
}
>>> .json-editor {
  height: 430px;
  overflow: auto;
}
</style>