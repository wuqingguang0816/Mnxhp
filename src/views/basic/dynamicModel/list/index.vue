
<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-left" v-if="columnData.type === 2">
      <div class="JNPF-common-title" v-if="columnData.treeTitle">
        <h2>{{columnData.treeTitle}}</h2>
      </div>
      <el-tree :data="treeData" :props="treeProps" default-expand-all highlight-current
        ref="treeBox" :expand-on-click-node="false" @node-click="handleNodeClick"
        class="JNPF-common-el-tree" :node-key="treeProps.value">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{node.label}}</span>
        </span>
      </el-tree>
    </div>
    <div class="JNPF-common-layout-center">
      <Search ref="Search" :list="columnData.searchList" @reset="reset" @search="search" />
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <div v-if="isPreview || !columnData.useBtnPermission">
            <el-button :type="i==0?'primary':'text'" :icon="item.icon"
              @click="headBtnsHandel(item.value)" v-for="(item, i) in columnData.btnsList" :key="i">
              {{item.label}}</el-button>
          </div>
          <div v-else>
            <el-button :type="i==0?'primary':'text'" :icon="item.icon" v-has="'btn_'+item.value"
              @click="headBtnsHandel(item.value)" v-for="(item, i) in columnData.btnsList" :key="i">
              {{item.label}}</el-button>
          </div>
          <div class="JNPF-common-head-right">
            <el-tooltip content="高级查询" placement="top" v-if="columnData.hasSuperQuery">
              <el-link icon="icon-ym icon-ym-filter JNPF-common-head-icon" :underline="false"
                @click="openSuperQuery()" />
            </el-tooltip>
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <JNPF-table v-loading="listLoading" :data="list" row-key="id" default-expand-all
          :tree-props="{children: 'children', hasChildren: ''}" @sort-change='sortChange'
          :has-c="hasBatchBtn" @selection-change="handleSelectionChange" v-if="refreshTable"
          custom-column>
          <template v-if="columnData.type === 4">
            <el-table-column :prop="item.prop" :label="item.label" :align="item.align"
              :width="item.width" :key="i" :sortable="item.sortable?'custom':item.sortable"
              v-for="(item, i) in columnList">
              <template slot-scope="scope">
                <template v-if="scope.row.rowEdit">
                  <template v-if="item.jnpfKey==='numInput'">
                    <el-input-number v-model="scope.row[item.prop]" placeholder="请输入"
                      :precision="item.precision" controls-position="right" style="width:100%" />
                  </template>
                  <template v-else-if="['rate','slider'].includes(item.jnpfKey)">
                    <el-input-number v-model="scope.row[item.prop]" placeholder="请输入"
                      controls-position="right" style="width:100%" />
                  </template>
                  <div v-else-if="item.jnpfKey==='switch'" style="padding-top: 5px;">
                    <el-switch v-model="scope.row[item.prop]" :active-value="1"
                      :inactive-value="0" />
                  </div>
                  <template v-else-if="item.jnpfKey==='time'">
                    <el-time-picker v-model="scope.row[item.prop]" style="width:100%"
                      :picker-options="item['picker-options']" placeholder="请选择" clearable
                      :value-format="item['value-format']" :format="item.format">
                    </el-time-picker>
                  </template>
                  <template v-else-if="['date'].includes(item.jnpfKey)">
                    <el-date-picker v-model="scope.row[item.prop]" :type="item.type||'datetime'"
                      clearable placeholder="请选择" value-format="timestamp" style="width:100%"
                      :format="item.format||'yyyy-MM-dd HH:mm:ss'">
                    </el-date-picker>
                  </template>
                  <template v-else-if="['comSelect'].includes(item.jnpfKey)">
                    <comSelect v-model="scope.row[item.prop]" placeholder="请选择" clearable />
                  </template>
                  <template v-else-if="['depSelect'].includes(item.jnpfKey)">
                    <depSelect v-model="scope.row[item.prop]" placeholder="请选择" clearable />
                  </template>
                  <template v-else-if="['userSelect'].includes(item.jnpfKey)">
                    <userSelect v-model="scope.row[item.prop]" placeholder="请选择" clearable />
                  </template>
                  <template v-else-if="['posSelect'].includes(item.jnpfKey)">
                    <posSelect v-model="scope.row[item.prop]" placeholder="请选择" clearable />
                  </template>
                  <template v-else-if="item.jnpfKey==='address'">
                    <JNPFAddress v-model="scope.row[item.prop]" placeholder="请选择"
                      :level="item.level" clearable />
                  </template>
                  <template v-else-if="['select','radio','checkbox'].includes(item.jnpfKey)">
                    <el-select v-model="scope.row[item.prop]" placeholder="请选择" clearable
                      filterable>
                      <el-option :label="oItem[item.__config__.props.label]"
                        v-for="(oItem, i) in item.__slot__.options"
                        :value="oItem[item.__config__.props.value]" :key="i"></el-option>
                    </el-select>
                  </template>
                  <template v-else-if="item.jnpfKey==='cascader'">
                    <el-cascader v-model="scope.row[item.prop]" :options="item.options" clearable
                      :show-all-levels="item['show-all-levels']" :props="item.props.props"
                      filterable placeholder="请选择" style="width:100%">
                    </el-cascader>
                  </template>
                  <template v-else-if="item.jnpfKey==='treeSelect'">
                    <JNPF-TreeSelect v-model="scope.row[item.prop]" placeholder="请选择"
                      :options="item.options" :props="item.props.props" clearable />
                  </template>
                  <template v-else-if="item.jnpfKey==='relationForm'">
                    <relationForm v-model="scope.row[item.prop]" placeholder="请选择"
                      :modelId="item.modelId" clearable :columnOptions="item.columnOptions"
                      :relationField="item.relationField" :hasPage="item.hasPage"
                      :pageSize="item.pageSize" />
                  </template>
                  <template v-else-if="item.jnpfKey==='popupSelect'">
                    <popupSelect v-model="scope.row[item.prop]" placeholder="请选择"
                      :interfaceId="item.interfaceId" clearable :columnOptions="item.columnOptions"
                      :propsValue="item.propsValue" :relationField="item.relationField"
                      :hasPage="item.hasPage" :pageSize="item.pageSize" :popupType="item.popupType"
                      :popupTitle="item.popupTitle" :popupWidth="item.popupWidth" />
                  </template>
                  <template v-else-if="['comInput','textarea'].includes(item.jnpfKey)">
                    <el-input v-model="scope.row[item.prop]" placeholder="请输入" clearable />
                  </template>
                  <template v-else-if="systemComponentsList.includes(item.jnpfKey)">
                    {{scope.row[item.prop+'_name']||scope.row[item.prop]}}
                  </template>
                  <template v-else>
                    {{scope.row[item.prop]}}
                  </template>
                </template>
                <template v-else>
                  {{scope.row[item.prop+'_name']||scope.row[item.prop]}}
                </template>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column :prop="item.prop" :label="item.label" :align="item.align"
              :width="item.width" :key="i" :sortable="item.sortable?'custom':item.sortable"
              v-for="(item, i) in columnList" />
          </template>
          <el-table-column prop="flowState" label="状态" width="100" v-if="config.webType == 3">
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-tag v-if="scope.row.flowState==1">等待审核</el-tag>
              <el-tag type="success" v-else-if="scope.row.flowState==2">审核通过</el-tag>
              <el-tag type="danger" v-else-if="scope.row.flowState==3">审核驳回</el-tag>
              <el-tag type="info" v-else-if="scope.row.flowState==4">流程撤回</el-tag>
              <el-tag type="info" v-else-if="scope.row.flowState==5">审核终止</el-tag>
              <el-tag type="warning" v-else>等待提交</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" :width="operationWidth"
            v-if="columnBtnsList.length || customBtnsList.length">
            <template slot-scope="scope" v-if="!scope.row.top">
              <template v-if="isPreview || !columnData.useBtnPermission">
                <template v-if="scope.row.rowEdit">
                  <el-button size="mini" type="text" @click="saveForRowEdit(scope.row)">
                    保存</el-button>
                  <el-button size="mini" type="text" class="JNPF-table-delBtn"
                    @click="cancelRowEdit(scope.row,scope.$index)">取消</el-button>
                </template>
                <template v-else>
                  <template v-for="(item, i) in columnBtnsList">
                    <template v-if="item.value=='edit'">
                      <template v-if="columnData.type === 4">
                        <el-button size="mini" type="text" :key="i"
                          :disabled="config.webType == 3 && [1,2,4,5].indexOf(scope.row.flowState)>-1"
                          @click="scope.row.rowEdit=true">
                          {{item.label}}</el-button>
                      </template>
                      <template v-else>
                        <el-button size="mini" type="text" :key="i"
                          :disabled="config.webType == 3 && [1,2,4,5].indexOf(scope.row.flowState)>-1"
                          @click="columnBtnsHandel(item.value,scope.row)">
                          {{item.label}}</el-button>
                      </template>
                    </template>
                    <template v-else-if="item.value=='remove'">
                      <el-button size="mini" type="text" :key="i" class="JNPF-table-delBtn"
                        :disabled="config.webType == 3 && !!scope.row.flowState"
                        @click="columnBtnsHandel(item.value,scope.row,scope.$index)">
                        {{item.label}}</el-button>
                    </template>
                    <template v-else-if="item.value=='detail'">
                      <el-button size="mini" type="text" :key="i"
                        :disabled="config.webType == 3 && !scope.row.flowState"
                        @click="columnBtnsHandel(item.value,scope.row)" v-if="scope.row.id">
                        {{item.label}}</el-button>
                    </template>
                    <template v-else>
                      <el-button size="mini" type="text" :key="i"
                        @click="customBtnsHandel(item,scope.row,scope.$index)">
                        {{item.label}}</el-button>
                    </template>
                  </template>
                  <template v-if="customBtnsList.length">
                    <el-dropdown hide-on-click>
                      <span class="el-dropdown-link">
                        <el-button type="text" size="mini">
                          {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, i) in customBtnsList" :key="i"
                          @click.native="customBtnsHandel(item,scope.row,scope.$index)">
                          {{item.label}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </template>
              </template>
              <template v-else>
                <template v-for="(item, i) in columnBtnsList">
                  <template v-if="item.value=='edit'">
                    <el-button size="mini" type="text" :key="i"
                      :disabled="config.webType == 3 && [1,2,4,5].indexOf(scope.row.flowState)>-1"
                      @click="columnBtnsHandel(item.value,scope.row)" v-has="'btn_'+item.value">
                      {{item.label}}</el-button>
                  </template>
                  <template v-else-if="item.value=='remove'">
                    <el-button size="mini" type="text" :key="i" class="JNPF-table-delBtn"
                      :disabled="config.webType == 3 && !!scope.row.flowState"
                      @click="columnBtnsHandel(item.value,scope.row,scope.$index)"
                      v-has="'btn_'+item.value">{{item.label}}</el-button>
                  </template>
                  <template v-else-if="item.value=='detail'">
                    <el-button size="mini" type="text" :key="i"
                      :disabled="config.webType == 3 && !scope.row.flowState"
                      @click="columnBtnsHandel(item.value,scope.row)" v-has="'btn_'+item.value">
                      {{item.label}}</el-button>
                  </template>
                  <template v-else>
                    <el-button size="mini" type="text" :key="i" v-has="item.value"
                      @click="customBtnsHandel(item,scope.row,scope.$index)">
                      {{item.label}}</el-button>
                  </template>
                </template>
                <template v-if="customBtnsList.length">
                  <el-dropdown hide-on-click>
                    <span class="el-dropdown-link">
                      <el-button type="text" size="mini">
                        {{$t('common.moreBtn')}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, i) in customBtnsList" :key="i"
                        @click.native="customBtnsHandel(item,scope.row,scope.$index)"
                        v-has="item.value">{{item.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </template>
            </template>
          </el-table-column>
        </JNPF-table>
        <template v-if="columnData.type !== 3 && columnData.hasPage">
          <pagination :total="total" :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize" @pagination="initData" />
        </template>
      </div>
    </div>
    <FlowBox v-if="flowVisible" ref="FlowBox" @close="closeFlow" />
    <Form v-show="formVisible" ref="Form" @refreshDataList="refresh" />
    <Detail v-show="detailVisible" ref="Detail" @close="detailVisible = false" />
    <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
    <SuperQuery v-if="superQueryVisible" ref="SuperQuery" :columnOptions="columnOptions"
      @superQuery="superQuery" />
  </div>
</template>

<script>
import { getModelList, deleteModel, batchDelete, exportModel, createModel, updateModel } from '@/api/onlineDev/visualDev'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
import { getColumnsByModuleId } from '@/api/common'
import { dyOptionsList, systemComponentsList } from '@/components/Generator/generator/comConfig'
import request from '@/utils/request'
import Form from './Form'
import FlowBox from '@/views/workFlow/components/FlowBox'
import Detail from './detail'
import ExportBox from './ExportBox'
import Search from './Search'
import SuperQuery from '@/components/SuperQuery'
export default {
  name: 'dynamicModel',
  components: { Form, ExportBox, Search, Detail, FlowBox, SuperQuery },
  props: ['config', 'modelId', 'isPreview'],
  data() {
    return {
      systemComponentsList,
      keyword: '',
      treeProps: {
        children: 'children',
        label: 'fullName',
        value: 'id'
      },
      list: [],
      cacheList: [],
      total: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: '',
        menuId: '',
        queryJson: '',
        superQueryJson: ''
      },
      defaultListQuery: {
        pageSize: 20,
        sort: 'desc',
        sidx: '',
      },
      flowVisible: false,
      formVisible: false,
      detailVisible: false,
      importBoxVisible: false,
      exportBoxVisible: false,
      superQueryVisible: false,
      treeData: [],
      treeActiveId: '',
      columnData: {
        columnBtnsList: []
      },
      formData: {},
      columnList: [],
      columnOptions: [],
      columnBtnsList: [],
      customBtnsList: [],
      hasBatchBtn: false,
      refreshTable: true,
      multipleSelection: [],
      settingsColumnList: []
    }
  },
  computed: {
    operationWidth() {
      const customWidth = this.customBtnsList.length ? 50 : 0
      return this.columnBtnsList.length * 50 + customWidth
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.listQuery.menuId = this.$route.meta.modelId
      this.refreshTable = false
      if (!this.config.columnData || !this.config.formData) return
      this.columnData = JSON.parse(this.config.columnData)
      if (this.columnData.type === 3) {
        this.columnData.columnList = this.columnData.columnList.filter(o => o.prop != this.columnData.groupField)
      }
      this.hasBatchBtn = this.columnData.btnsList.some(o => o.value == 'batchRemove')
      this.$nextTick(() => {
        this.refreshTable = true
      })
      this.formData = JSON.parse(this.config.formData)
      this.customBtnsList = this.columnData.customBtnsList || []
      this.columnBtnsList = this.columnData.columnBtnsList || []
      this.columnOptions = this.columnData.columnOptions || []
      this.listLoading = true
      if (this.isPreview) this.listQuery.menuId = "270579315303777093"
      let res = await getColumnsByModuleId(this.listQuery.menuId)
      this.settingsColumnList = res.data || []
      this.getColumnList()
      if (this.columnData.type === 4) this.buildOptions()
      if (this.isPreview) return this.listLoading = false
      this.listQuery.pageSize = this.columnData.pageSize
      this.listQuery.sort = this.columnData.sort
      this.listQuery.sidx = this.columnData.defaultSidx
      this.defaultListQuery.pageSize = this.columnData.pageSize
      this.defaultListQuery.sort = this.columnData.sort
      this.defaultListQuery.sidx = this.columnData.defaultSidx
      if (this.columnData.type === 3 || !this.columnData.hasPage) this.listQuery.pageSize = 10000
      if (this.columnData.type === 2) {
        this.treeProps.value = this.columnData.treePropsValue || 'id'
        this.treeProps.label = this.columnData.treePropsLabel || 'fullName'
        this.treeProps.children = this.columnData.treePropsChildren || 'children'
        this.getTreeView()
      } else {
        this.initData()
      }
    },
    initData() {
      if (this.isPreview) return
      this.listLoading = true
      getModelList(this.modelId, this.listQuery).then(res => {
        if (this.columnData.type === 4) {
          this.list = res.data.list.map(o => ({
            ...o,
            rowEdit: false
          }))
          this.cacheList = JSON.parse(JSON.stringify(this.list))
        } else {
          this.list = res.data.list
        }
        if (this.columnData.type !== 3 && this.columnData.hasPage) this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    getTreeView() {
      if (this.columnData.treeDataSource === "dictionary") {
        if (!this.columnData.treeDictionary) return
        getDictionaryDataSelector(this.columnData.treeDictionary).then(res => {
          this.treeData = res.data.list
          this.initData()
        })
      }
      if (this.columnData.treeDataSource === "organize") {
        this.$store.dispatch('generator/getDepTree').then(res => {
          this.treeData = res
          this.initData()
        })
      }
      if (this.columnData.treeDataSource === "department") {
        this.$store.dispatch('generator/getDepTree').then(res => {
          this.treeData = res
          this.initData()
        })
      }
      if (this.columnData.treeDataSource === "api") {
        if (!this.columnData.treePropsUrl) return
        getDataInterfaceRes(this.columnData.treePropsUrl).then(res => {
          let data = res.data.data
          if (Array.isArray(data)) {
            this.treeData = data
          } else {
            this.treeData = []
          }
          this.initData()
        })
      }
    },
    getColumnList() {
      if (this.isPreview) {
        this.columnList = this.columnData.columnList.map(o => ({
          ...o,
          visible: true
        }))
        return
      }
      let columnPermissionList = []
      if (!this.columnData.useColumnPermission) {
        columnPermissionList = this.columnData.columnList
      } else {
        const permissionList = this.$store.getters.permissionList
        const modelId = this.$route.meta.modelId
        const list = permissionList.filter(o => o.modelId === modelId)
        const columnList = list[0] && list[0].column ? list[0].column : []
        for (let i = 0; i < this.columnData.columnList.length; i++) {
          inner: for (let j = 0; j < columnList.length; j++) {
            if (this.columnData.columnList[i].prop === columnList[j].enCode) {
              columnPermissionList.push(this.columnData.columnList[i])
              break inner
            }
          }
        }
      }
      this.columnList = columnPermissionList
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
      if (this.treeActiveId == data[this.treeProps.value]) return
      this.treeActiveId = data[this.treeProps.value]
      this.$refs.Search.treeReset()
      let queryJson = {}
      if (this.columnData.treeDataSource === "organize") {
        const nodePath = this.getNodePath(node)
        const currValue = nodePath.map(o => o[this.treeProps.value])
        queryJson = { [this.columnData.treeRelation]: currValue }
      } else {
        queryJson = { [this.columnData.treeRelation]: data[this.treeProps.value] }
      }
      this.search(JSON.stringify(queryJson))
    },
    handleDel(id, index) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        if (id) {
          deleteModel(this.modelId, id).then(res => {
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000,
              onClose: () => { this.initData() }
            });
          })
        } else {
          this.list.splice(index, 1)
        }
      }).catch(() => { });
    },
    saveForRowEdit(row) {
      if (this.isPreview) return this.$message({ message: '功能预览不支持数据保存', type: 'warning' })
      let query = {
        id: row.id,
        status: 1,
        data: JSON.stringify(row)
      }
      const formMethod = query.id ? updateModel : createModel
      formMethod(this.modelId, query).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.initData()
          }
        })
      })
    },
    cancelRowEdit(row, index) {
      if (!row.id) return this.list.splice(index, 1)
      row.rowEdit = false
      let item = JSON.parse(JSON.stringify(this.cacheList[index]))
      this.$set(this.list, index, item)
    },
    addHandleForRowEdit() {
      let item = {
        rowEdit: true
      }
      for (let i = 0; i < this.columnData.columnList.length; i++) {
        let e = this.columnData.columnList[i]
        item[e.__vModel__] = item[e.__config__.defaultValue]
      }
      this.list.unshift(item)
    },
    addOrUpdateHandle(id) {
      if (this.config.webType == 3) {
        let data = {
          id: id || '',
          enCode: this.config.flowEnCode,
          flowId: this.config.flowId,
          formType: 2,
          type: 1,
          opType: '-1',
          modelId: this.modelId,
          isPreview: this.isPreview
        }
        this.flowVisible = true
        this.$nextTick(() => {
          this.$refs.FlowBox.init(data)
        })
      } else {
        this.formVisible = true
        this.$nextTick(() => {
          this.$refs.Form.init(this.formData, this.modelId, id, this.isPreview, this.columnData.useFormPermission)
        })
      }
    },
    headBtnsHandel(key) {
      if (key === 'add') {
        if (this.columnData.type === 4) {
          this.addHandleForRowEdit()
        } else {
          this.addOrUpdateHandle()
        }
      }
      if (key == 'download') {
        this.exportBoxVisible = true
        this.$nextTick(() => {
          this.$refs.ExportBox.init(this.columnList)
        })
      }
      if (this.isPreview) return
      if (key === 'batchRemove') {
        this.batchRemove()
      }
    },
    handleSelectionChange(val) {
      const res = val.map(item => item.id)
      this.multipleSelection = res
    },
    batchRemove() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: 'error',
          message: '请选择一条数据',
          duration: 1500,
        })
        return
      }
      this.$confirm('您确定要删除这些数据吗, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        batchDelete(this.modelId, this.multipleSelection).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1500,
            onClose: () => {
              this.initData()
            }
          })
        })
      }).catch(() => { })
    },
    download(data) {
      if (this.isPreview) return this.$message({ message: '功能预览不支持数据导出', type: 'warning' })
      let query = { ...this.listQuery, ...data }
      exportModel(this.modelId, query).then(res => {
        if (!res.data.url) return
        this.jnpf.downloadFile(res.data.url)
        this.$refs.ExportBox.visible = false
        this.exportBoxVisible = false
      })
    },
    columnBtnsHandel(key, row, index) {
      if (key === 'edit') {
        this.addOrUpdateHandle(row.id)
      }
      if (key === 'detail') {
        this.goDetail(row.id, row)
      }
      if (key == 'remove') {
        this.handleDel(row.id, index)
      }
    },
    goDetail(id, row) {
      if (this.config.webType == 3) {
        let data = {
          id,
          enCode: this.config.flowEnCode,
          flowId: this.config.flowId,
          formType: 2,
          type: 1,
          opType: 0,
          modelId: this.modelId,
          isPreview: this.isPreview,
          status: row.flowState
        }
        this.flowVisible = true
        this.$nextTick(() => {
          this.$refs.FlowBox.init(data)
        })
      } else {
        this.detailVisible = true
        this.$nextTick(() => {
          this.$refs.Detail.init(this.formData, this.modelId, id, this.columnData.useFormPermission)
        })
      }
    },
    sortChange({ column, prop, order }) {
      this.listQuery.sort = order == 'ascending' ? 'asc' : 'desc'
      this.listQuery.sidx = !order ? '' : prop
      this.initData()
    },
    refresh(isRefresh) {
      this.formVisible = false
      if (isRefresh) this.initData()
    },
    closeFlow(isRefresh) {
      this.flowVisible = false
      if (isRefresh) this.initData()
    },
    reset() {
      this.listQuery.sort = this.defaultListQuery.sort
      this.listQuery.sidx = this.defaultListQuery.sidx
      if (this.columnData.type === 2) {
        let obj = { [this.columnData.treeRelation]: this.treeActiveId }
        let queryJson = this.treeActiveId ? JSON.stringify(obj) : ''
        this.search(queryJson)
      } else {
        this.search('')
      }
    },
    search(queryJson) {
      if (this.isPreview) return
      if (!queryJson) this.$refs.treeBox && this.$refs.treeBox.setCurrentKey(null);
      this.listQuery.queryJson = queryJson
      this.listQuery.currentPage = 1
      this.initData()
    },
    openSuperQuery() {
      this.superQueryVisible = true
      this.$nextTick(() => {
        this.$refs.SuperQuery.init()
      })
    },
    superQuery(queryJson) {
      if (this.isPreview) return
      this.listQuery.superQueryJson = queryJson
      this.listQuery.currentPage = 1
      this.initData()
    },
    customBtnsHandel(item, row, index) {
      const parameter = {
        data: row,
        index,
        request: this.request,
        toast: this.$message,
        refresh: this.initData
      }
      const func = this.jnpf.getScriptFunc.call(this, item.func)
      if (!func) return
      func.call(this, parameter)
    },
    request(url, method, data) {
      if (!url) return
      return request({
        url: url,
        method: method || 'GET',
        data: data || {}
      })
    },
    buildOptions() {
      this.columnData.columnList.forEach(cur => {
        const config = cur.__config__
        if (dyOptionsList.indexOf(config.jnpfKey) > -1) {
          let isTreeSelect = config.jnpfKey === 'treeSelect' || config.jnpfKey === 'cascader'
          if (config.dataType === 'dictionary') {
            if (!config.dictionaryType) return
            getDictionaryDataSelector(config.dictionaryType).then(res => {
              isTreeSelect ? cur.options = res.data.list : cur.__slot__.options = res.data.list
            })
          }
          if (config.dataType === 'dynamic') {
            if (!config.propsUrl) return
            getDataInterfaceRes(config.propsUrl).then(res => {
              let data = res.data.data
              if (Array.isArray(data)) {
                isTreeSelect ? cur.options = data : cur.__slot__.options = data
              } else {
                isTreeSelect ? cur.options = [] : cur.__slot__.options = []
              }
            })
          }
        }
      })
    },
  }
}
</script>