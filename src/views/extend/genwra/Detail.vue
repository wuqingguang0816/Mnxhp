<template>
  <el-dialog
    title="详情"
    :close-on-click-modal="false"
    append-to-body
    :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center"
    lock-scroll
    width="600px"
  >
    <el-row :gutter="15" class="">
      <el-form
        ref="elForm"
        :model="dataForm"
        size="small"
        label-width="100px"
        label-position="right"
      >
        <template v-if="!loading">
          <el-col :span="24">
            <el-form-item label="名字" prop="F_name">
              <p>{{ dataForm.F_name }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="年龄" prop="F_age">
              <p>{{ dataForm.F_age }}</p>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false"> 取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import request from "@/utils/request";
import PrintBrowse from "@/components/PrintBrowse";
import { getConfigData } from "@/api/onlineDev/visualDev";
import jnpf from "@/utils/jnpf";
import Detail from "@/views/basic/dynamicModel/list/detail";
export default {
  components: { PrintBrowse, Detail },
  props: [],
  data() {
    return {
      visible: false,
      detailVisible: false,
      loading: false,
      printBrowseVisible: false,
      printId: "",
      dataForm: {
        id: "",
        F_name: "",
        F_age: ""
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toDetail(defaultValue, modelId) {
      if (!defaultValue) return;
      console.log(modelId);
      getConfigData(modelId).then(res => {
        if (!res.data || !res.data.formData) return;
        let formData = JSON.parse(res.data.formData);
        formData.popupType = "general";
        this.detailVisible = true;
        this.$nextTick(() => {
          this.$refs.Detail.init(formData, modelId, defaultValue);
        });
      });
    },
    dataInfo(dataAll) {
      let _dataAll = dataAll;
      this.dataForm = _dataAll;
    },

    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        if (this.dataForm.id) {
          this.loading = true;
          request({
            url: "/api/example/GenWra/detail/" + this.dataForm.id,
            method: "get"
          }).then(res => {
            this.dataInfo(res.data);
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>
