<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新建' : '编辑'" :close-on-click-modal="false"
      :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px"
      append-to-body>
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="dataForm.type" placeholder="请选择" clearable filterable>
            <el-option v-for="item in typeOptions" :key="item.id" :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度" prop="urgent">
          <el-select v-model="dataForm.urgent" placeholder="请选择" filterable>
            <el-option v-for="item in urgentList" :key="item.id" :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="dataForm.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="dataForm.content" placeholder="内容" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="全天" prop="allDay">
          <el-switch v-model="dataForm.allDay" :active-value="1" :inactive-value="0"
            @change="change_providerType">
          </el-switch>
        </el-form-item>
        <el-form-item label="开始时间" prop="startDay">
          <el-col :span="14">
            <el-date-picker v-model="dataForm.startDay" type="date" placeholder="请选择开始日期"
              :editable="false" :clearable="false" format="yyyy-MM-dd" value-format="timestamp">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-time-select placeholder="请选择开始时间" v-model="dataForm.startTime" :picker-options="{
       start: '00:00',step: '00:05',end: '23:55'}" style="width:166px;" v-if="dataForm.allDay==0">
            </el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="时长" prop="duration" v-if="dataForm.duration!=-1&&dataForm.allDay==0">
          <el-select v-model="dataForm.duration" placeholder="请选择" clearable
            @change="durationChange">
            <el-option v-for="item in durationList" :key="item.id" :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDay" v-if='dataForm.duration==-1||dataForm.allDay'>
          <el-col :span="14">
            <el-date-picker v-model="dataForm.endDay" type="date" placeholder="请选择结束日期"
              :editable="false" :clearable="false" format="yyyy-MM-dd" value-format="timestamp">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-time-select placeholder="请选择结束时间" v-model="dataForm.endTime" :picker-options="{
       start: '00:00',step: '00:05',end: '23:55'}" style="width:166px;" v-if="dataForm.allDay==0">
            </el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="创建人" prop="creatorUserId">
          <user-select v-model="dataForm.creatorUserId" placeholder="创建人" disabled />
        </el-form-item>
        <el-form-item label="参与人" prop="toUserIds">
          <user-select v-model="dataForm.toUserIds" placeholder="请选择参与人" multiple clearable />
        </el-form-item>
        <el-form-item label="标签颜色" prop="color">
          <el-color-picker v-model="dataForm.color"
            :predefine="['#188ae2', '#35b8e0', '#26bf8c','#f9c851','#ff5b5b', '#5b69bc', '#ff8acc', '#3b3e47','#282828' ]" />
        </el-form-item>
        <el-form-item label="提醒时间" prop="reminderTime">
          <el-select v-model="dataForm.reminderTime" placeholder="请选择" filterable>
            <el-option v-for="item in reminderTimeList" :key="item.id" :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <template v-if="dataForm.reminderTime!=-2">
          <el-form-item label="提醒方式" prop="reminderType">
            <el-select v-model="dataForm.reminderType" placeholder="请选择" filterable>
              <el-option v-for="item in remindList" :key="item.id" :label="item.fullName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送配置" prop="send" v-if="dataForm.reminderType==2">
            <msg-dialog :value="dataForm.send" :title="dataForm.sendName" @change="onMsgChange"
              :messageSource="4" />
          </el-form-item>
        </template>
        <el-form-item label="重复提醒" prop="repetition">
          <el-select v-model="dataForm.repetition" placeholder="请选择" filterable>
            <el-option v-for="item in repeatReminderList" :key="item.id" :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结束重复" prop="repeatTime" v-if='dataForm.repetition!="1"'>
          <el-date-picker v-model="dataForm.repeatTime" type="date" placeholder="选择日期时间" clearable
            format="yyyy-MM-dd" value-format="timestamp">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleDel()" v-if="dataForm.id">删 除</el-button>
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="删除确认" :close-on-click-modal="false" :visible.sync="delVisible"
      class="JNPF-dialog JNPF-dialog_center dialog-form" lock-scroll width="380px" append-to-body>
      <div style="margin-bottom: 20px;">此为重复日程，将删除（含参与人）应用于</div>
      <template v-for="(item, i) in tableList">
        <div :key="i" style="margin-bottom: 10px;color: #303133">
          <el-radio :label="item.id" v-model="checked">&nbsp;</el-radio>{{item.fullName}}
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="handleDel()" :loading="btnLoading">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑确认" :close-on-click-modal="false" :visible.sync="updateVisible"
      class="JNPF-dialog JNPF-dialog_center dialog-form" lock-scroll width="380px" append-to-body>
      <div style="margin-bottom: 10px;">此为重复日程，将修改应用于</div>
      <template v-for="(item, i) in tableList">
        <div :key="i" style="margin-bottom: 10px;color: #303133" v-if="item.id!=0">
          <el-radio :label="item.id" v-model="checked">&nbsp;</el-radio>{{item.fullName}}
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit(1)" :loading="btnLoading">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MsgDialog from "./msgDialog";
import { ScheduleInfo, ScheduleUpdate, ScheduleCreate, ScheduleDelete } from '@/api/onlineDev/schedule'
export default {
  components: { MsgDialog },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('结束时间不能为空'));
      } else {
        if (this.dataForm.startDay == value && this.dataForm.startTime > this.dataForm.endTime) {
          callback(new Error('结束时间必须晚于开始时间'));
        }
        if (this.dataForm.startDay > value) {
          callback(new Error('结束时间必须晚于开始时间'));
        }
        callback();
      }
    }
    return {
      visible: false,
      btnLoading: false,
      dataForm: {
        id: 0,
        type: '',
        creatorUserId: '',
        userName: '',
        allDay: 0,
        urgent: '1',
        startDay: '',
        startTime: '',
        endDay: '',
        endTime: '',
        duration: 60,
        content: '',
        title: '',
        toUserIds: [],
        reminderTime: -2,
        reminderType: '1',
        send: '',
        sendName: '',
        repetition: '1',
        repeatTime: '',
        color: '#188ae2'
      },
      repetitionType: false,
      checked: '',
      delVisible: false,
      updateVisible: false,
      dataRule: {
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请选择时长', trigger: 'change' }
        ],
        startDay: [
          { required: true, message: '起始时间不能为空', trigger: 'change' }
        ],
        endDay: [
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        repeatTime: [
          { required: true, message: '结束重复时间不能为空', trigger: 'change' }
        ],
        send: [
          { required: true, message: '发送配置不能为空', trigger: 'change' }
        ],
        reminderType: [
          { required: true, message: '提醒方式不能为空', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '提醒方式不能为空', trigger: 'change' }
        ],
      },
      urgentList: [
        {
          id: "1",
          fullName: '普通'
        }, {
          id: '2',
          fullName: '重要'
        }, {
          id: '3',
          fullName: '紧急'
        }
      ],
      durationList: [
        {
          id: 30,
          fullName: '30分钟'
        }, {
          id: 60,
          fullName: '1小时'
        }, {
          id: 90,
          fullName: '1小时30分钟'
        }, {
          id: 120,
          fullName: '2小时'
        }, {
          id: 180,
          fullName: '3小时'
        }, {
          id: -1,
          fullName: '自定义'
        }
      ],
      typeOptions: [],
      tableList: [
        {
          id: 1,
          fullName: '此日程'
        }, {
          id: 2,
          fullName: '此日程及后续'
        },
        //  {
        //   id: 3,
        //   fullName: '所有日程'
        // }
      ],
      reminderTimeList: [
        {
          id: -2,
          fullName: '不提醒'
        }, {
          id: -1,
          fullName: '开始时'
        }, {
          id: 5,
          fullName: '提前5分钟'
        }, {
          id: 10,
          fullName: '提前10分钟'
        }, {
          id: 15,
          fullName: '提前15分钟'
        }, {
          id: 30,
          fullName: '提前30分钟'
        }
        , {
          id: 60,
          fullName: '提前1小时'
        }
        , {
          id: 120,
          fullName: '提前2小时'
        }
        , {
          id: 1440,
          fullName: '一天前'
        }
      ],
      remindList: [
        {
          id: '1',
          fullName: '默认'
        }, {
          id: '2',
          fullName: '自定义'
        }
      ],
      repeatReminderList: [
        {
          id: '1',
          fullName: '不重复'
        }, {
          id: '2',
          fullName: '每天重复'
        }, {
          id: '3',
          fullName: '每周重复'
        }, {
          id: '4',
          fullName: '每月重复'
        }, {
          id: '5',
          fullName: '每年重复'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {

  },
  methods: {
    init(id, startTime) {
      this.dataForm.id = id || 0
      this.visible = true
      this.dataForm.type = ''
      this.delVisible = false
      this.updateVisible = false
      this.repetitionType = false
      this.getDictionaryData()
      this.dataForm.endTime = ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          ScheduleInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            if (this.dataForm.repetition != "1") return this.repetitionType = true
          })
        } else {
          this.dataForm.creatorUserId = this.userInfo.userId
          this.dataForm.toUserIds = ''
          this.dataForm.startDay = startTime || ''
          this.dataForm.endDay = startTime || ''
          this.dataForm.color = '#188ae2'
          this.dataForm.reminderTime = -2
          this.dataForm.duration = 60
          let time = this.jnpf.toDate(new Date(), "HH")
          this.dataForm.startTime = (Number(time) + 1) < 10 ? '0' + (Number(time) + 1) + ':00' : (Number(time) + 1) + ':00'
          this.dataForm.endTime = (Number(time) + 2) < 10 ? '0' + (Number(time) + 2) + ':00' : (Number(time) + 2) + ':00'
        }
      })
    },
    durationChange() {
      let arr = this.dataForm.startTime.split(":")
      let time = Number(arr[0]) + 1
      if (Number(time) == 24) {
        time = 0
      }
      this.dataForm.endDay = this.dataForm.startDay
      this.dataForm.endTime = time < 10 ? '0' + time + ':' + arr[1] : time + ':' + arr[1]
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'scheduleType' }).then((res) => {
        this.typeOptions = res
        if (this.typeOptions.length) this.dataForm.type = this.typeOptions[0].id
      })
    },
    change_providerType() {
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate('duration')
      })
    },
    onMsgChange(id, item) {
      if (!id) {
        this.dataForm.send = ''
        this.dataForm.sendName = ''
        return
      }
      if (this.dataForm.send === id) return
      this.dataForm.send = id
      this.dataForm.sendName = item.fullName
    },
    dataFormSubmit(type) {
      if (type == 1) {
        if (!this.checked) return this.$message.warning('请选择日程')
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.allDay) {
            if (!this.dataForm.startTime) return this.$message({ message: '开始时间不能为空', type: 'error' })
          }
          if (!this.allDay && this.dataForm.duration == -1) {
            if (!this.dataForm.endTime) return this.$message({ message: '结束日期不能为空', type: 'error' })
          }
          if (this.dataForm.allDay == 1) {
            if (this.dataForm.startDay > this.dataForm.endDay) {
              return this.$message({ message: '开始时间不能大结束时间', type: 'error' })
            }
          }
          if (this.dataForm.repetition != -1 && (this.dataForm.startDay == this.dataForm.endDay)) {
            if (this.dataForm.startTime == this.dataForm.endTime) return this.$message({ message: '开始时间与结束结束重复', type: 'error' })
          }
          const formMethod = this.dataForm.id ? ScheduleUpdate : ScheduleCreate
          if (this.dataForm.id && this.repetitionType) {
            if (!this.updateVisible) {
              this.updateVisible = true
            } else {
              formMethod(this.dataForm, this.checked).then(res => {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.btnLoading = false
                    this.$emit('refreshDataList')
                  }
                })
              }).catch(() => { })
            }
          } else {
            this.btnLoading = true
            if (!this.dataForm.id) delete (this.dataForm.id)
            formMethod(this.dataForm, 3).then(res => {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.btnLoading = false
                  this.$emit('refreshDataList')
                }
              })
            }).catch(() => { this.btnLoading = false })
          }
        }
      })
    },
    handleDel() {
      if (this.repetitionType) {
        if (!this.delVisible) {
          this.delVisible = true
        } else {
          if (!this.checked) return this.$message.warning('请选择日程')
          ScheduleDelete(this.dataForm.id, this.checked).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
            })
            this.delVisible = false
            this.visible = false
            this.$emit('refreshDataList')
          })
        }
      } else {
        this.$confirm('此操作将永久删除此日程，同时删除所有参与人的日程，是否继续？', '提示', {
          type: 'warning'
        }).then(() => {
          ScheduleDelete(this.dataForm.id, 3).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
            })
            this.visible = false
            this.$emit('refreshDataList')
          })
        }).catch(() => { });
      }

    },
  }
}
</script>
<style lang="scss" scoped>
.dialog-form {
  >>> .el-dialog__body {
    padding: 20px 21px 2px !important;
  }
}
</style>
