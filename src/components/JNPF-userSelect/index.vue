<template>
  <div class="userSelect-container">
    <div class="userSelect-input" @click="openDialog">
      <el-input :placeholder="placeholder" v-model="innerValue" readonly :disabled="disabled">
        <i slot="suffix" class="el-input__icon el-icon-circle-close" @click.stop="clear"></i>
        <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
      </el-input>
    </div>
    <el-dialog title="选择用户" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body
      width="800px" :modal-append-to-body="false">
      <div class="transfer__body" :element-loading-text="$t('common.loadingText')">
        <div class="transfer-pane">
          <div class="transfer-pane__tools">
            <el-input placeholder="输入关键词进行搜索" v-model="keyword" @keyup.enter.native="getList">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible=false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getImUserSelector, getUserInfoList } from '@/api/permission/user'
export default {
  name: 'userSelect',
  props: {
    value: {
      default: ''
    },
    interfaceId: {
      type: String,
      default: ''
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
      visible: false,
      keyword: '',
      nodeId: '',
      innerValue: '',
      loading: false,
      props: {
        children: 'children',
        label: 'fullName',
        isLeaf: 'isLeaf'
      },
      treeData: [],
      selectedData: [],
    }
  },
  watch: {
    value(val) {
      this.setDefault()
    }
  },
  created() {
    this.setDefault()
  },
  methods: {
    clear() {
      if (this.disabled) return
      this.innerValue = ''
      this.selectedData = []
      this.$emit('input', '')
      this.$emit('change', '', '')
    },
    openDialog() {
      if (this.disabled) return
      this.visible = true
      this.keyword = ''
      this.nodeId = '0'
      this.getList()
    },
    confirm() {
      let txt = '', ids = ''
      for (let i = 0; i < this.selectedData.length; i++) {
        txt += (i ? ',' : '') + this.selectedData[i].fullName
        ids += (i ? ',' : '') + this.selectedData[i].id
      }
      this.innerValue = txt
      this.$emit('input', ids)
      this.$emit('change', ids, this.selectedData)
      this.visible = false
    },
    setDefault() {
      this.selectedData = []
      if (!this.value) return this.innerValue = ''
      const arr = this.value.split(',')
      getUserInfoList(arr).then(res => {
        const list = res.data.list
        this.selectedData = list
        let txt = ''
        for (let i = 0; i < list.length; i++) {
          txt += (i ? ',' : '') + list[i].fullName
        }
        this.innerValue = txt
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
    },
    removeAll() {
      this.selectedData = []
    },
    removeData(index) {
      this.selectedData.splice(index, 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.userSelect-container {
  width: 100%;
  .userSelect-input {
    width: 100%;
    cursor: pointer;
    .is-disabled {
      &:hover {
        .el-icon-circle-close {
          display: none;
        }
        .el-icon-arrow-down {
          display: inline-block;
        }
      }
      >>> input {
        cursor: not-allowed;
      }
    }
    >>> input {
      cursor: pointer;
    }
    .el-icon-circle-close {
      display: none;
    }
    &:hover {
      .el-icon-circle-close {
        display: block;
      }
      .el-icon-arrow-down {
        display: none;
      }
    }
  }
}
</style>