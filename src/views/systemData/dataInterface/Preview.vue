<template>
  <div class="JNPF-preview-main">
    <div class="JNPF-common-page-header">
      <el-page-header @back="goBack" content="接口预览" />
      <div class="options">
        <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>
    <el-form ref="dataForm" class="main" label-position="top" v-loading="formLoading">
      <el-form-item label="Request URL">
        <el-input v-model="url" style="width: 1577px;margin-right: 10px">
          <template slot="prepend">GET</template>
        </el-input>
        <el-button type="primary" @click="test">测试接口</el-button>
      </el-form-item>
      <el-form-item label="Request Param" v-if="inputList.length>0">
        <el-row v-for="(item, index) in inputList" :key="index">
          <el-col :span="5">
            <el-input v-model="item.field" :fetch-suggestions="querySearch" placeholder="key"
              clearable style="width:100%" readonly />
          </el-col>
          <el-col :span="18" style="margin-left: 20px ;width: 1300px">
            <el-input v-model="item.defaultValue" placeholder="value" clearable />
          </el-col>
        </el-row>
      </el-form-item>
      <template>
      </template>
      <el-form-item label="Response Body" class="value-item">
        <el-input v-model="responseData" type="textarea" :rows="30" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { previewDataInterface, testInterface } from '@/api/systemData/dataInterface'

export default {
  data() {
    return {
      title: '',
      formLoading: false,
      responseData: '',
      url: '',
      options: {
        readOnly: true,
        language: 'json'
      },
      inputList: [],
      tenantId: ''
    }
  },
  methods: {
    test() {
      testInterface(this.id, this.inputList, this.tenantId).then(res => {
        let data = res
        this.responseData = JSON.stringify(data, null, 4)
      }).catch(() => {
        this.formLoading = false
      })
    },
    goBack() {
      this.$emit('close')
    },
    init(id, tenantId) {
      this.id = id || ''
      this.tenantId = tenantId || ''
      this.formLoading = true
      this.responseData = ''
      this.$nextTick(() => {
        this.url = `${this.define.comUrl}/api/system/DataInterface/${id}/Actions/Response` + (tenantId ? '?tenantId=' + tenantId : '')
        previewDataInterface(this.id).then(res => {
          this.inputList = res.data
          this.formLoading = false
        }).catch(() => {
          this.formLoading = false
        })
      })

    },
  }
}
</script>
<style lang="scss" scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .value-item {
    flex: 1;
    margin-bottom: 0;
    >>> .el-form-item__content {
      height: calc(100% - 32px);
      .el-textarea {
        height: 100%;
        .el-textarea__inner {
          height: 100%;
        }
      }
    }
  }
}
</style>