<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="控件栅格">
      <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
        show-tooltip />
    </el-form-item>
    <el-form-item label="标题宽度">
      <el-input-number v-model="activeData.__config__.labelWidth" placeholder="标题宽度" :min="0"
        :precision="0" controls-position="right" />
    </el-form-item>
    <el-form-item label="关联弹窗">
      <el-select v-model="activeData.relationField" placeholder="请选择关联弹窗" clearable>
        <el-option v-for="item in options" :key="item.__vModel__" :label="item.__config__.label"
          :value="item.__vModel__" />
      </el-select>
    </el-form-item>
    <el-form-item label="关联字段">
      <el-input v-model="activeData.showField" placeholder="请输入关联字段" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMixin from './mixin'
import { getDrawingList } from '@/components/Generator/utils/db'
export default {
  props: ['activeData'],
  mixins: [comMixin],
  data() {
    return {
      options: [],
      fieldOptions: [],
    }
  },
  methods: {
    getOptions() {
      const drawingList = getDrawingList() || []
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__config__ && data.__config__.jnpfKey) {
          if (data.__config__.jnpfKey === 'popupSelect' && data.__vModel__) {
            list.push(data)
          }
        }
      }
      loop(drawingList)
      this.options = list
    }
  }
}
</script>