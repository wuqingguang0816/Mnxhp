import { getVisualDevInfo, Update, Create } from '@/api/onlineDev/visualDev'
import commonMixin from '@/mixins/generator/common'
export default {
  mixins: [commonMixin],
  data() {
    return {
      visible: false,
      loading: false,
      activeStep: 0,
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        type: 1,
        state: 1,
        category: '',
        description: "",
        tables: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        enCode: [
          { required: true, message: '编码不能为空', trigger: 'blur' },
          { validator: this.formValidate('enCode'), trigger: 'blur' },
        ],
        category: [
          { required: true, message: '分类不能为空', trigger: 'change' },
        ],
        state: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      },
      tables: [],
      formVisible: false,
      btnLoading: false,
      formData: null,
      columnData: null,
      categoryList: [],
      mainTableFields: [],
      relationTable: ""
    }
  },
  methods: {
    init(categoryList, id, type) {
      this.categoryList = categoryList
      this.activeStep = 0
      this.tables = []
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.loading = true
          getVisualDevInfo(this.dataForm.id).then(res => {
            this.loading = false
            this.dataForm = res.data
            this.formData = this.dataForm.formData && JSON.parse(this.dataForm.formData)
            this.columnData = this.dataForm.columnData && JSON.parse(this.dataForm.columnData)
            this.tables = this.dataForm.tables && JSON.parse(this.dataForm.tables) || []
            if (!this.tables.length) return
            let mainTable = this.tables.filter(o => o.typeId == '1')[0]
            this.mainTableFields = mainTable.fields
            this.relationTable = mainTable.table

          }).catch(() => { this.loading = false })
        } else {
          this.dataForm.type = type
        }
      })
    },
    dataFormSubmit() {
      this.$refs['columnDesign'].getData().then(res => {
        this.btnLoading = true
        this.columnData = res.columnData
        this.dataForm.formData = JSON.stringify(this.formData)
        this.dataForm.columnData = JSON.stringify(this.columnData)
        this.dataForm.tables = JSON.stringify(this.tables)
        const formMethod = this.dataForm.id ? Update : Create
        formMethod(this.dataForm).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.closeDialog(true)
            }
          })
        }).catch(() => { this.btnLoading = false })
      }).catch(err => {
        err.msg && this.$message.warning(err.msg)
      })
    },
    next() {
      if (this.activeStep < 1) {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const type = this.dataForm.type
            if (!this.tables.length) {
              if (type == 3 || type == 4 || type == 5) {
                this.$message.warning('请至少选择一个数据表')
                return
              }
              this.$store.commit('generator/SET_TABLE', false)
              this.activeStep += 1
            } else {
              if (!this.exist()) return
              let subTable = this.tables.filter(o => o.typeId == '0')
              this.$store.commit('generator/UPDATE_SUB_TABLE', subTable)
              this.$store.commit('generator/SET_TABLE', true)
              this.$store.commit('generator/UPDATE_FORMITEM_LIST', this.mainTableFields)
              this.activeStep += 1
            }
          }
        })
      } else {
        this.$refs['generator'].getData().then(res => {
          this.formData = res.formData
          this.activeStep += 1
        }).catch(err => {
          err.msg && this.$message.warning(err.msg)
        })
      }
    }
  }
}