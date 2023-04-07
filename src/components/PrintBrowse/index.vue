<template>
  <el-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-on="$listeners"
    @open="onOpen"
    fullscreen
    lock-scroll
    class="JNPF-full-dialog"
    :show-close="false"
    :modal="false"
    append-to-body
  >
    <div class="JNPF-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/jnpf.png" class="header-logo" />
        <p class="header-txt">· 打印预览</p>
      </div>
      <div class="options">
        <el-button type="primary" size="small" @click="word">下 载</el-button>
        <el-button type="primary" size="small" @click="print">打 印</el-button>
        <el-button @click="closeDialog()">{{ $t("common.cancelButton") }}</el-button>
      </div>
    </div>
    <div class="main" v-loading="loading">
      <div ref="tsPrint" class="print-content" v-html="printTemplate" />
    </div>
  </el-dialog>
</template>

<script>
import printOptionApi from "./printMinxin.js";
import { getData } from "@/api/system/printDev";
export default {
  mixins: [printOptionApi],
  props: ["id", "formId", "fullName"],

  data() {
    return {};
  },
  methods: {
    onOpen() {
      if (!this.id) return;
      this.printTemplate = "";
      this.data = {};
      this.loading = true;
      let query = {
        id: this.id,
        formId: this.formId,
      };
      getData(query).then(async(res) => {
        if (!res.data || !res.data.printData) return (this.loading = false);
        let dom = this.$refs["tsPrint"];
        this.printTemplate = await this.handleData(res.data, dom);
        
        this.loading = false
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.print-content {
  background: white;
  padding: 40px 30px;
  margin: 0 auto;
  border-radius: 4px;
  width: 776px;
  height: 100%;
  overflow: auto;
}
</style>
