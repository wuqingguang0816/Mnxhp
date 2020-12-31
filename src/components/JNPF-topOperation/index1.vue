<template>
  <el-button-group class="jnpf-opts">
    <!--左侧插槽-->
    <slot name="left" />
    <template v-if="isJudgePer">
      <el-button type="primary" icon="el-icon-plus" @click="add()" size="mini" v-has="addPerCode">
        {{addText}}</el-button>
    </template>
    <template v-else>
      <el-button type="primary" icon="el-icon-plus" @click="add()" size="mini">{{addText}}
      </el-button>
    </template>
    <!-- 中间插槽 -->
    <slot name="center" />
    <el-button type="primary" @click="refresh" icon="el-icon-refresh" :loading="loading" size="mini"
      v-if="hasRefresh">{{refreshText}}</el-button>
    <!-- 默认右侧插槽 -->
    <slot />
  </el-button-group>
</template>
<script>
export default {
  props: {
    refreshText: {
      type: String,
      default: '刷新'
    },
    addText: {
      type: String,
      default: '新建'
    },
    // 刷新加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否展示刷新按钮
    hasRefresh: {
      type: Boolean,
      default: true
    },
    // 新增按钮权限标识
    addPerCode: {
      type: String,
      default: 'btn_add'
    },
    // 是否开启权限判断
    isJudgePer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    refresh() {
      this.$emit('refresh')
    },
    add() {
      this.$emit('add')
    }
  }
}
</script>