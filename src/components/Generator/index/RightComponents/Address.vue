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
      <el-radio-group v-model="activeData.level" @change="levelChange" class="level">
        <el-radio :label="0">省</el-radio>
        <el-radio :label="1">省市</el-radio>
        <el-radio :label="2">省市区</el-radio>
        <el-radio :label="3">省市区-街道</el-radio>
      </el-radio-group>
    </el-form-item>
    <jnpf-form-tip-item label="显示路径" tip-label="格式选择省市（xx省/xx市），启用显示xx省/xx市；禁用显示xx市。">
      <el-switch v-model="activeData.showPath" />
    </jnpf-form-tip-item>
    <el-form-item label="可选范围">
      <el-select v-model="activeData.selectType" placeholder="请选择" @change="onTypeChange">
        <el-option v-for="item in addressSelectTypeOptions" :key="item.value" :label="item.label"
          :value="item.value" />
      </el-select>
      <template v-if="['address','cities'].includes(activeData.selectType)">
        <el-radio-group v-model="activeData.relationField" class="relation-radio">
          <el-radio :label="item.realVModel" v-for="(item,i) in formFieldsOptions" :key="i">
            {{item.realLabel}}</el-radio>
        </el-radio-group>
      </template>
    </el-form-item>
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="能否多选">
      <el-switch v-model="activeData.multiple" @change="levelChange" />
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
const selectTypeOptions = [{
  value: 'all',
  label: '全部'
}]
const addressSelectTypeOptions = [
  ...selectTypeOptions,
  {
    value: 'address',
    label: '省联动'
  },
  {
    value: 'cities',
    label: '省市联动'
  },
]
export default {
  props: ['activeData'],
  mixins: [comMixin],
  data() {
    return {
      addressSelectTypeOptions,
      key: ''
    }
  },
  computed: {
    formFieldsOptions() {
      if (this.activeData.selectType === 'all') return []
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && this.isIncludesTable(data) && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__ && data.__config__.jnpfKey === 'address' && this.isIncludesAddress(data) && data.__vModel__ !== this.activeData.__vModel__) {
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
  created() { },
  methods: {
    onTypeChange() {
      this.$set(this.activeData.__config__, 'defaultValue', this.activeData.multiple ? [] : '')
      this.activeData.ableAddressIds = []
      this.activeData.relationField = ''
      if (this.activeData.selectType != 'all') {
        this.$set(this.activeData.__config__, 'defaultValue', null)
      }
      this.activeData.__config__.renderKey = +new Date()
      this.key = +new Date()
    },
    isIncludesTable(data) {
      if ((!data.__config__.layout || data.__config__.layout === 'rowFormItem') && data.__config__.jnpfKey !== 'table') return true
      if (this.activeData.__config__.isSubTable) return this.activeData.__config__.parentVModel === data.__vModel__
      return data.__config__.jnpfKey !== 'table'
    },
    isIncludesAddress(data) {
      if (this.activeData.selectType == 'address' && data.level == 0) return true
      if (this.activeData.selectType == 'cities' && data.level == 1) return true
      return false
    },
    levelChange() {
      this.$set(this.activeData.__config__, 'defaultValue', [])
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
      this.key = +new Date()
    }
  }
}
</script>
<style lang="scss">
.level {
  .el-radio {
    display: block;
    margin: 10px 0;
  }
}
.relation-radio {
  .el-radio {
    margin: 10px 0 0;
    display: block;
  }
}
</style>