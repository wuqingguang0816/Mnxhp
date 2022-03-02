<template>
  <div class="singleImg-container">
    <el-upload class="img-uploader" :action="define.comUploadUrl+'/'+type" :show-file-list="false"
      :on-success="handleSuccess" :headers="uploadHeaders" accept="image/*">
      <img v-if="imageUrl" :src="define.comUrl+imageUrl" class="img">
      <div class="icon-box" v-else>
        <i class="el-icon-plus img-uploader-icon"></i>
        <p class="upload-tip" v-if="tip">{{tip}}</p>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'SingleImg',
  props: {
    value: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '上传图片'
    },
    type: {
      type: String,
      default: 'annexpic'
    },
  },
  data() {
    return {
      imageUrl: '',
      uploadHeaders: { Authorization: this.$store.getters.token }
    }
  },
  watch: {
    value(val) {
      this.imageUrl = val
    }
  },
  methods: {
    handleSuccess(res, file) {
      if (res.code == 200) {
        this.imageUrl = res.data.name;
        this.$emit('input', res.data.name)
      } else {
        this.$message({ message: res.msg, type: 'error', duration: 1500 })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.singleImg-container {
  width: 100px;
  height: 100px;
  .img-uploader {
    >>> .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
  }
  .icon-box {
    position: relative;
    .upload-tip {
      position: absolute;
      font-size: 14px;
      color: #8c939d;
      left: 0;
      right: 0;
      padding: 0 5px;
      bottom: 10px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }
  }
  .img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 80px;
    text-align: center;
  }
  .img {
    width: 100px;
    height: 100px;
    display: block;
    object-fit: cover;
  }
}
</style>