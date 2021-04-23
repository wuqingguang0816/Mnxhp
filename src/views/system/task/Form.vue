<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main flow-form-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" :content="!dataForm.id ? '新建任务' : '编辑任务'" />
        <div class="options">
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="14" :offset="5">
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" class="mt-20"
            label-width="100px" @submit.native.prevent>
            <el-col :span="24">
              <el-form-item label="任务名称" prop="fullName">
                <el-input v-model="dataForm.fullName" placeholder="任务名称" maxlength="100">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="任务编码" prop="enCode">
                <el-input v-model="dataForm.enCode" placeholder="任务编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Cron表达式" prop="executeContent.cron">
                <el-input v-model="dataForm.executeContent.cron" placeholder="Cron表达式" readonly>
                  <el-button slot="append" icon="el-icon-edit-outline" @click="showDialog">
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="任务类型" prop="executeType">
                <el-radio-group v-model="dataForm.executeType">
                  <el-radio label="1">请求接口</el-radio>
                  <el-radio label="2">存储过程</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <template v-if="dataForm.executeType=='1'">
              <el-col :span="24">
                <el-form-item label="请求类型" prop="executeContent.interfaceType">
                  <el-radio-group v-model="dataForm.executeContent.interfaceType">
                    <el-radio label="GET">Get</el-radio>
                    <el-radio label="POST">Post</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="请求路径" prop="executeContent.interfaceUrl">
                  <el-input v-model="dataForm.executeContent.interfaceUrl" placeholder="请求路径">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="请求参数" prop="executeContent.parameter">
                  <el-button icon="el-icon-plus" @click="addParameter()">新增参数
                  </el-button>
                  <el-row v-for="(item,i) in dataForm.executeContent.parameter" :key="i"
                    class="mt-10">
                    <el-col :span="10">
                      <el-input v-model="item.key" placeholder="请求参数名称"></el-input>
                    </el-col>
                    <el-col :span="10" :offset="1">
                      <el-input v-model="item.value" placeholder="请求参数值"></el-input>
                    </el-col>
                    <el-col :span="2" :offset="1" class="delBtn">
                      <el-button type="danger" icon="el-icon-close" @click="delParameter(i)">
                      </el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="dataForm.executeType=='2'">
              <el-col :span="24">
                <el-form-item label="数据连接" prop="executeContent.database">
                  <el-select v-model="dataForm.executeContent.database" placeholder="请选择数据库">
                    <el-option-group v-for="group in dbOptions" :key="group.label"
                      :label="group.label">
                      <el-option v-for="item in group.children" :key="item.id"
                        :label="item.fullName" :value="item.id" />
                    </el-option-group>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="存储名称" prop="executeContent.stored">
                  <el-input v-model="dataForm.executeContent.stored" placeholder="存储名称">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="请求参数" prop="executeContent.storedParameter">
                  <el-button icon="el-icon-plus" @click="addStoredParameter()">新增参数
                  </el-button>
                  <el-row v-for="(item,i) in dataForm.executeContent.storedParameter" :key="i"
                    class="mt-10">
                    <el-col :span="10">
                      <el-input v-model="item.key" placeholder="请求参数名称"></el-input>
                    </el-col>
                    <el-col :span="10" :offset="1">
                      <el-input v-model="item.value" placeholder="请求参数值"></el-input>
                    </el-col>
                    <el-col :span="2" :offset="1" class="delBtn">
                      <el-button type="danger" icon="el-icon-close" @click="delStoredParameter(i)">
                      </el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </template>
            <el-col :span="24">
              <el-form-item label="功能描述" prop="description">
                <el-input v-model="dataForm.description" placeholder="功能描述" type="textarea"
                  :rows="3" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog title="Cron表达式" :visible.sync="showCron" :close-on-click-modal="false"
        class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width="700px"
        @closed="showCrontab = false">
        <vcrontab ref="vcrontab" @hide="showCron=false" @fill="crontabFill"
          :expression="dataForm.executeContent.cron" v-if="showCrontab" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="showCron=false">{{$t('common.cancelButton')}}
          </el-button>
          <el-button type="warning" @click="resetCrontab">重 置</el-button>
          <el-button type="primary" @click="getCrontabValue">{{$t('common.confirmButton')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
import { TimeTaskInfo, TimeTaskUpdate, TimeTaskCreate } from '@/api/system/timeTask'
import { getDataSourceListAll } from '@/api/systemData/dataSource'
import { deepClone } from '@/utils'
import vcrontab from "vcrontab"
const defaultOptions = [{
  label: '',
  children: [{
    fullName: '默认数据库',
    id: '0'
  }]
}, {
  label: 'SqlServer',
  children: []
}, {
  label: 'MySql',
  children: []
}, {
  label: 'Oracle',
  children: []
}, {
  label: 'DM',
  children: []
}]
export default {
  components: { vcrontab },
  data() {
    return {
      showCron: false,
      showCrontab: true,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        executeType: '1',
        description: '',
        executeContent: {
          cron: '',
          interfaceType: 'GET',
          interfaceUrl: '',
          parameter: [],
          stored: '',
          database: '0',
          storedParameter: []
        }
      },
      dataRule: {
        fullName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' },
        ],
        enCode: [
          { required: true, message: '任务编码不能为空', trigger: 'blur' },
          { validator: this.formValidate('enCode', '任务编码只能输入英文、数字和小数点且小数点不能放在首尾'), trigger: 'blur' },
        ],
        'executeContent.cron': [
          { required: true, message: 'Cron表达式不能为空', trigger: 'click' }
        ],
        'executeContent.interfaceUrl': [
          { required: true, message: '请求路径不能为空', trigger: 'blur' },
          { type: 'url', message: '请输入正确的请求路径', trigger: 'blur' }
        ],
        'executeContent.stored': [
          { required: true, message: '存储名称不能为空', trigger: 'blur' }
        ]
      },
      formVisible: false,
      btnLoading: false,
      dbOptions: []
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.dataForm = {
        id: '',
        fullName: '',
        enCode: '',
        executeType: '1',
        description: '',
        executeContent: {
          cron: '',
          interfaceType: 'GET',
          interfaceUrl: '',
          parameter: [],
          stored: '',
          database: '0',
          storedParameter: []
        }
      }
      this.dataForm.id = id || ''
      this.dbOptions = deepClone(defaultOptions)
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        getDataSourceListAll().then(res => {
          for (let i = 0; i < res.data.list.length; i++) {
            const element = res.data.list[i];
            if (element.dbType == 'SqlServer') {
              this.dbOptions[1].children.push(element)
            } else if (element.dbType == 'MySql') {
              this.dbOptions[2].children.push(element)
            } else if (element.dbType == 'Oracle') {
              this.dbOptions[3].children.push(element)
            } else if (element.dbType == 'DM') {
              this.options[4].children.push(element)
            }
          }
          this.dbOptions = this.dbOptions.filter(o => o.children.length)
          if (this.dataForm.id) {
            TimeTaskInfo(this.dataForm.id).then(res => {
              this.dataForm.description = res.data.description
              this.dataForm.executeContent = JSON.parse(res.data.executeContent)
              this.dataForm.fullName = res.data.fullName
              this.dataForm.executeType = res.data.executeType
              this.dataForm.enCode = res.data.enCode
              this.dataForm.sortCode = res.data.sortCode
            })
          } else {
            this.dataForm.enCode = ''
          }
        })
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          let executeContent = JSON.stringify(this.dataForm.executeContent)
          let query = { ...this.dataForm, executeContent }
          const formMethod = this.dataForm.id ? TimeTaskUpdate : TimeTaskCreate
          formMethod(query).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('close', true)
              }
            })
          }).catch(() => { this.btnLoading = false })
        }
      })
    },
    delParameter(i) {
      this.dataForm.executeContent.parameter.splice(i, 1)
    },
    addParameter() {
      let item = { key: "", value: "" }
      this.dataForm.executeContent.parameter.push(item)
    },
    delStoredParameter(i) {
      this.dataForm.executeContent.storedParameter.splice(i, 1)
    },
    addStoredParameter() {
      let item = { key: "", value: "" }
      this.dataForm.executeContent.storedParameter.push(item)
    },
    getCrontabValue() {
      this.$refs.vcrontab && this.$refs.vcrontab.submitFill()
    },
    resetCrontab() {
      this.$refs.vcrontab && this.$refs.vcrontab.clearCron()
    },
    crontabFill(value) {
      this.dataForm.executeContent.cron = value
    },
    showDialog() {
      this.showCron = true
      this.showCrontab = true
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  padding: 10px 10px 0 !important;
}
>>> .popup-main {
  .pop_btn {
    display: none !important;
  }
  .popup-result:nth-child(2) {
    margin-bottom: 2px;
  }
}
.delBtn {
  text-align: right;
}
</style>
