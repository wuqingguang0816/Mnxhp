import { mapGetters } from "vuex"
import { Info, Create, Update } from '@/api/workFlow/workFlowForm'
import { BillNumber } from '@/api/system/billRule'

export default {
  computed: {
    ...mapGetters(['userInfo']),
  },
  data() {
    return {
      flowUrgentOptions: [{ value: 1, label: '普通' }, { value: 2, label: '重要' }, { value: 3, label: '紧急' }],
      fileList: [],
      setting: {},
      eventType: '',
      loading: true,
      userBoxVisible: false
    }
  },
  methods: {
    init(data) {
      this.loading = true
      this.dataForm.id = data.id || ''
      this.setting = data
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.beforeInit) this.beforeInit()
        if (data.id) {
          Info(this.setting.enCode, data.id).then(res => {
            this.dataForm = res.data
            if (res.data.fileJson) {
              this.fileList = JSON.parse(res.data.fileJson)
            }
            this.loading = false
          })
        } else {
          this.dataForm.flowId = data.flowId
          if (this.selfInit) this.selfInit(data)
          BillNumber(this.billEnCode).then(res => {
            if (data.enCode === 'crmOrder') {
              this.dataForm.orderCode = res.data
            } else {
              this.dataForm.billNo = res.data
            }
            this.loading = false
          })
        }
      })
    },
    getPaymentMethodOptions() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'WFSettlementMethod' }).then((res) => {
        this.paymentMethodOptions = res
      })
    },
    dataFormSubmit(eventType) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.exist && !this.exist()) return
          if ('fileJson' in this.dataForm) {
            this.dataForm.fileJson = JSON.stringify(this.fileList)
          }
          if (eventType === 'audit' || eventType === 'reject') {
            this.$emit('eventReciver', this.dataForm, eventType)
            return
          }
          this.dataForm.status = eventType === 'submit' ? 0 : 1
          this.eventType = eventType
          if (this.eventType === 'submit') {
            if (this.setting.freeApprover == 0) {
              this.$confirm('您确定要提交当前流程吗, 是否继续?', '提示', {
                type: 'warning'
              }).then(() => {
                this.submit()
              }).catch(() => {});
            } else {
              this.userBoxVisible = true
              this.$nextTick(() => {
                this.$refs.userBox.init()
              })
            }
          } else {
            this.request()
          }
        }
      })
    },
    submit(freeApproverUserId) {
      if (freeApproverUserId) this.dataForm.freeApproverUserId = freeApproverUserId
      this.request()
    },
    request() {
      if (!this.dataForm.id) delete(this.dataForm.id)
      if (this.eventType === 'save') this.$emit('setLoad', true)
      const formMethod = this.dataForm.id ? Update : Create
      formMethod(this.setting.enCode, this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            if (this.eventType === 'save') this.$emit('setLoad')
            this.$emit('close', true)
          }
        })
      }).catch(() => {
        if (this.eventType === 'save') this.$emit('setLoad')
      })
    },
    JudgeShow(id) {
      if (this.setting.opType == 4) return true
      if (!this.setting.formOperates || !this.setting.formOperates.length) return true
      let arr = this.setting.formOperates.filter(o => o.id === id) || []
      if (!arr.length) return true
      let item = arr[0]
      return item.read
    },
    JudgeWrite(id) {
      if (this.setting.readonly) return true
      if (!this.setting.formOperates || !this.setting.formOperates.length) return false
      let arr = this.setting.formOperates.filter(o => o.id === id) || []
      if (!arr.length) return true
      let item = arr[0]
      return !item.write
    }
  }
}