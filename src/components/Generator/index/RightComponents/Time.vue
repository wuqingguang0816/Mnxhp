<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="标题提示">
      <el-input v-model="activeData.__config__.tipLabel" placeholder="请输入标题提示" />
    </el-form-item>
    <el-form-item label="占位提示">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item label="格式">
      <el-select v-model="activeData.format" placeholder="请选择时间类型" @change="dateTypeChange">
        <el-option v-for="(item, index) in formatOptions" :key="index" :label="item.label"
          :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="默认值">
      <el-time-picker v-model="activeData.__config__.defaultValue"
        :disabled="activeData.__config__.defaultCurrent" placeholder="选择默认值" clearable
        :value-format="activeData['value-format']" :format="activeData.format">
      </el-time-picker>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox label="true" v-model="activeData.__config__.defaultCurrent"
        @change="defaultCurrentChange" style="float: right;margin-right: 30px;">默认为当前系统时间
      </el-checkbox>
    </el-form-item>
    <!-- <el-form-item label="时间段">
      <el-input v-model="activeData['picker-options'].selectableRange" placeholder="请输入时间段" />
    </el-form-item> -->
    <el-divider>规则</el-divider>
    <el-form-item label="开始时间">
      <el-switch v-model="activeData.__config__.startTimeRule" @change="startTimeRuleChange" />
    </el-form-item>
    <template v-if="activeData.__config__.startTimeRule">
      <jnpf-form-tip-item label="类型" tip-label="系统会限制填写者填写此字段的当天起始日期范围（包含该日期）。该功能不做有效性验证，请自行保证。">
        <el-select v-model="activeData.__config__.startTimeType" placeholder="请选择类型"
          @change="startType">
          <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
            :value="item.value" />
        </el-select>
      </jnpf-form-tip-item>
      <el-form-item label="" v-if="activeData.__config__.startTimeType==1">
        <el-time-picker v-model="activeData.__config__.startTimeValue"
          :picker-options="activeData['picker-options']" placeholder="选择默认值" clearable
          :value-format="activeData['value-format']" :format="activeData.format">
        </el-time-picker>
      </el-form-item>
      <el-form-item label=""
        v-else-if="activeData.__config__.startTimeType==4 ||activeData.__config__.startTimeType==5">
        <el-input type="number" v-model="activeData.__config__.startTimeValue" placeholder="请输入"
          min="1">
          <el-select slot="append" v-model="activeData.__config__.startTimeTarget"
            style="width: 85px;" placeholder="请选择" @change="startTimeTarget">
            <el-option v-for="(item, index) in targetOptions" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="" v-else-if="activeData.__config__.startTimeType==2">
        <el-select v-model="activeData.__config__.startRelationField" placeholder="请选择关联日期字段">
          <el-option v-for="(item,i) in formFieldsOptions" :key="i" :label="item.realLabel"
            :value="item.realVModel" />
        </el-select>
      </el-form-item>
    </template>
    <el-form-item label="结束时间">
      <el-switch v-model="activeData.__config__.endTimeRule" @change="endTimeRuleChange" />
    </el-form-item>
    <template v-if="activeData.__config__.endTimeRule">
      <jnpf-form-tip-item label="类型" tip-label="系统会限制填写者填写此字段的当天起始日期范围（包含该日期）。该功能不做有效性验证，请自行保证。">
        <el-select v-model="activeData.__config__.endTimeType" placeholder="请选择类型"
          @change="endType">
          <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
            :value="item.value" />
        </el-select>
      </jnpf-form-tip-item>
      <el-form-item label="" v-if="activeData.__config__.endTimeType==1">
        <el-time-picker v-model="activeData.__config__.endTimeValue" placeholder="请选择时间" clearable
          :value-format="activeData['value-format']" :format="activeData.format">
        </el-time-picker>
      </el-form-item>
      <el-form-item label=""
        v-else-if="activeData.__config__.endTimeType==4 ||activeData.__config__.endTimeType==5">
        <el-input type="number" v-model="activeData.__config__.endTimeValue" placeholder="请输入"
          min="1">
          <el-select slot="append" v-model="activeData.__config__.endTimeTarget"
            @change="endTimeTarget" style="width: 85px;" placeholder="请选择">
            <el-option v-for="(item, index) in targetOptions" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="" v-else-if="activeData.__config__.endTimeType==2">
        <el-select v-model="activeData.__config__.endRelationField" placeholder="请选择关联日期字段">
          <el-option v-for="(item,i) in formFieldsOptions" :key="i" :label="item.realLabel"
            :value="item.realVModel" />
        </el-select>
      </el-form-item>
    </template>
    <!-- <el-form-item label="时间格式">
      <el-input :value="activeData.format" placeholder="请输入时间格式" @input="setTimeValue($event)" />
    </el-form-item> -->
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="activeData.readonly" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMixin from './mixin';
import { getDrawingList } from '@/components/Generator/utils/db'
export default {
  props: ['activeData'],
  mixins: [comMixin],
  data() {
    return {
      formatOptions: [
        {
          label: 'HH:mm:ss',
          value: 'HH:mm:ss'
        },
        {
          label: 'HH:mm',
          value: 'HH:mm'
        }
      ],
      typeOptions: [
        {
          label: '特定时间',
          value: 1
        },
        {
          label: '表单字段',
          value: 2
        },
        {
          label: '填写当前时间',
          value: 3
        },
        {
          label: '当前时间前',
          value: 4
        },
        {
          label: '当前时间后',
          value: 5
        },
      ],
    }
  },
  watch: {
    'activeData.__config__.startTimeValue'(val) {
      if (this.activeData.__config__.startTimeType == 4 || this.activeData.__config__.startTimeType == 5) {
        this.getStartTime()
      } else if (this.activeData.__config__.startTimeType == 1) {
        return this.activeData.startTime = val
      }
    },
    'activeData.__config__.endTimeValue'(val) {
      if (this.activeData.__config__.endTimeType == 4 || this.activeData.__config__.endTimeType == 5) {
        this.getEndTime()
      } else if (this.activeData.__config__.endTimeType == 1) {
        return this.activeData.endTime = val
      }
    },
    'activeData.__config__.startTimeRule'(val) {
      if (!val) {
        this.activeData.startRelationField = ''
        this.activeData.startTime = ''
        this.activeData.__config__.startTimeValue = ''
      }
    },
    'activeData.__config__.endTimeRule'(val) {
      if (!val) {
        this.activeData.endRelationField = ''
        this.activeData.endTime = ''
        this.activeData.__config__.endTimeValue = ''
      }
    }
  },
  created() {
    this.getTargetOptions()
  },
  computed: {
    formFieldsOptions() {
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && this.isIncludesTable(data) && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__ && data.__config__.jnpfKey === 'time' && data.__vModel__ !== this.activeData.__vModel__) {
          const isTableChild = parent && parent.__config__ && parent.__config__.jnpfKey === 'table'
          list.push({
            realVModel: isTableChild ? parent.__vModel__ + '-' + data.__vModel__ : data.__vModel__,
            realLabel: isTableChild ? parent.__config__.label + '-' + data.__config__.label : data.__config__.label,
            ...data
          })
        }
      }
      loop(getDrawingList())
      return list
    }
  },
  methods: {
    endTimeRuleChange() {
      if (!this.activeData.__config__.endTimeRule) {
        return this.activeData.endRelationField = ''
      } else {
        return this.activeData.__config__.endTimeType = 1
      }
    },
    startTimeRuleChange() {
      if (!this.activeData.__config__.startTimeRule) {
        return this.activeData.startRelationField = ''
      } else {
        return this.activeData.__config__.startTimeType = 1
      }
    },
    endTimeTarget(val) {
      this.getEndTime()
    },
    startTimeTarget(val) {
      this.getStartTime()
    },
    isIncludesTable(data) {
      if ((!data.__config__.layout || data.__config__.layout === 'rowFormItem') && data.__config__.jnpfKey !== 'table') return true
      if (this.activeData.__config__.isSubTable) return this.activeData.__config__.parentVModel === data.__vModel__
      return data.__config__.jnpfKey !== 'table'
    },
    getBeforeTime(type, val) {
      let date = new Date()
      if (type == 1) {
        date.setHours(Number(date.getHours()) - Number(val))
      } else if (type == 2) {
        date.setMinutes(Number(date.getMinutes()) - Number(val))
      } else if (type == 3) {
        date.setSeconds(Number(date.getSeconds()) - Number(val))
      }
      return date
    },
    getLaterTime(type, val) {
      let date = new Date()
      if (type == 1) {
        date.setHours(Number(date.getHours()) + Number(val))
      } else if (type == 2) {
        date.setMinutes(Number(date.getMinutes()) + Number(val))
      } else if (type == 3) {
        date.setSeconds(Number(date.getSeconds()) + Number(val))
      }
      return date
    },
    getStartTime() {
      if (this.activeData.__config__.startTimeType == 4) {
        let item = this.getBeforeTime(this.activeData.__config__.startTimeTarget, this.activeData.__config__.startTimeValue)
        return this.activeData.startTime = this.jnpf.toDate(item, 'HH:mm:ss')
      } else {
        let item = this.getLaterTime(this.activeData.__config__.startTimeTarget, this.activeData.__config__.startTimeValue)
        return this.activeData.startTime = this.jnpf.toDate(item, 'HH:mm:ss')
      }
    },
    getEndTime() {
      if (this.activeData.__config__.endTimeType == 4) {
        let item = this.getBeforeTime(this.activeData.__config__.endTimeTarget, this.activeData.__config__.endTimeValue)
        return this.activeData.endTime = this.jnpf.toDate(item, 'HH:mm:ss')
      } else {
        let item = this.getLaterTime(this.activeData.__config__.endTimeTarget, this.activeData.__config__.endTimeValue)
        return this.activeData.endTime = this.jnpf.toDate(item, 'HH:mm:ss')
      }
    },
    dateTypeChange(val) {
      this.getTargetOptions()
    },
    startType(val) {
      this.activeData.startTime = null
      this.activeData.startRelationField = ''
      if (val == 3) {
        this.activeData.__config__.startTimeValue = this.jnpf.toDate(new Date(), 'HH:mm:ss')
        return this.activeData.startTime = this.activeData.__config__.startTimeValue
      } else if (val == 4 || val == 5) {
        this.activeData.__config__.startTimeValue = 1
        this.activeData.__config__.startTimeTarget = 1
        return this.activeData.startTime = this.jnpf.toDate(this.getBeforeTime(1, 1), 'HH:mm:ss')
      } else if (val == 2) {
        this.activeData.__config__.startTimeValue = ''
      } else {
        this.activeData.__config__.startTimeValue = ''
      }
    },
    endType(val) {
      this.activeData.endTime = null
      this.activeData.endRelationField = ''
      if (val == 3) {
        this.activeData.__config__.endTimeValue = this.jnpf.toDate(new Date(), 'HH:mm:ss')
        return this.activeData.endTime = this.activeData.__config__.endTimeValue
      } else if (val == 4 || val == 5) {
        this.activeData.__config__.endTimeValue = 1
        this.activeData.__config__.endTimeTarget = 1
        return this.activeData.endTime = this.jnpf.toDate(this.getLaterTime(1, 1), 'HH:mm:ss')
      } else {
        this.activeData.__config__.endTimeValue = ''
      }
    },
    getTargetOptions() {
      if (this.activeData.format === 'HH:mm') {
        this.targetOptions = [{ label: '时', value: 1 }, { label: '分', value: 2 }]
      } else {
        this.targetOptions = [{ label: '时', value: 1 }, { label: '分', value: 2 }, { label: '秒', value: 3 }]
      }
    },
    defaultCurrentChange(val) {
      if (val) this.activeData.__config__.defaultValue = this.jnpf.toDate(new Date(), this.activeData.format)
    },
  }
}
</script>