<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="测试发送" />
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <JNPF-table class="main-table" :data="testSendData" height="100%" v-loading="loading">
        <el-table-column prop="msgTemplateName" label="模板名称" width="150"></el-table-column>
        <el-table-column prop="messageType" label="模板类型" width="150"></el-table-column>
        <el-table-column prop="toUser" label="接收人" min-width="200">
          <template slot-scope="scope" v-if="scope.row.msgType != '6'">
            <userSelect v-model="scope.row.toUser" placeholder="接收人" :value='scope.row.toUser'
              multiple clearable />
          </template>
        </el-table-column>
        <el-table-column prop="parameterData" label="参数名称" min-width="200">
          <template slot-scope="scope" v-if="scope.row.msgType != '6'">
            <div class="parameter-box" v-for="(item,index) in scope.row.paramJson" :key="index">
              {{item.field}}({{item.fieldName}})
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="parameterData" label="变量" min-width="200">
          <template slot-scope="scope" v-if="scope.row.msgType != '6'">
            <div class="variable-box" v-for="(item,index) in scope.row.paramJson" :key="index">
              <el-input v-model="item.value" placeholder="变量"></el-input>
            </div>
          </template>
        </el-table-column>
      </JNPF-table>
      <SendResults v-if="resultsVisible" ref="ResultsDialog" />
    </div>
  </transition>
</template>
<script>
import { testSendConfigInfo, testSendConfig } from '@/api/msgCenter/sendConfig'
import userSelect from '@/components/JNPF-userSelect'
import SendResults from './SendResults'
import { deepClone } from '../../../components/Generator/utils'

export default {
  components: { userSelect, SendResults },
  name: 'sendConfig-TestSend',
  data() {
    return {
      btnLoading: false,
      loading: false,
      resultsVisible: false,
      resultData: [],
      testSendData: [],
      resultList: []
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.$nextTick(() => {
        if (id) {
          this.loading = true
          testSendConfigInfo(id).then(res => {
            this.testSendData = res.data
            for (let index = 0; index < this.testSendData.length; index++) {
              item.paramJson = item.paramJson ? JSON.parse(item.paramJson) : []
              item.toUser = item.toUser || []
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    dataFormSubmit() {
      for (let index = 0; index < this.testSendData.length; index++) {
        const item = this.testSendData[index]
        if (item.toUser && !item.toUser.length && item.messageType != '6') {
          return this.$message.error(`请选${this.testSendData[index].msgTemplateName}择接收人`)
        }
      }
      let data = deepClone(this.testSendData)
      for (let index = 0; index < data.length; index++) {
        const item = data[index]
        item.paramJson = item.paramJson.length ? JSON.stringify(item.paramJson) : ''
      }
      this.btnLoading = true
      testSendConfig(data).then(res => {
        this.btnLoading = false
        this.resultList = res.data
        this.showSendResults()
      }).catch(() => {
        this.btnLoading = false
      })
    },
    showSendResults() {
      this.resultsVisible = true
      this.$nextTick(() => {
        this.$refs.ResultsDialog && this.$refs.ResultsDialog.init(this.resultList)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main-table {
  .parameter-box {
    height: 30px;
    line-height: 30px;
    margin-bottom: 8px;
  }
  .variable-box {
    margin-bottom: 8px;
  }
}
</style>