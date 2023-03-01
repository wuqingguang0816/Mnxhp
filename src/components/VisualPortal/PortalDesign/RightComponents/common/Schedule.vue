<template>
  <el-collapse-item title="日程设置" name="14">
    <el-form-item label="默认试图">
      <el-select v-model="activeData.defaultView" placeholder="请选择" @change="renderKeyChange">
        <el-option v-for="item in defaultViewOptions" :key="item.value" :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="显示农历">
      <el-switch v-model="activeData.showLunarCalendar">
      </el-switch>
    </el-form-item>
    <el-form-item label="周第一天">
      <el-select v-model="activeData.firstDay" placeholder="请选择">
        <el-option v-for="item in firstDayOptions" :key="item.value" :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <refresh :refresh="activeData.refresh" />
  </el-collapse-item>
</template>
<script>
import refresh from '../common/refresh'
export default {
  components: { refresh },
  props: ['activeData'],
  data() {
    return {
      defaultViewOptions: [{
        value: 'dayGridMonth',
        label: '月'
      }, {
        value: 'timeGridWeek',
        label: '周'
      }, {
        value: 'timeGridDay',
        label: '日'
      }],
      firstDayOptions: [{
        value: 1,
        label: '一'
      },
      {
        value: 2,
        label: '二'
      },
      {
        value: 3,
        label: '三'
      },
      {
        value: 4,
        label: '四'
      },
      {
        value: 5,
        label: '五'
      },
      {
        value: 6,
        label: '六'
      },
      {
        value: 0,
        label: '日'
      }],
    }
  },
  methods: {
    renderKeyChange() {
      this.activeData.renderKey = +new Date()
    },
  }
}
</script>