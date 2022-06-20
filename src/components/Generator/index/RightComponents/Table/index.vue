<template>
  <el-row>
    <el-form-item label="显示标题">
      <el-switch v-model="activeData.__config__.showTitle" />
    </el-form-item>
    <el-form-item v-if="activeData.actionText !== undefined" label="动作文字">
      <el-input v-model="activeData.actionText" placeholder="请输入动作文字" />
    </el-form-item>
    <el-form-item label="是否合计">
      <el-switch v-model="activeData['show-summary']" />
    </el-form-item>
    <el-form-item label="合计字段" v-if="activeData['show-summary']">
      <el-select v-model="activeData.summaryField" multiple placeholder="请选择合计字段">
        <template v-for="(item,i) in activeData.__config__.children">
          <el-option :key="i" :label="item.__config__.label" :value="item.__vModel__"
            v-if="['comInput','numInput','calculate'].includes(item.__config__.jnpfKey)" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="配置表单">
      <el-switch v-model="activeData.addType" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item label="选择表单">
      <el-button style="width: 100%;" @click="editConf()">配置表单</el-button>
    </el-form-item>
    <Form v-if="formVisible" ref="Form" @submit="updateConf" />
  </el-row>
</template>
<script>
import Form from './AddTableForm'
const defaultAddTableConf = {
  interfaceId: '',
  interfaceName: '',
  templateJson: [],
  hasPage: true,
  pageSize: 20,
  columnOptions: [],
  relationOptions: []
}

export default {
  props: ['activeData'],
  components: { Form },
  data() {
    return {
      formVisible: false
    }
  },
  methods: {
    editConf() {
      if (!this.activeData.addTableConf) {
        this.activeData.addTableConf = JSON.parse(JSON.stringify(defaultAddTableConf))
      }
      let addTableConf = JSON.parse(JSON.stringify(this.activeData.addTableConf))
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(addTableConf, this.activeData.__config__.children)
      })
    },
    updateConf(data) {
      this.activeData.addTableConf = data
    }
  }
}
</script>