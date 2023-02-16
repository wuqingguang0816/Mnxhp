<template>
  <el-collapse-item title="提示语设置" name="8">
    <el-form-item label="显示">
      <el-switch v-model="activeData.option.tooltipShow" />
    </el-form-item>
    <template v-if="activeData.option.tooltipShow">
      <el-form-item label="字体大小">
        <el-input-number v-model="activeData.option.tooltipTextStyleFontSize"
          controls-position="right" :min="12" :max="25" />
      </el-form-item>
      <el-form-item label="字体加粗">
        <el-switch v-model="activeData.option.tooltipTextStyleFontWeight" />
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="activeData.option.tooltipTextStyleColor" />
      </el-form-item>
      <el-form-item label="背景色">
        <el-color-picker v-model="activeData.option.tooltipBgColor" />
      </el-form-item>
    </template>
  </el-collapse-item>
</template>
<script>
export default {
  props: ['activeData'],
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>