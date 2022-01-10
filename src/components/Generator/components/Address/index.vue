<template>
  <div class="popupSelect-container">
    <div class="popupSelect-input" @click="openDialog">
      <el-input :placeholder="placeholder" v-model="innerValue" readonly :disabled="disabled">
        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clear"
          v-if="clearable && !disabled"></i>
        <i slot="suffix" class="el-input__icon el-icon-arrow-down"
          :class="{'clearable':clearable && !disabled}"></i>
      </el-input>
    </div>
    <el-dialog title="省市区" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body
      width="800px" :modal-append-to-body="false" @close="onClose">
      <div class="transfer__body" :element-loading-text="$t('common.loadingText')">
        <div class="transfer-pane">
          <div class="transfer-pane__tools">
            <span>全部数据</span>
          </div>
          <div class="transfer-pane__body">
            <el-tree :data="treeData" :props="props" highlight-current check-on-click-node
              @node-click="handleNodeClick" class="JNPF-common-el-tree" node-key="id"
              v-loading="loading" lazy :load="loadNode">
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
              <div v-for="(item, index) in selectedData" :key="index" class="selected-item">
                <span>{{item}}</span>
                <i class="el-icon-delete" @click="removeData(index)"></i>
              </div>
            </template>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible=false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProvinceSelector, GetAreaByIds } from '@/api/system/province'
export default {
  name: 'JNPF-Address',
  props: {
    value: {
      default: []
    },
    level: {
      type: Number,
      default: 2
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      treeData: [],
      visible: false,
      loading: false,
      nodeId: '',
      innerValue: '',
      props: {
        children: 'children',
        label: 'fullName',
        isLeaf: 'isLeaf'
      },
      selectedData: [],
      selectedIds: [],
    }
  },
  created() {
    this.setDefault()
  },
  watch: {
    value(val) {
      this.setDefault()
    }
  },
  methods: {
    onClose() { },
    clear() {
      if (this.disabled) return
      this.innerValue = ''
      this.selectedData = []
      this.selectedIds = []
      this.$emit('input', [])
      this.$emit('change', [], null)
    },
    openDialog() {
      if (this.disabled) return
      this.visible = true
      this.nodeId = '-1'
      this.initData()
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.nodeId = '-1'
        return resolve(this.treeData)
      }
      this.nodeId = node.data.id
      getProvinceSelector(this.nodeId).then(res => {
        const list = res.data.list.map(value => ({
          ...value,
          isLeaf: node.level >= this.level ? true : value.isLeaf
        }));
        resolve(list);
      })
    },
    initData() {
      this.loading = true
      getProvinceSelector(this.nodeId).then(res => {
        this.treeData = res.data.list.map(value => ({
          ...value,
          isLeaf: 0 >= this.level ? true : value.isLeaf
        }));
        this.loading = false
      })
    },
    getNodePath(node) {
      let fullPath = []
      const loop = (node) => {
        if (node.level) fullPath.unshift(node.data)
        if (node.parent) loop(node.parent)
      }
      loop(node)
      return fullPath
    },
    handleNodeClick(data, node) {
      if (!node.isLeaf) return
      const nodePath = this.getNodePath(node)
      let currId = nodePath.map(o => o.id)
      let currData = nodePath.map(o => o.fullName).join('/')
      if (this.multiple) {
        const boo = this.selectedIds.some(o => o.join('/') === currId.join('/'))
        if (boo) return
        this.selectedIds.push(currId)
        this.selectedData.push(currData)
      } else {
        this.selectedIds = [currId]
        this.selectedData = [currData]
      }
    },
    removeAll() {
      this.selectedData = []
      this.selectedIds = []
    },
    removeData(index) {
      this.selectedData.splice(index, 1)
      this.selectedIds.splice(index, 1)
    },
    confirm() {
      this.innerValue = this.selectedData.join(',')
      let selectedData = []
      for (let i = 0; i < this.selectedIds.length; i++) {
        let item = []
        let selectedNames = this.selectedData[i].split('/')
        for (let j = 0; j < this.selectedIds[i].length; j++) {
          item.push({
            id: this.selectedIds[i][j],
            fullName: selectedNames[j],
          })
        }
        selectedData.push(item)
      }
      if (this.multiple) {
        this.$emit('input', this.selectedIds)
        this.$emit('change', this.selectedIds, selectedData)
      } else {
        this.$emit('input', this.selectedIds[0])
        this.$emit('change', this.selectedIds[0], selectedData[0])
      }
      this.visible = false
    },
    setDefault() {
      if (!this.value || !this.value.length) {
        this.innerValue = ''
        this.selectedIds = []
        this.selectedData = []
        return
      }
      this.selectedIds = this.multiple ? this.value : [this.value]
      GetAreaByIds(this.selectedIds).then(res => {
        if (!this.selectedData.length && !this.innerValue) {
          this.selectedData = res.data.map(o => o.join('/'))
          this.innerValue = this.selectedData.join(',')
        }
      })
    },
  }
}
</script>