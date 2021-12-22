<template>
  <div class="comment-container">
    <el-scrollbar class="comment-list" v-loading="listLoading"
      :element-loading-text="$t('common.loadingText')">
      <template v-if="list.length">
        <div v-for="(item,i) in list" :key="i" class="item">
          <el-avatar :size="40" :src="define.comUrl + item.creatorUserHeadIcon" class="avatar" />
          <div class="item-right">
            <p class="username">{{item.creatorUserName}}</p>
            <p class="content">{{item.text}}</p>
            <div class="img-list" v-if="item.imageList.length">
              <el-image :src="define.comUrl+cItem.url" class="img-item"
                v-for="(cItem,ci) in item.imageList" :key="ci"
                :preview-src-list="getImgList(item.imageList)" :z-index="10000">
              </el-image>
            </div>
            <div class="file-List" v-if="item.fileList.length">
              <el-link :underline="false" class="file-item" v-for="(cItem,ci) in item.fileList"
                :key="ci" @click="downloadFile(cItem)">
                <i class="el-icon-document"></i>{{cItem.name}}
              </el-link>
            </div>
            <el-link :underline="false" class="del-btn" @click="delComment(item.id,i)" type="danger"
              v-if="item.isDel">删除</el-link>
          </div>
        </div>
      </template>
      <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
    </el-scrollbar>
    <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
      @pagination="initData" />
    <el-dialog title="流程评论" :visible.sync="dialogVisible" :close-on-click-modal="false"
      class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width="600px">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px">
        <el-form-item label="评论内容" prop="text">
          <el-input v-model="dataForm.text" placeholder="请输入评论内容" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <JNPF-UploadImg :limit="9" v-model="dataForm.image" />
        </el-form-item>
        <el-form-item label="文件" prop="file">
          <JNPF-UploadFz v-model="dataForm.file" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">{{$t('common.cancelButton')}}
        </el-button>
        <el-button type="primary" @click="addComment()" :loading="btnLoading">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCommentList, createComment, delComment } from '@/api/workFlow/FlowEngine'
import { getDownloadUrl } from '@/api/common'

export default {
  name: 'comments',
  props: {
    id: { type: String, default: '' },
  },
  data() {
    return {
      list: [],
      listQuery: {
        currentPage: 1,
        pageSize: 50,
        sort: 'desc',
        sidx: ''
      },
      total: 0,
      listLoading: false,
      btnLoading: false,
      dataRule: {},
      dataForm: {
        text: '',
        file: [],
        image: [],
      },
      dialogVisible: false,
    }
  },
  methods: {
    init() {
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        taskId: this.id
      }
      getCommentList(query).then(res => {
        this.list = res.data.list.map(o => ({
          ...o,
          fileList: o.file ? JSON.parse(o.file) : [],
          imageList: o.image ? JSON.parse(o.image) : [],
        }))
        this.total = res.data.pagination.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    showCommentDialog() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    getImgList(list) {
      const newList = list.map(o => this.define.comUrl + o.url)
      return newList
    },
    downloadFile(file) {
      if (!file.fileId) return
      getDownloadUrl('annex', file.fileId).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    },
    addComment() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let query = {
            text: this.dataForm.text,
            file: JSON.stringify(this.dataForm.file),
            image: JSON.stringify(this.dataForm.image),
            taskId: this.id
          }
          createComment(query).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.dialogVisible = false
                this.btnLoading = false
                this.initData()
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    },
    delComment(id, index) {
      this.$confirm(this.$t('common.delTip'), this.$t('common.tipTitle'), {
        type: 'warning'
      }).then(() => {
        delComment(id).then(res => {
          this.list.splice(index, 1)
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      }).catch(() => { });
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .comment-list {
    flex: 1;
    .item {
      padding: 0 50px;
      margin-bottom: 20px;
      display: flex;
      position: relative;
      .avatar {
        flex-shrink: 0;
        margin-right: 20px;
      }
      .item-right {
        flex: 1;
        font-size: 14px;
        padding-right: 50px;
        .username {
          line-height: 40px;
          color: #333;
        }
        .content {
          line-height: 30px;
          margin-bottom: 6px;
          color: #666;
        }
        .img-list {
          .img-item {
            width: 80px;
            height: 80px;
            overflow: hidden;
            margin: 0 6px 6px 0;
            // border: 1px solid #c0ccda;
            border-radius: 6px;
          }
        }
        .file-list {
          .file-item {
            color: #606266;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: color 0.3s;
            white-space: nowrap;
            cursor: pointer;
            margin-top: 10px;
            line-height: 25px;

            .el-icon-document {
              margin-right: 7px;
              line-height: inherit;
            }

            &:hover {
              background-color: #f5f7fa;
            }
          }
        }
        .del-btn {
          position: absolute;
          right: 50px;
          top: 0;
          line-height: 40px;
        }
      }
    }
  }
}
</style>