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
      <el-date-picker v-model="activeData.__config__.defaultValue" :type="type" placeholder="选择默认值"
        :value-format="activeData['value-format']" :format="activeData.format"
        :disabled="activeData.__config__.defaultCurrent">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="">
      <el-checkbox label="true" v-model="activeData.__config__.defaultCurrent"
        @change="defaultCurrentChange" style="float: right;margin-right: 30px;">默认为当前系统时间
      </el-checkbox>
    </el-form-item>
    <el-divider>规则</el-divider>
    <el-form-item label="开始时间">
      <el-switch v-model="activeData.__config__.startTimeRule" />
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
        <el-date-picker v-model="activeData.__config__.startTimeValue" :type="type"
          placeholder="请选择时间" :value-format="activeData['value-format']"
          :format="activeData.format">
        </el-date-picker>
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
        <el-select v-model="activeData.startRelationField" placeholder="请选择关联日期字段"
          @change="onStartTypeChange">
          <el-option v-for="(item,i) in fieldsOptions" :key="i" :label="item.realLabel"
            :value="item.realVModel" />
        </el-select>
      </el-form-item>
    </template>
    <el-form-item label="结束时间">
      <el-switch v-model="activeData.endTimeType" />
    </el-form-item>
    <template v-if="activeData.endTimeType">
      <jnpf-form-tip-item label="类型" tip-label="系统会限制填写者填写此字段的当天起始日期范围（包含该日期）。该功能不做有效性验证，请自行保证。">
        <el-select v-model="activeData.__config__.endType" placeholder="请选择类型" @change="endType">
          <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
            :value="item.value" />
        </el-select>
      </jnpf-form-tip-item>
      <el-form-item label="" v-if="activeData.__config__.endType==1">
        <el-date-picker v-model="activeData.__config__.endTimeValue" :type="type"
          placeholder="请选择时间" :value-format="activeData['value-format']"
          :format="activeData.format">
        </el-date-picker>
      </el-form-item>
      <el-form-item label=""
        v-else-if="activeData.__config__.endType==4 ||activeData.__config__.endType==5">
        <el-input type="number" v-model="activeData.__config__.endTimeValue" placeholder="请输入"
          min="1">
          <el-select slot="append" v-model="activeData.__config__.endTimeTarget"
            style="width: 85px;" placeholder="请选择">
            <el-option v-for="(item, index) in targetOptions" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="" v-else-if="activeData.__config__.endType==2">
        <el-select v-model="activeData.endRelationField" placeholder="请选择关联日期字段"
          @change="onEndTypeChange">
          <el-option v-for="(item,i) in fieldsOptions" :key="i" :label="item.realLabel"
            :value="item.realVModel" />
        </el-select>
      </el-form-item>
    </template>
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
      //yyyy-MM-dd HH:mm:ss
      formatOptions: [
        {
          label: 'yyyy',
          value: 'yyyy'
        },
        {
          label: 'yyyy-MM',
          value: 'yyyy-MM'
        },
        {
          label: 'yyyy-MM-dd',
          value: 'yyyy-MM-dd'
        },
        {
          label: 'yyyy-MM-dd HH:mm',
          value: 'yyyy-MM-dd HH:mm'
        },
        {
          label: 'yyyy-MM-dd HH:mm:ss',
          value: 'yyyy-MM-dd HH:mm:ss'
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
      type: 'date',
      targetOptions: [],
      fieldsOptions: [],
    }
  },
  watch: {
    // value(val) {
    //   this.setDefault()
    // },
    'activeData.__config__.startTimeValue'(val) {
      if (this.activeData.__config__.startTimeType == 4 || this.activeData.__config__.startTimeType == 5) {
        if (this.activeData.__config__.startTimeTarget == 2 || this.activeData.__config__.startTimeTarget == 1) {
          this.getStartDateTime()
        } else if (this.activeData.__config__.startTimeTarget == 3) {
          this.getStartTimeValue()
        } else {
          this.getStartTime()
        }
      } else if (this.activeData.__config__.startTimeType == 1) {
        return this.activeData.startTime = val
      }

    },
    'activeData.__config__.endTimeValue'(val) {
      if (this.activeData.__config__.endType == 4 || this.activeData.__config__.endType == 5) {
        if (this.activeData.__config__.endTimeTarget == 2 || this.activeData.__config__.endTimeTarget == 1) {
          this.getEndDateTime()
        } else if (this.activeData.__config__.endTimeTarget == 3) {
          this.getEndTimeValue()
        } else {
          this.getEndTime()
        }
      } else if (this.activeData.__config__.endType == 1) {
        return this.activeData.endTime = val
      }
    },
  },
  created() {
    this.getTargetOptions()
    this.formFieldsOptions()
  },
  methods: {
    formFieldsOptions() {
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && this.isIncludesTable(data) && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__ && data.__config__.jnpfKey === 'date' && data.__vModel__ !== this.activeData.__vModel__) {
          const isTableChild = parent && parent.__config__ && parent.__config__.jnpfKey === 'table'
          list.push({
            realVModel: isTableChild ? parent.__vModel__ + '-' + data.__vModel__ : data.__vModel__,
            realLabel: isTableChild ? parent.__config__.label + '-' + data.__config__.label : data.__config__.label,
            ...data
          })
        }
      }
      loop(getDrawingList())
      this.fieldsOptions = list || []
    },
    endTimeTarget(val) {
      if (val == 2 || val == 1) {
        this.getEndDateTime()
      } else if (val == 3) {
        this.getEndTimeValue()
      } else {
        this.getEndTime()
      }
    },
    startTimeTarget(val) {
      if (val == 2 || val == 1) {
        this.getStartDateTime()
      } else if (val == 3) {
        this.getStartTimeValue()
      } else {
        this.getStartTime()
      }
    },
    onStartTypeChange(val) {
      let item = this.fieldsOptions.filter(o => o.realVModel === val)[0]
      if (item) return this.activeData.startTime = item.__config__.defaultValue || ''
      console.log(this.activeData.startTime, item.__config__.defaultValue)
    },
    onEndTypeChange(val) {
      let item = this.fieldsOptions.filter(o => o.realVModel === val)[0]
      if (item) return this.activeData.endTime = item.__config__.defaultValue || ''
    },
    isIncludesTable(data) {
      if ((!data.__config__.layout || data.__config__.layout === 'rowFormItem') && data.__config__.jnpfKey !== 'table') return true
      if (this.activeData.__config__.isSubTable) return this.activeData.__config__.parentVModel === data.__vModel__
      return data.__config__.jnpfKey !== 'table'
    },
    getBeforeTime(type, val) {
      let date = new Date()
      if (type == 4) {
        date.setHours(date.getHours() - val)
      } else if (type == 5) {
        date.setMinutes(date.getMinutes() - val)
      } else if (type == 6) {
        date.getSeconds(date.getSeconds() - val)
      }
      return date.getTime()
    },
    getLaterTime(type, val) {
      let date = new Date()
      if (type == 4) {
        date.setHours(date.getHours() + val)
      } else if (type == 5) {
        date.setMinutes(date.getMinutes() + val)
      } else if (type == 6) {
        date.getSeconds(date.getSeconds() + val)
      }
      return date.getTime()
    },
    getDateDay(Target, type, monthNum) {
      let date = new Date()
      let year = date.getFullYear() //获取当前日期的年份
      let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) //获取当前日期的月份
      let day = date.getDate() //获取当前日期的日
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      let days = new Date(year, month, 0)
      days = days.getDate(); //获取当前日期中的月的天数
      let year2 = year;
      let month2;
      if (Target == 2) {
        if (type == 5) {
          month2 = parseInt(month) + parseInt(monthNum)
          if (month2 > 12) {
            year2 = parseInt(year2) + parseInt((parseInt(month2) / 12 == 0 ? 1 : parseInt(month2) / 12));
            month2 = parseInt(month2) % 12;
          }
        } else if (type == 4) {
          month2 = parseInt(month) - monthNum;
          if (month2 <= 0) {
            let absM = Math.abs(month2);
            year2 = parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
            month2 = 12 - (absM % 12);
          }
        }
      } else if (Target == 1) {
        month2 = parseInt(month)
        if (type == 5) {
          year2 = parseInt(year) + parseInt(monthNum)
        } else if (type == 4) {
          year2 = parseInt(year) - parseInt(monthNum)
        }
      }
      let day2 = day;
      let days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      let t2 = year2 + '-' + month2 + '-' + day2 + ' ' + hours + ':' + minutes + ':' + seconds;
      return t2;
    },
    getLaterData(days) {
      let date = new Date();
      date.setDate(date.getDate() + days);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return date.getFullYear() + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2) + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    getBeforeData(num) {
      let dateArray = []
      //获取今天日期
      let myDate = new Date()
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      let today = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + "-" + myDate.getDate();
      myDate.setDate(myDate.getDate() - num)
      let dateTemp;  // 临时日期数据
      let flag = 1;
      for (let i = 0; i < num; i++) {
        dateTemp = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + "-" + myDate.getDate()
        dateArray.push({
          date: dateTemp
        })
        myDate.setDate(myDate.getDate() + flag);
      }
      dateArray.push({
        date: today
      })
      let arr = []
      let newArr = []
      dateArray.forEach(item => {
        arr.push(item.date.split('-'))
      })
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] < 10) {
          arr[i][1] = "0" + arr[i][1]
        }
        if (arr[i][2] < 10) {
          arr[i][2] = "0" + arr[i][2]
        }
      }
      for (let j = 0; j < arr.length; j++) {
        newArr.push(arr[j].join("-"))
      }
      return newArr[0] + ' ' + hours + ':' + minutes + ':' + seconds
    },
    getStartDateTime() {
      let previousDate = '';
      previousDate = this.getDateDay(this.activeData.__config__.startTimeTarget, this.activeData.__config__.startTimeType, this.activeData.__config__.startTimeValue)
      console.log(new Date(previousDate).getTime())
      return this.activeData.startTime = new Date(previousDate).getTime()
    },
    getEndDateTime() {
      let previousDate = '';
      previousDate = this.getDateDay(this.activeData.__config__.endTimeTarget, this.activeData.__config__.endType, this.activeData.__config__.endTimeValue)
      console.log(previousDate)
      return this.activeData.endTime = new Date(previousDate).getTime()
    },
    getStartTime() {
      if (this.activeData.__config__.startTimeType == 4) {
        return this.activeData.startTime = this.getBeforeTime(this.activeData.__config__.startTimeTarget, this.activeData.__config__.startTimeValue)
      } else {
        return this.activeData.startTime = this.getLaterTime(this.activeData.__config__.startTimeTarget, this.activeData.__config__.startTimeValue)
      }
    },
    getEndTime() {
      if (this.activeData.__config__.endType == 4) {
        return this.activeData.endTime = this.getBeforeTime(this.activeData.__config__.endTimeTarget, this.activeData.__config__.endTimeValue)
      } else {
        return this.activeData.endTime = this.getLaterTime(this.activeData.__config__.endTimeTarget, this.activeData.__config__.endTimeValue)
      }
    },
    getStartTimeValue() {
      let num = this.activeData.__config__.startTimeValue
      let previousDate = ''
      if (this.activeData.__config__.startTimeType == 4) {
        previousDate = this.getBeforeData(num)
        return this.activeData.startTime = new Date(previousDate).getTime()
      } else {
        previousDate = this.getLaterData(num)
        return this.activeData.startTime = new Date(previousDate).getTime()
      }
    },
    getEndTimeValue() {
      let num = this.activeData.__config__.endTimeValue
      let previousDate = ''
      if (this.activeData.__config__.endType == 4) {
        previousDate = this.getBeforeData(num)
        return this.activeData.endTime = new Date(previousDate).getTime()
      } else {
        previousDate = this.getLaterData(num)
        return this.activeData.endTime = new Date(previousDate).getTime()
      }
    },
    dateTypeChange(val) {
      this.getTargetOptions()
    },
    startType(val) {
      this.activeData.startTime = null
      if (val == 3) {
        this.activeData.__config__.startTimeValue = new Date().getTime()
        return this.activeData.startTime = this.activeData.__config__.startTimeValue
      } else if (val == 4 || val == 5) {
        this.activeData.__config__.startTimeValue = 1
        this.activeData.__config__.startTimeTarget = 1
        this.getStartDateTime()
      } else if (val == 2) {
        this.activeData.__config__.startTimeValue = ''
        this.formFieldsOptions()
      } else {
        this.activeData.__config__.startTimeValue = ''
      }
    },
    endType(val) {
      this.activeData.endTime = null
      if (val == 3) {
        this.activeData.__config__.endTimeValue = new Date().getTime()
        return this.activeData.endTime = this.activeData.__config__.endTimeValue
      } else if (val == 4 || val == 5) {
        this.activeData.__config__.endTimeValue = 1
        this.activeData.__config__.endTimeTarget = 1
        this.getEndDateTime()
      } else {
        this.activeData.__config__.endTimeValue = ''
      }
    },
    getTargetOptions() {
      if (this.activeData.format === 'yyyy') {
        this.targetOptions = [{ label: '年', value: 1 }]
      } else if (this.activeData.format === 'yyyy-MM') {
        this.targetOptions = [{ label: '年', value: 1 }, { label: '月', value: 2 }]
      } else if (this.activeData.format === 'yyyy-MM-dd') {
        this.targetOptions = [{ label: '年', value: 1 }, { label: '月', value: 2 }, { label: '日', value: 3 }]
      } else if (this.activeData.format === 'yyyy-MM-dd HH:mm') {
        this.targetOptions = [{ label: '年', value: 1 }, { label: '月', value: 2 }, { label: '日', value: 3 }, { label: '时', value: 4 }, { label: '分', value: 5 }]
      } else {
        this.targetOptions = [{ label: '年', value: 1 }, { label: '月', value: 2 }, { label: '日', value: 3 }, { label: '时', value: 4 }, { label: '分', value: 5 }, { label: '秒', value: 6 }]
      }
      if (this.activeData.format === 'yyyy' || this.activeData.format === 'yyyy-MM' || this.activeData.format === 'yyyy-MM-dd') return this.type = 'date'
      return this.type = 'datetime'
    },
    defaultCurrentChange(val) {
      if (val) this.activeData.__config__.defaultValue = new Date().getTime()
    }
  }
}
</script>
