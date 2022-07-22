<template>
  <div class="popupSelect-container">
    <div class="el-select" @click.stop="openDialog">
      <div class="el-select__tags" v-if="multiple" ref="tags"
        :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%',cursor:'pointer' }">
        <span v-if="collapseTags && tagsList.length">
          <el-tag :closable="!selectDisabled" :size="collapseTagSize" type="info"
            @close="deleteTag($event, 0)" disable-transitions>
            <span class="el-select__tags-text">{{ tagsList[0].fullName }}</span>
          </el-tag>
          <el-tag v-if="tagsList.length > 1" :closable="false" type="info" disable-transitions>
            <span class="el-select__tags-text">+ {{ tagsList.length - 1 }}</span>
          </el-tag>
        </span>
        <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
          <el-tag v-for="(item,i) in tagsList" :key="item.id" :size="collapseTagSize"
            :closable="!selectDisabled" type="info" @close="deleteTag($event, i)"
            disable-transitions>
            <span class="el-select__tags-text">{{ item.fullName }}</span>
          </el-tag>
        </transition-group>
      </div>
      <el-input ref="reference" v-model="innerValue" type="text" :placeholder="currentPlaceholder"
        :disabled="selectDisabled" readonly :validate-event="false"
        :tabindex="(multiple) ? '-1' : null" @mouseenter.native="inputHovering = true"
        @mouseleave.native="inputHovering = false">
        <template slot="suffix">
          <i v-show="!showClose"
            :class="['el-select__caret', 'el-input__icon', 'el-icon-arrow-up']"></i>
          <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close"
            @click="handleClearClick"></i>
        </template>
      </el-input>
    </div>
    <el-dialog title="选择用户" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select" lock-scroll append-to-body
      width="1000px">
      <div class="JNPF-common-layout">
        <div class="JNPF-common-layout-left">
          <el-tabs v-model="activeName" class="transfer-pane__body-tab">
            <el-tab-pane label="部门" name="organize">
              <el-scrollbar class="JNPF-common-el-tree-scrollbar el-tree-height"
                v-loading="treeLoading">
                <el-tree ref="treeBox" :data="treeData" :props="defaultProps"
                  :default-expand-all="expands" highlight-current :expand-on-click-node="false"
                  node-key="id" @node-click="handleNodeClick" class="JNPF-common-el-tree"
                  :filter-node-method="filterNode">
                  <span class="custom-tree-node" slot-scope="{ data }" :title="data.fullName">
                    <i :class="data.icon" />
                    <span class="text">{{data.fullName}}</span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="角色" name="role">
              <el-scrollbar class="JNPF-common-el-tree-scrollbar el-tree-height"
                v-loading="treeLoading">
                <el-tree ref="treeBoxRole" :data="treeData3" :props="defaultProps"
                  :default-expand-all="expands" highlight-current :expand-on-click-node="false"
                  node-key="id" @node-click="handleNodeClick" class="JNPF-common-el-tree"
                  :filter-node-method="filterNode">
                  <span class="custom-tree-node" slot-scope="{ data }" :title="data.fullName">
                    <i :class="data.icon" />
                    <span class="text">{{data.fullName}}</span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="岗位" name="position">
              <el-scrollbar class="JNPF-common-el-tree-scrollbar el-tree-height"
                v-loading="treeLoading">
                <el-tree ref="treeBoxPosition" :data="treeData2" :props="defaultProps"
                  :default-expand-all="expands" highlight-current :expand-on-click-node="false"
                  node-key="id" @node-click="handleNodeClick" class="JNPF-common-el-tree"
                  :filter-node-method="filterNode">
                  <span class="custom-tree-node" slot-scope="{ data }" :title="data.fullName">
                    <i :class="data.icon" />
                    <span class="text">{{data.fullName}}</span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="分组" name="group">
              <el-scrollbar class="JNPF-common-el-tree-scrollbar el-tree-height"
                v-loading="treeLoading">
                <el-tree ref="treeBoxGroup" :data="treeData4" :props="defaultProps"
                  :default-expand-all="expands" highlight-current :expand-on-click-node="false"
                  node-key="id" @node-click="handleNodeClick" class="JNPF-common-el-tree"
                  :filter-node-method="filterNode">
                  <span class="custom-tree-node" slot-scope="{ data }" :title="data.fullName">
                    <i :class="data.icon" />
                    <span class="text">{{data.fullName}}</span>
                  </span>
                </el-tree>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="JNPF-common-layout-center">
          <el-row class="JNPF-common-search-box" :gutter="16">
            <el-form @submit.native.prevent>
              <el-col :span="8">
                <el-form-item label="关键词">
                  <el-input v-model="listQuery.keyword" placeholder="请输入关键词查询" clearable
                    @keyup.enter.native="getData()" class="search-input" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                  <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-form>
            <div class="JNPF-common-search-box-right">
              <el-tooltip effect="dark" content="刷新" placement="top">
                <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                  @click="initData()" />
              </el-tooltip>
            </div>
          </el-row>
          <div class="JNPF-common-layout-main JNPF-flex-main">
            <JNPF-table v-loading="listLoading" :data="tableData" :border="false"
              highlight-current-row row-key="table" ref="multipleTable"
              @selection-change="handleSelectionChange" :hasNO="false" has-c>
              <el-table-column prop="account" label="账号" width="100" />
              <el-table-column prop="fullName" label="姓名" width="100" />
              <el-table-column prop="gender" label="性别" width="90" align="center">
                <template slot-scope="scope" sortable>
                  <span>{{ scope.row.gender ==1 ? '男': ( scope.row.gender == 2 ? '女' : '保密') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="手机号" prop="mobilePhone" width="120" />
              <el-table-column label="所属组织" prop="organize" show-overflow-tooltip />
            </JNPF-table>
            <pagination :total="total" :page.sync="listQuery.currentPage"
              :limit.sync="listQuery.pageSize" @pagination="initData" />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="confirm()">{{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getImUserSelector, getUserInfoList, getUsersByUserCondition } from '@/api/permission/user'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
import { getDepartmentSelector } from '@/api/permission/department'
import { getPositionSelector } from '@/api/permission/position'
import { getRoleSelector } from '@/api/permission/role'
import { getGroupSelector } from '@/api/permission/group'
export default {
  name: 'userSelects',
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    value: {
      type: [String, Array],
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
    collapseTags: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: String,
  },
  data() {
    return {
      visible: false,
      keyword: '',
      activeName: '',
      nodeId: '',
      innerValue: '',
      loading: false,
      props: {
        children: 'children',
        label: 'fullName',
        isLeaf: 'isLeaf'
      },
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        keyword: ''
      },
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      treeLoading: false,
      expands: true,
      tableData: [],
      total: 0,
      treeData: [],
      treeData2: [],
      treeData3: [],
      treeData4: [],
      selectedData: [],
      tagsList: [],
      inputHovering: false,
      inputWidth: 0,
      initialInputHeight: 0,
      listLoading: false,
      departIds: [],
      roleIds: [],
      positionIds: [],
      groupIds: [],
      selectId: '',
      selectList: {},
    }
  },
  watch: {
    value(val) {
      this.setDefault()
    },
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    activeName(val) {
      this.listQuery.keyword = ''
      if (!val) return
      this.nodeId = '0'
      this.treeData = []
      this.treeData2 = []
      this.treeData3 = []
      this.getData()
    }
  },
  computed: {
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },
    currentPlaceholder() {
      if (this.multiple && Array.isArray(this.value) && this.value.length) {
        return ''
      } else {
        return this.placeholder
      }
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small';
    },
  },
  created() {
    this.setDefault()
  },
  mounted() {
    addResizeListener(this.$el, this.handleResize);
    const reference = this.$refs.reference;
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      };
      const input = reference.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    if (this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setDefault()
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
  },
  methods: {
    echoTable(rows) {
      rows.forEach(row => {
        this.$refs.multipleTable.$refs.JNPFTable.toggleRowSelection(row, true)
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.$refs.JNPFTable.toggleRowSelection(row, true)
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.fullName.indexOf(value) !== -1;
    },
    handleSelectionChange(val) {
      if (val.length) {
        this.selectList[this.selectId] = val
      }
    },
    onClose() {
      this.activeName = ''
    },
    openDialog() {
      if (this.selectDisabled) return
      this.visible = true
      this.activeName = 'organize'
      this.listQuery.keyword = ''
      this.nodeId = '0'
      this.selectedData = []
      this.getData()
    },
    confirm() {
      this.selectedData = []
      for (let key in this.selectList) {
        this.selectedData.push(...this.selectList[key])
      }
      this.selectedData = [...new Set(this.selectedData)]
      if (this.multiple) {
        this.innerValue = ''
        this.tagsList = JSON.parse(JSON.stringify(this.selectedData))
        let selectedIds = this.selectedData.map(o => o.id)
        this.$emit('input', selectedIds)
        this.$emit('change', selectedIds, this.selectedData)
      } else {
        if (!this.selectedData.length) {
          this.innerValue = ''
          this.$emit('input', '')
          this.$emit('change', '', {})
          this.visible = false
          return
        }
        this.innerValue = this.selectedData[0].fullName
        let selectedIds = this.selectedData.map(o => o.id)
        this.$emit('input', selectedIds[0])
        this.$emit('change', selectedIds[0], this.selectedData[0])
      }
      this.visible = false
    },
    setDefault() {
      if (!this.value || !this.value.length) {
        this.innerValue = ''
        this.selectedData = []
        this.selectList = {}
        this.tagsList = []
        return
      }
      const arr = this.multiple ? this.value : [this.value]
      getUserInfoList(arr).then(res => {
        this.selectedData = res.data.list
        if (this.multiple) {
          this.innerValue = ''
          this.tagsList = JSON.parse(JSON.stringify(this.selectedData))
        } else {
          this.innerValue = this.selectedData.length ? this.selectedData[0].fullName : ''
        }
        this.$nextTick(() => {
          if (this.multiple) {
            this.resetInputHeight();
          }
        })
      })
    },
    getData() {
      if (this.activeName === 'organize') {//部门
        this.departIds = []
        this.getAllList()
        this.initData()
      } else if (this.activeName === 'position') { //岗位
        this.positionIds = []
        this.treeLoading = true
        getPositionSelector().then(res => {
          this.treeData2 = res.data.list || []
          this.treeLoading = false
        })
        this.initData()
      } else if (this.activeName === 'role') { //角色
        this.roleIds = []
        this.treeLoading = true
        getRoleSelector().then(res => {
          this.treeData3 = res.data.list || []
          this.treeLoading = false
        })
        this.initData()
      } else if (this.activeName === 'group') { //分组
        this.groupIds = []
        this.treeLoading = true
        getGroupSelector().then(res => {
          this.treeData4 = res.data
          this.treeLoading = false
        })
        this.initData()
      }
    },
    initData() {
      this.listLoading = true
      let query = {}
      if (this.activeName === 'organize') {
        query = {
          pagination: this.listQuery,
          departIds: this.departIds
        }
      } else {
        query = {
          pagination: this.listQuery,
          [this.activeName + 'Ids']: this[this.activeName + 'Ids']
        }
      }
      getUsersByUserCondition(query).then(res => {
        this.tableData = []
        this.tableData = res.data.list
        this.total = res.data.pagination.total
        this.selectedData = this.selectList[this.selectId]
        if (this.tableData.length && this.selectedData.length) {
          this.$nextTick(() => {
            this.tableData.forEach(i => {  // 循环嵌套
              this.selectedData.forEach(item => {
                let selData = []
                if (i.id === item.id) { // 判断哪些数据是需要回显的
                  selData.push(i)    // 需要回显的数据整合起来 
                  this.echoTable(selData)  // 调用回显方法
                }
              })
            })
          })
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getAllList() {
      this.treeLoading = true
      getDepartmentSelector().then(res => {
        this.treeData = res.data.list
        this.treeLoading = false
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
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        keyword: ''
      }
      this.initData()
    },
    reset() {
      this.listQuery.keyword = ''
      this.search()
    },
    handleNodeClick(data) {
      if (this.activeName === 'organize') {
        this.departIds = [data.id]
      } else {
        if (data.type !== this.activeName) return
        this[this.activeName + 'Ids'] = [data.id]
      }
      this.selectId = data.id
      this.reset()
    },
    removeAll() {
      this.selectedData = []
    },
    removeData(index) {
      this.selectedData.splice(index, 1)
    },
    deleteTag(event, index) {
      let a = this.selectedData.splice(index, 1)
      for (let key in this.selectList) {
        for (let index = 0; index < this.selectList[key].length; index++) {
          if (a[0].id == this.selectList[key][index].id) {
            this.selectList[key].splice(index, 1)
          }
        }
        this.selectList[key] = this.selectList[key]
      }
      this.confirm()
      event.stopPropagation();
    },
    handleClearClick(event) {
      this.selectedData = []
      this.confirm()
      event.stopPropagation();
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },
    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
    resetInputHeight() {
      if (this.collapseTags) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
        const tags = this.$refs.tags;
        const tagsHeight = tags ? Math.round(tags.getBoundingClientRect().height) : 0;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height = this.selectedData.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tagsHeight + (tagsHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.el-tree-height {
  height: 500px;
}
.JNPF-common-layout-main {
  padding-bottom: 0;
}
>>> .el-tabs__item {
  padding: 0 13px !important;
}
</style>
