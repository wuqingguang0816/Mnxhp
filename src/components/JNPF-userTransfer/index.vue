<template>
  <div class="transfer__body" v-loading="allLoading"
    :element-loading-text="$t('common.loadingText')" :style="{height}">
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <el-input placeholder="输入关键词进行搜索" v-model="keyword">
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </div>
      <div class="transfer-pane__body">
        <el-tree :data="treeData" :props="props" highlight-current :expand-on-click-node="false"
          check-on-click-node @node-click="handleNodeClick" class="JNPF-common-el-tree"
          node-key="id" v-loading="loading" lazy :load="loadNode">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i :class="data.icon"></i>
            <span class="text">{{node.label}}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <span>已选</span>
        <el-button @click="removeAll" type="text">清空列表</el-button>
      </div>
      <div class="transfer-pane__body shadow right-pane">
        <template>
          <div v-for="(item, index) in selectedData" :key=" index" class="selected-item">
            <span>{{ item.fullName}}</span>
            <i class="el-icon-delete" @click="removeData(index)"></i>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getImUserSelector, getUserInfoList } from '@/api/permission/user'
export default {
  name: 'JNPF-userTransfer',
  data() {
    return {
      allLoading: false,
      loading: false,
      treeData: [],
      selectedData: [],
      props: {
        children: 'children',
        label: 'fullName',
        isLeaf: 'isLeaf'
      },
      keyword: '',
      nodeId: '0',
      ids: []
    }
  },
  props: {
    height: {
      type: String,
      default: "380px"
    },
    // allLoading: {
    //   type: Boolean,
    //   default: false
    // },
    value: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    init() {
      this.selectedData = []
      this.ids = []
      this.keyword = ''
      this.nodeId = '0'
      this.$nextTick(() => {
        this.getList()
        this.getSelectList()
      })
    },
    getSelectList() {
      this.allLoading = true
      if (!this.value.length) return this.allLoading = false
      getUserInfoList(this.value).then(res => {
        this.selectedData = res.data.list
        this.ids = this.selectedData.map(o => o.id)
        this.allLoading = false
      })
    },
    getList() {
      this.loading = true
      if (this.keyword) this.nodeId = '0'
      getImUserSelector(this.nodeId, this.keyword).then(res => {
        this.treeData = res.data.list
        this.loading = false
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.nodeId = '0'
        return resolve(this.treeData)
      }
      this.nodeId = node.data.id
      getImUserSelector(this.nodeId).then(res => {
        resolve(res.data.list)
      })
    },
    handleNodeClick(data) {
      if (data.type !== 'user') return
      const boo = this.selectedData.some(o => o.id === data.id)
      if (boo) return
      const item = {
        id: data.id,
        fullName: data.fullName
      }
      this.multiple ? this.selectedData.push(item) : this.selectedData = [item]
      this.multiple ? this.ids.push(item.id) : this.ids = [item.id]
      this.$emit('input', this.ids)
      this.$emit('getValue', this.ids, this.selectedData)
    },
    removeAll() {
      this.selectedData = []
      this.ids = []
      this.$emit('input', this.ids)
      this.$emit('getValue', this.ids, this.selectedData)
    },
    removeData(index) {
      this.selectedData.splice(index, 1)
      this.ids.splice(index, 1)
      this.$emit('input', this.ids)
      this.$emit('getValue', this.ids, this.selectedData)
    },
  }
};
</script>