<template>
  <el-dialog title="查看成员" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body width="600px"
    :modal-append-to-body="false">
    <div class="transfer__body">
      <div class="transfer-pane">
        <div class="transfer-pane__tools">
          <el-input placeholder="请输入关键词查询" v-model="listQuery.keyword" @keyup.enter.native="search"
            clearable class="search-input">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <div class="transfer-pane__body shadow right-pane" ref="list">
          <template v-if="list.length">
            <div v-for="(item,index) in list" :key="index" class="selected-item-user">
              <div class="selected-item-main">
                <el-avatar :size="36" :src="define.comUrl+item.headIcon"
                  class="selected-item-headIcon">
                </el-avatar>
                <div class="selected-item-text">
                  <p class="name">{{item.realName}}
                  </p>
                  <p class="organize" :title="item.organize">{{item.organize}}</p>
                </div>
              </div>
            </div>
          </template>
          <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  getUserList
} from '@/api/permission/user'
import { removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  name: 'useSelect',
  data() {
    return {
      visible: false,
      list: [],
      listQuery: {
        organizeId: '',
        keyword: '',
        currentPage: 1,
        pageSize: 20
      },
      finish: false,
      loading: false
    }
  },
  beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
  },
  methods: {
    init(id) {
      this.visible = true
      this.list = []
      this.listQuery.organizeId = id
      this.search()
      this.finish = false
      this.$nextTick(() => {
        this.bindScroll()
      })
    },
    search() {
      this.finish = false
      this.listQuery.currentPage = 1
      this.listQuery.pageSize = 20
      this.listQuery.sort = 'desc'
      this.initData()
    },
    reset() {
      this.listQuery.keyword = ''
      this.search()
    },
    initData() {
      getUserList(this.listQuery).then(res => {
        if (res.data.list.length < this.listQuery.pageSize) this.finish = true
        this.list = [...this.list, ...res.data.list]
      }).catch(() => {
      })
    },
    bindScroll() {
      let _this = this,
        vBody = _this.$refs.list;
      vBody.addEventListener("scroll", function () {
        if (vBody.scrollHeight - vBody.clientHeight - vBody.scrollTop <= 200 && !_this.finish) {
          _this.listQuery.currentPage += 1
          _this.initData()
        }
      });
    },
    confirm() {
      this.visible = false
    },
    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },
  },
}
</script>
<style lang="scss" scoped>
>>> .transfer__body {
  line-height: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  margin-top: -10px;
  height: 400px;
}
.transfer__body .transfer-pane {
  width: 570px;
}
.transfer__body .selected-item-user .selected-item-text {
  width: 480px;
  margin-left: 10px;
}
.JNPF-dialog.JNPF-dialog_center .el-dialog .el-dialog__body {
  overflow: auto;
  overflow-x: hidden;
  max-height: 90vh;
  padding: 20px 50px 2px;
}
</style>