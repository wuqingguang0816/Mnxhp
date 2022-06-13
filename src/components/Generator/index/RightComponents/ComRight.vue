<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="占位提示" v-if="activeData.__config__.jnpfKey !=='editor'">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item label="可选范围"
      v-if="['depSelect','posSelect','userSelect'].includes(activeData.__config__.jnpfKey)">
      <el-select v-model="activeData.selectType" placeholder="请选择" @change="onTypeChange">
        <el-option v-for="item in selectTypeOptions" :key="item.value" :label="item.label"
          :value="item.value" />
      </el-select>
      <template v-if="activeData.selectType === 'custom'">
        <template v-if="activeData.__config__.jnpfKey==='depSelect'">
          <org-Select v-model="activeData.ableDepIds" title="添加部门" type="department"
            class="mt-10" />
        </template>
        <template v-if="activeData.__config__.jnpfKey==='posSelect'">
          <org-Select v-model="activeData.ableDepIds" title="添加部门" type="department"
            class="mt-10" />
          <org-Select v-model="activeData.ablePosIds" title="添加岗位" type="position" class="mt-10" />
        </template>
        <template v-if="activeData.__config__.jnpfKey==='userSelect'">
          <org-Select v-model="activeData.ableDepIds" title="添加部门" type="department"
            class="mt-10" />
          <org-Select v-model="activeData.ablePosIds" title="添加岗位" type="position" class="mt-10" />
          <org-Select v-model="activeData.ableUserIds" title="添加用户" type="user" class="mt-10" />
          <org-Select v-model="activeData.ableRoleIds" title="添加角色" type="role" class="mt-10" />
          <org-Select v-model="activeData.ableGroupIds" title="添加分组" type="group" class="mt-10" />
        </template>
      </template>
    </el-form-item>
    <el-form-item label="默认值">
      <com-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='comSelect'" :multiple="activeData.multiple"
        :key="key" />
      <dep-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='depSelect'" :multiple="activeData.multiple"
        :key="key" :selectType="activeData.selectType" :ableDepIds="activeData.ableDepIds" />
      <pos-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='posSelect'" :multiple="activeData.multiple"
        :key="key" :selectType="activeData.selectType" :ableDepIds="activeData.ableDepIds"
        :ablePosIds="activeData.ablePosIds" />
      <user-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='userSelect'" :multiple="activeData.multiple"
        :key="key" :selectType="activeData.selectType" :ableDepIds="activeData.ableDepIds"
        :ablePosIds="activeData.ablePosIds" :ableUserIds="activeData.ableUserIds"
        :ableRoleIds="activeData.ableRoleIds" :ableGroupIds="activeData.ableGroupIds" />
      <group-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='groupSelect'" :multiple="activeData.multiple" />
      <role-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='roleSelect'" :multiple="activeData.multiple"
        :key="key" />
      <BillRule v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        v-if="activeData.__config__.jnpfKey==='billRule'" :key="key" />
      <el-input :value="setDefaultValue(activeData.__config__.defaultValue)" placeholder="请输入默认值"
        @input="onDefaultValueInput" v-if="activeData.__config__.jnpfKey==='editor'" />
    </el-form-item>
    <el-form-item label="能否清空" v-if="activeData.__config__.jnpfKey!=='editor'">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="能否多选" v-if="activeData.__config__.jnpfKey!=='editor'">
      <el-switch v-model="activeData.multiple" @change="multipleChange" />
    </el-form-item>
    <el-form-item label="是否禁用" v-if="activeData.__config__.jnpfKey !=='editor'">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
  </el-row>
</template>
<script>
import comMixin from './mixin';
import OrgSelect from '@/components/Process/OrgSelect'
export default {
  props: ['activeData'],
  mixins: [comMixin],
  components: {
    OrgSelect
  },
  data() {
    return {
      selectTypeOptions: [{
        value: 'all',
        label: '全部'
      }, {
        value: 'custom',
        label: '自定义'
      }],
      key: +new Date()
    }
  },
  created() { },
  methods: {
    onTypeChange() {
      this.$set(this.activeData.__config__, 'defaultValue', this.activeData.multiple ? [] : '')
      this.activeData.ableDepIds = []
      if (this.activeData.__config__.jnpfKey === 'posSelect') {
        this.activeData.ablePosIds = []
      }
      if (this.activeData.__config__.jnpfKey === 'userSelect') {
        this.activeData.ablePosIds = []
        this.activeData.ableUserIds = []
        this.activeData.ableRoleIds = []
        this.activeData.ableGroupIds = []
      }
      this.activeData.__config__.renderKey = +new Date()
      this.key = +new Date()
    },
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
      this.activeData.__config__.renderKey = +new Date()
      this.key = +new Date()
    }
  }
}
</script>