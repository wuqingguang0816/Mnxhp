<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form>
          <!-- <el-col :span="5">
            <el-form-item label="事业部">
              <el-select v-model="form.SYB" @change="getGC" filterable placeholder="请选择">
                <el-option v-for="item in sybList" :key="item.SYBNAME" :label="item.SYBNAME" :value="item.SYBNAME">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="工厂">
              <el-select v-model="form.FACTORY" filterable placeholder="请选择">
                <el-option v-for="item in GCList" :key="item.CODE" :label="item.NAME" :value="item.CODE">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="移库时间">
              <el-date-picker v-model="date" :clearable="false" value-format="yyyy-MM-dd" type="daterange" align="right"
                unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                :picker-options="$pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{ $t('common.search') }}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{ $t('common.reset') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main" style="padding: 10px;">
        <JNPF-table v-loading="listLoading" :data="list.slice(
          (listQuery.currentPage - 1) * listQuery.pageSize,
          listQuery.currentPage * listQuery.pageSize
        )">
          <el-table-column align="center" prop="F_SKU_ID" label="工厂物料ID" />
          <el-table-column align="center" prop="F_SKU_CODE" label="工厂物料编码" width="200" />
          <el-table-column align="center" prop="SKU_NAME" label="物料名称" width="100" />
          <el-table-column align="center" prop="SKU_NAME_S" label="物料名称简称" width="120" />
          <el-table-column align="center" prop="SKU_NAME_EN" label="物料英文名称" width="120" />
          <el-table-column align="center" prop="ND" label="浓度" width="70" />
          <el-table-column align="center" prop="SKU_TYPE_NAME" label="等级名称" width="120" />
          <el-table-column align="center" prop="SKU_LEVEL" label="化学品分类等级" width="120" />
          <el-table-column align="center" prop="SKU_GROUP" label="物料分类" width="120" />
          <el-table-column align="center" prop="INSIDE_COUNT" label="规格" width="120" />
          <el-table-column align="center" prop="INSIDE_UINT" label="规格单位" width="120" />
          <el-table-column align="center" prop="SKU_UNIT" label="物品单位" width="120" />
          <el-table-column align="center" prop="M_QTY" label="数量" width="120" />
          <el-table-column align="center" prop="BATCH" label="批次" width="120" />
          <el-table-column align="center" prop="P_DATE" label="生产日期" width="120" />
          <el-table-column align="center" prop="E_DATE" label="有效日期" width="120" />
          <el-table-column align="center" prop="M_NAME" label="生产商" width="120" />
          <el-table-column align="center" prop="S_NAME" label="供应商" width="120" />
          <el-table-column align="center" prop="ORCODE" label="二维码编号" width="120" />
          <el-table-column align="center" prop="CREATE_ON" label="创建时间" width="120" />
          <el-table-column align="center" prop="CREATE_BY" label="创建人" width="120" />
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
          @pagination="initData" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Yiku',
  data() {
    return {
      list: [],
      date: this.$timeDate,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    search() {
      this.initData()
    },
    reset() {
      this.date = this.$timeDate
      this.search()
    },
    initData() {
      this.listLoading = true
      var startTime = '', endTime = ''
      if (this.date) {
        startTime = this.date[0]
        endTime = this.date[1]
      }
      let query =
      {
        "paramList":
          [{ "field": "startTime", "fieldName": "开始时间", "dataType": "varchar", "required": 0, "defaultValue": startTime },
          { "field": "endTime", "fieldName": "结束时间", "dataType": "varchar", "required": 0, "defaultValue": endTime }],
        "tenantId": "", "origin": "preview"
      }
      this.$request('481843695092498565', query).then(res => {
        this.list = res.data
        this.total = res.data.length
        this.listLoading = false
      })
    }
  }
}
</script>