<template>
  <el-dialog
    title="页面设置"
    :visible.sync="dialogFormVisible"
    append-to-body
    width="400px"
  >
    <el-form :model="form" :label-position="'top'">
      <el-form-item label="纸张设置" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择" @change="change">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth" v-if="form.type">
        <el-row :gutter="30">
          <el-col :span="1">宽</el-col>
          <el-col :span="9"
            ><el-input-number
              :disabled="form.type == '6' ? false : true"
              style="width: 60px"
              v-model="form.width"
              :min="1"
              :controls="false"
            ></el-input-number>
            <span style="margin-left:10px">mm</span>
          </el-col>
          <el-col :span="1">高</el-col>
          <el-col :span="9"
            ><el-input-number
              :disabled="form.type == '6' ? false : true"
              style="width: 60px"
              v-model="form.height"
              :min="1"
              :controls="false"
            ></el-input-number>
            <span style="margin-left:10px">mm</span>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="方向" :label-width="formLabelWidth">
        <el-radio-group v-model="form.direction" @input="input">
          <el-radio-button
            v-for="(item, index) in directions"
            :label="item.label"
            :key="index"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="页边距" :label-width="formLabelWidth">
        <el-row :gutter="30">
          <el-col :span="1">上</el-col>
          <el-col :span="9"
            ><el-input-number
              style="width: 60px"
              v-model="form.mt"
              :min="1"
              :controls="false"
            ></el-input-number>
            <span style="margin-left:10px">mm</span>
          </el-col>
          <el-col :span="1">下</el-col>
          <el-col :span="9"
            ><el-input-number
              style="width: 60px"
              v-model="form.mb"
              :min="1"
              :controls="false"
            ></el-input-number>
            <span style="margin-left:10px">mm</span>
          </el-col>
        </el-row>
        <el-row class="mt10" :gutter="30">
          <el-col :span="1">左</el-col>
          <el-col :span="9"
            ><el-input-number
              style="width: 60px"
              v-model="form.ml"
              :min="1"
              :controls="false"
            ></el-input-number>
            <span style="margin-left:10px">mm</span>
          </el-col>
          <el-col :span="1">右</el-col>
          <el-col :span="9"
            ><el-input-number
              style="width: 60px"
              v-model="form.mr"
              :min="1"
              :controls="false"
            ></el-input-number>
            <span style="margin-left:10px">mm</span>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      options: [
        {
          label: "A3",
          value: "1"
        },
        {
          label: "A4",
          value: "2"
        },
        {
          label: "A5",
          value: "3"
        },
        {
          label: "B3",
          value: "4"
        },
        {
          label: "B5",
          value: "5"
        },
        {
          label: "自定义",
          value: "6"
        }
      ],
      directions: [
        {
          label: "纵向"
        },
        {
          label: "横向"
        }
      ],
      dialogFormVisible: false,
      form: {
        mt: "",
        mb: "",
        ml: "",
        mr: "",
        direction: "纵向"
      },
      formLabelWidth: "120px",
      sizeMap: {
        "1": [297, 420],
        "2": [210, 297],
        "3": [148, 210],
        "4": [353, 500],
        "5": [176, 250]
      }
    };
  },
  methods: {
    input(e) {
      [this.form.width, this.form.height] = [this.form.height, this.form.width];
    },
    change(e) {
      let data = this.sizeMap[e];
      this.form.width = data[0];
      this.form.height = data[1];
    },
    confirm(){
      this.$emit('change',this.form)
      this.dialogFormVisible = false
    }
  },
  computed: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.mt10 {
  margin-top: 10px;
}
</style>
