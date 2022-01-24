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
    <el-dialog title="候选人员" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body
      width="800px" :modal-append-to-body="false" @close="onClose">
      <div class="transfer__body" :element-loading-text="$t('common.loadingText')">
        <div class="transfer-pane">
          <div class="transfer-pane__tools">
            <el-input placeholder="请输入关键词查询" v-model="listQuery.keyword"
              @keyup.enter.native="search" clearable class="search-input">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
          <div class="transfer-pane__body left-pane">
            <div class="single-list" ref="candidate">
              <template v-if="list.length">
                <div v-for="(item, index) in list" :key="index" class="selected-item"
                  @click="handleNodeClick(item)">
                  <span>{{ item.userName}}</span>
                </div>
              </template>
              <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
            </div>
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
                <span>{{ item.userName}}</span>
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
import { CandidateUser } from '@/api/workFlow/FlowBefore'
export default {
  name: 'CandidateUser',
  props: {
    value: {
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
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    taskId: {
      type: String,
      default: ''
    },
    nodeId: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      visible: false,
      innerValue: '',
      loading: false,
      listQuery: {
        keyword: '',
        currentPage: 1,
        pageSize: 20,
      },
      total: 0,
      list: [],
      listLoading: true,
      selectedData: [],
      finish: false,
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
    onClose() { },
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
      this.finish = false
      this.listQuery.keyword = ''
      this.$nextTick(() => {
        this.bindScroll()
        this.search()
        this.setDefault()
      })
    },
    confirm() {
      let txt = '', ids = ''
      for (let i = 0; i < this.selectedData.length; i++) {
        txt += (i ? ',' : '') + this.selectedData[i].userName
        ids += (i ? ',' : '') + this.selectedData[i].userId
      }
      this.innerValue = txt
      this.$emit('input', ids)
      this.$emit('change', ids, this.selectedData)
      this.visible = false
    },
    bindScroll() {
      let _this = this,
        vBody = _this.$refs.candidate;
      vBody.addEventListener("scroll", function () {
        if (vBody.scrollHeight - vBody.clientHeight - vBody.scrollTop <= 200 && !_this.listLoading && !_this.finish) {
          _this.listQuery.currentPage += 1
          _this.initData()
        }
      });
    },
    search() {
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.list = []
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        formData: this.formData,
        nodeCode: this.nodeId
      }
      CandidateUser(this.taskId || 0, query).then((res) => {
        if (res.data.list.length < this.listQuery.pageSize) {
          this.finish = true
        }
        this.list = [...this.list, ...res.data.list]
        this.total = res.data.pagination.total
        this.listLoading = false
      })
    },
    handleNodeClick(item) {
      const boo = this.selectedData.some(o => o.userId === item.userId)
      if (boo) return
      this.multiple ? this.selectedData.push(item) : this.selectedData = [item]
    },
    removeAll() {
      this.selectedData = []
    },
    removeData(index) {
      this.selectedData.splice(index, 1)
    },
    setDefault() {
      if (!this.value || !this.value.length) {
        this.innerValue = ''
        this.selectedData = []
      }
    }
  },
}
</script>