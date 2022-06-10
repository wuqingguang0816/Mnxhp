<template>
  <div class="JNPF-preview-main">
    <div class="JNPF-common-page-header">
      <el-page-header @back="goBack" content="接口认证" />
      <div class="options">
        <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
      </div>
    </div>

    <el-row class="main" style="overflow: auto">
      <el-col :span="22" :offset="1">
        <group-title content="基本信息" />
      </el-col>
      <el-col :span="14" :offset="5" class="mb-10">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" class="mt-20" label-width="100px" @submit.native.prevent>
          <el-form-item label="appId" prop="appId">
            <el-input v-model="dataForm.appId" placeholder="输入appId" maxlength="100">
            </el-input>
          </el-form-item>
          <el-form-item label="应用名称" prop="appName">
            <el-input v-model="dataForm.appName" placeholder="输入应用名称"></el-input>
          </el-form-item>
          <el-form-item label="appSecret" prop="appSecret">
            <el-input v-model="dataForm.appSecret" placeholder="输入appSecret" show-password>
              <el-button slot="append" style="background-color: #c8c9cc;color:#FFF;" disabled>获取秘钥</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="使用期限" prop="usefulLife">
            <div slot="label">使用期限
              <el-tooltip content="未选择日期默认永久有效" placement="top">
                <a class="el-icon-warning-outline"></a>
              </el-tooltip>
            </div>
            <el-date-picker v-model="dataForm.usefulLife" type="date" placeholder="请选择" style="width:100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="白名单" prop="whiteList">
            <el-input v-model="dataForm.whiteList" placeholder="" type="textarea" :rows="5" />
            <span style="color:#C0C4CC">多个IP设置，用英文符号隔开，如192.168.0.1,192.168.0.2</span>
          </el-form-item>
          <el-form-item label="排序" prop="sortCode">
            <el-input-number v-model="dataForm.sortCode" controls-position="right" @change="handleChange" :min="0" style="width:25%"></el-input-number>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch v-model="dataForm.status" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="说明" prop="description">
            <el-input v-model="dataForm.description" placeholder="" type="textarea" :rows="5" />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="22" :offset="1">
        <group-title content="接口集合" />
      </el-col>

      <el-col :span="20" :offset="2" class="mt-20">
        <el-table v-loading="listLoading" :data="tableList">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-col :span="20" :offset="2">
                <JNPF-table v-loading="listLoading2" :data="props.row.paramList">
                  <el-table-column prop="field" label="参数名称" width="300" align="center" />
                  <el-table-column prop="dataType" label="参数类型" min-width="300" align="center" />
                  <el-table-column prop="defaultValue" label="默认值" width="300" align="center" />
                </JNPF-table>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column prop="fullName" label="接口名称" width="300" />
          <el-table-column prop="enCode" label="接口编码" width="300" />
          <el-table-column prop="url" label="接口地址" min-width="300" show-overflow-tooltip />
          <el-table-column prop="status" label="接口类型" width="200">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.dataType==1">静态数据</el-tag>
              <el-tag type="success" v-if="scope.row.dataType==2">SQL操作</el-tag>
              <el-tag type="warning" v-if="scope.row.dataType==3">API操作</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col class="mt-50"></el-col>
    </el-row>
  </div>
</template>

<script>
import { getInterfaceList } from '@/api/systemData/interfaceIdentification.js'

export default {
  data() {
    return {
      btnLoading: false,
      dataForm: {
        sortCode: 0,
        status: 1,
      },
      dataRule: {
        appId: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        appName: [
          {
            required: true,
            message: '应用名称不能为空',
            trigger: 'blur'
          }
        ],
        appSecret: [
          {
            required: true,
            message: 'appSecret不能为空',
            trigger: 'blur'
          }
        ],
      },
      listLoading: false,
      listLoading2: false,
      tableList: [],
      tenantId: '',
      options: [
        { label: '字符串', value: 'varchar' },
        { label: '整型', value: 'int' },
        { label: '日期时间', value: 'datetime' },
        { label: '浮点', value: 'decimal' },
        { label: '长整型', value: 'bigint' },
        { label: '文本', value: 'text' }
      ],
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(data) {
      if (data) {
        this.initData(data)
      }
    },

    initData(data) {
      this.dataForm = data
      this.setInterfaceData()
    },
    handleChange(value) {
      console.log(value);
    },
    setInterfaceData() {
      this.tenantId = this.dataForm.tenantId ? this.dataForm.tenantId : ''
      getInterfaceList(this.dataForm.id).then(res => {
        if (res.data.list) {
          let arr = []
          res.data.list.forEach(item => {
            item.url = `${this.define.comUrl}/api/system/DataInterface/${item.id}/Actions/Response` + (this.tenantId ? '?tenantId=' + this.tenantId : '')
            item.paramList = [...JSON.parse(item.requestParameters)]
            if (item.paramList.length > 0) {
              item.paramList.forEach(elem => {
                this.options.forEach(elm2 => {
                  if (elm2.value == elem.dataType) {
                    elem.dataType = elm2.label
                  }
                })

              })
            }
          })

          this.tableList = res.data.list
          console.log(" this.tableList", this.tableList)
        }
      })
    },

  }
}
</script>
<style lang="scss" scoped>
.main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px;
  >>> .el-table {
    flex: 1;
    border-top: none;
  }
}
.demo-table-expand {
  font-size: 0;
}
.mt-50 {
  margin-top: 50px;
}
</style>