import { DataModelFieldList } from '@/api/systemData/dataModel'
export default {
  data() {
    return {}
  },
  methods: {
    closeDialog(isRefresh) {
      this.visible = false
      this.$emit('close', isRefresh)
    },
    prve() {
      this.activeStep -= 1
    },
    stepChick(key) {
      if (this.activeStep <= key) return
      this.activeStep = key
    },
    onDbChange() {
      this.tables = []
    },
    openTableBox() {
      if (!this.dataForm.dbLinkId) {
        this.$message({
          message: '请先选择数据库',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.formVisible = true
    },
    async colseForm(data) {
      const type = this.dataForm.type
      let queryType = 0
      if (type == 3 || type == 4 || type == 5) queryType = 1
      let checkList = []
      if (!this.tables.length) {
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          let relationTable = data[0].table
          let typeId = i == 0 ? "1" : "0"
          let res = await DataModelFieldList('0', e.table, queryType)
          let fields = res.data.list.map(o => ({ field: o.field, fieldName: o.fieldName, dataType: o.dataType }))
          let item = {
            relationField: "",
            relationTable: i == 0 ? '' : relationTable,
            table: e.table,
            tableName: e.tableName,
            tableField: '',
            typeId,
            fields
          }
          checkList.push(item)
        }
        this.relationTable = checkList[0].table
        this.mainTableFields = checkList[0].fields
        this.tables = checkList
      } else {
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          let boo = this.tables.some(o => o.table == e.table)
          if (!boo) {
            let res = await DataModelFieldList('0', e.table)
            let fields = res.data.list.map(o => ({ field: o.field, fieldName: o.fieldName, dataType: o.dataType }))
            let item = {
              relationField: "",
              relationTable: this.relationTable,
              table: e.table,
              tableName: e.tableName,
              tableField: '',
              typeId: "0",
              fields
            }
            checkList.push(item)
          }
        }
        this.tables = [...this.tables, ...checkList]
      }
    },
    delItem(row, index) {
      this.tables.splice(index, 1);
      if (row.typeId == '1' && this.tables.length) {
        this.tables[0].typeId = '1'
        this.tables[0].relationTable = ''
        this.mainTableFields = this.tables[0].fields
        this.relationTable = this.tables[0].table
      }
    },
    changeTable(row) {
      this.relationTable = row.table
      this.mainTableFields = row.fields
      for (let i = 0; i < this.tables.length; i++) {
        this.$set(this.tables[i], "typeId", this.tables[i].table === row.table ? '1' : '0')
        this.$set(this.tables[i], "relationTable", this.tables[i].table === row.table ? '' : this.relationTable)
        this.$set(this.tables[i], "relationField", "")
        this.$set(this.tables[i], "tableField", "")
      }
    },
    exist() {
      let isOk = true;
      for (let i = 0; i < this.tables.length; i++) {
        const e = this.tables[i];
        if (e.typeId == '0') {
          if (!e.tableField) {
            this.$message({
              showClose: true,
              message: `表${e.table}外键字段不能为空`,
              type: 'warning',
              duration: 1000
            });
            isOk = false
            break
          }
        }
        if (e.typeId == '0') {
          if (!e.relationField) {
            this.$message({
              showClose: true,
              message: `表${e.table}关联主键不能为空`,
              type: 'warning',
              duration: 1000
            });
            isOk = false
            break
          }
        }
      }
      return isOk;
    }
  }
}