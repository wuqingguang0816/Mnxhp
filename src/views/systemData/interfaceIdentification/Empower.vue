<template>
  <el-dialog title="接口授权" :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body width="800px" :modal-append-to-body="false">
    <div class="transfer__body">
      <div class="transfer-pane">
        <div class="transfer-pane__tools">
          <el-input placeholder="请输入关键词查询" v-model="keyword" @keyup.enter.native="searchData" clearable class="search-input">
            <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
          </el-input>
        </div>

        <div class="transfer-pane__body">
          <el-tree :data="treeData" :props="prop" highlight-current check-on-click-node @node-click="handleNodeClick" :tree-props="{children: 'children', hasChildren: ''}" class="JNPF-common-el-tree" node-key="id" v-loading="loading" :default-expanded-keys="expands">

          </el-tree>
        </div>
      </div>

      <div class="transfer-pane">
        <div class="transfer-pane__tools">
          <span>已选</span>
          <el-button @click="removeAll" type="text" class="removeAllBtn">清空列表</el-button>
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

</template>

<script>

import { getDataInterfaceSelectorList, getDataInterfaceTypeSelecto, getDataInterfaceSelector } from '@/api/systemData/dataInterface'
import { saveInterfaceList, getInterfaceList } from '@/api/systemData/interfaceIdentification'

export default {
  data() {
    return {
      visible: false,
      keyword: '',
      loading: false,
      props: {
        children: 'children',
        label: 'fullName',
        isLeaf: 'isLeaf'
      },
      treeData: [],
      selectedData: [],
      expands: [],
      identId: '',
    }
  },
  props: {
    height: {
      type: String,
      default: "380px"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    prop: {
      type: Object,
      default: () => {
        return { value: "id", label: "fullName", children: "children" };
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {

  },

  created() {
    this.setDefault()
  },

  beforeDestroy() {

  },
  methods: {
    init(data) {
      this.identId = data.id
      this.openDialog()
    },

    openDialog() {
      this.visible = true
      this.keyword = ''
      this.selectedData = []
      this.getData()
      this.setDefault()
    },
    confirm() {

      let arr = []
      this.selectedData.forEach(item => { arr.push(item.id) })
      console.log("提交数据", arr)
      if (arr.length > 0) {
        let body = {
          interfaceIdentId: this.identId,
          dataInterfaceIds: arr.join(",")
        }
        console.log("提交数据2", body)
        saveInterfaceList(body).then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.visible = false
              this.$emit('close')
            }
          })
        })
      }




    },
    setDefault() {

      getInterfaceList(this.identId).then(res => {
        this.selectedData = res.data.list
        console.log(res)
      })

    },
    //搜索时展开所有节点
    searchData() {
      this.setAllExpand(this.treeData)
      if (this.keyword) {
        let arr = []
        this.treeData.forEach(item => {
          let arr2 = []
          item.children.forEach(elem => {
            if (elem.fullName.indexOf(this.keyword) >= 0) {
              arr2.push(elem)
            }
          })
          item.children = arr2
          arr.push(item)
        })
        this.treeData = arr
      }
    },
    //设置展开的节点
    setAllExpand(data) {
      this.expands = []
      for (var i = 0; i < data.length; i++) {
        this.expands.push(data[i].id);//id对应node-key
      }
    },


    getData() {
      this.getAllList()

    },
    getAllList() {
      this.expands = []
      this.loading = true

      getDataInterfaceSelector().then(res => {
        this.treeData = res.data
        this.loading = false
      })
    },

    handleNodeClick(data) {
      if (data.hasChildren) return
      this.handleNodeClick2(data)
    },
    handleNodeClick2(data) {
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