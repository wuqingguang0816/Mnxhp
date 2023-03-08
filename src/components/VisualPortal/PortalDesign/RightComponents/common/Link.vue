<template>
  <div>
    <template v-if="type == 1">
      <template v-if="showType == 'pc'">
        <el-form-item label="链接地址">
          <el-select v-model="activeData.option.linkType" placeholder="请选择链接类型" clearable>
            <el-option v-for="(item, index) in linkTypeList" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" v-if="activeData.option.linkType==1">
          <JNPF-TreeSelect :options="menuList" v-model="activeData.option.moduleId"
            placeholder="请选择菜单" lastLevel clearable @change="getSelectValue">
          </JNPF-TreeSelect>
        </el-form-item>
        <el-form-item label="链接地址" v-if="activeData.option.linkType==2">
          <el-input v-model="activeData.option.urlAddress" placeholder="填写地址">
            <el-select slot="append" v-model="activeData.option.linkTarget" style="width: 90px;">
              <el-option label="_self" value="_self" />
              <el-option label="_blank" value="_blank" />
            </el-select>
          </el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="链接地址">
          <el-select v-model="activeData.option.appLinkType" placeholder="请选择链接类型" clearable>
            <el-option v-for="(item, index) in linkTypeList" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" v-if="activeData.option.appLinkType==1">
          <JNPF-TreeSelect :options="appMenuList" v-model="activeData.option.appModuleId"
            placeholder="请选择菜单" lastLevel clearable @change="getSelectValue">
          </JNPF-TreeSelect>
        </el-form-item>
        <el-form-item label="链接地址" v-if="activeData.option.appLinkType==2">
          <el-input v-model="activeData.option.appUrlAddress" placeholder="填写地址">
            <el-select slot="append" v-model="activeData.option.appLinkTarget" style="width: 90px;"
              v-if="showType == 'pc'">
              <el-option label="_self" value="_self" />
              <el-option label="_blank" value="_blank" />
            </el-select>
          </el-input>
        </el-form-item>
      </template>
    </template>
    <template v-else>
      <template v-if="showType == 'pc'">
        <el-form-item label="右上角链接">
          <el-select v-model="activeData.card.linkType" placeholder="请选择链接类型">
            <el-option v-for="(item, index) in linkTypeList" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" v-if="activeData.card.linkType==1">
          <JNPF-TreeSelect :options="menuList" v-model="activeData.card.moduleId"
            placeholder="请选择菜单" lastLevel clearable @change="getSelectVal">
          </JNPF-TreeSelect>
        </el-form-item>
        <el-form-item label="链接地址" v-if="activeData.card.linkType==2">
          <el-input v-model="activeData.card.urlAddress" placeholder="填写地址">
            <el-select slot="append" v-model="activeData.card.linkTarget" style="width: 90px;">
              <el-option label="_self" value="_self" />
              <el-option label="_blank" value="_blank" />
            </el-select>
          </el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="右上角链接">
          <el-select v-model="activeData.card.appLinkType" placeholder="请选择链接类型">
            <el-option v-for="(item, index) in linkTypeList" :key="index" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" v-if="activeData.card.appLinkType==1">
          <JNPF-TreeSelect :options="appMenuList" v-model="activeData.card.appModuleId"
            placeholder="请选择菜单" lastLevel clearable @change="getSelectVal">
          </JNPF-TreeSelect>
        </el-form-item>
        <el-form-item label="链接地址" v-if="activeData.card.appLinkType==2">
          <el-input v-model="activeData.card.appUrlAddress" placeholder="填写地址">
            <el-select slot="append" v-model="activeData.card.appLinkTarget" style="width: 90px;">
              <el-option label="_self" value="_self" />
              <el-option label="_blank" value="_blank" />
            </el-select>
          </el-input>
        </el-form-item>
      </template>
    </template>
  </div>
</template>
<script>
import { linkTypeList } from '../../components/config'
export default {
  props: {
    activeData: {
      type: Object,
      default: {}
    },
    menuList: {
      type: Array,
      default: [],
    },
    appMenuList: {
      type: Array,
      default: [],
    },
    //1为链接跳转  其他为右上角跳转
    type: {
      type: Number,
      default: 1,
    },
    showType: {
      type: String,
      default: 'pc'
    }
  },
  data() {
    return {
      linkTypeList
    }
  },
  methods: {
    getSelectValue(data, item) {
      const isPc = this.showType == 'pc'
      this.activeData.option[isPc ? 'type' : 'appType'] = item.type
      this.activeData.option[isPc ? 'urlAddress' : 'appUrlAddress'] = item.urlAddress
      if (item.linkTarget) this.activeData.option[isPc ? 'linkTarget' : 'appLinkTarget'] = item.linkTarget
      if (item.propertyJson) this.activeData.option[isPc ? 'propertyJson' : 'appPropertyJson'] = item.propertyJson
    },

    getSelectVal(data, item) {
      const isPc = this.showType == 'pc'
      this.activeData.card[isPc ? 'type' : 'appType'] = item.type
      this.activeData.card[isPc ? 'urlAddress' : 'appUrlAddress'] = item.urlAddress
      if (item.linkTarget) this.activeData.card[isPc ? 'linkTarget' : 'appLinkTarget'] = item.linkTarget
      if (item.propertyJson) this.activeData.card[isPc ? 'propertyJson' : 'appPropertyJson'] = item.propertyJson
    },
  }
}
</script>