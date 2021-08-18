import { mapGetters } from "vuex"
import { Info } from '@/api/workFlow/workFlowForm'
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
      loading: false,
    }
  },
  methods: {
    init(data) {
      this.dataForm.id = data.id || ''
      this.setting = data
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.beforeInit) this.beforeInit()
        if (data.id) {
          if (this.selfGetInfo && typeof this.selfGetInfo === "function") return this.selfGetInfo()
          Info(this.setting.enCode, data.id).then(res => {
            this.dataForm = res.data
            if (res.data.fileJson) {
              this.fileList = JSON.parse(res.data.fileJson)
            }
            this.$emit('setPageLoad')
          })
        } else {
          this.dataForm.flowId = data.flowId
          if (this.selfInit) this.selfInit(data)
          if (!this.billEnCode) return this.$emit('setPageLoad')
          BillNumber(this.billEnCode).then(res => {
            if (data.enCode === 'crmOrder') {
              this.dataForm.orderCode = res.data
            } else {
              this.dataForm.billNo = res.data
            }
            this.$emit('setPageLoad')
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
      this.eventType = eventType
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.exist && !this.exist()) return
          if ('fileJson' in this.dataForm) {
            this.dataForm.fileJson = JSON.stringify(this.fileList)
          }
          if (eventType === 'save' || eventType === 'submit') {
            if (this.selfSubmit && typeof this.selfSubmit === "function") {
              this.selfSubmit(this.dataForm)
              return
            }
          }
          this.$emit('eventReciver', this.dataForm, eventType)
        }
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