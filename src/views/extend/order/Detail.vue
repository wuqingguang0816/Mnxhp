<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main order-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="订单详细" />
        <div class="options">
          <el-button-group>
            <el-button icon="el-icon-printer" @click="print">打印</el-button>
            <el-button icon="el-icon-download" @click="exportExcel">导出</el-button>
          </el-button-group>
          <el-button-group>
            <el-button icon="el-icon-arrow-left" @click="prve">前单</el-button>
            <el-button @click="next">
              后单<i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-button-group>
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main" v-loading="loading">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="90px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="客户名称">
                <p class="text">{{dataForm.customerName}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务人员">
                <p class="text">{{dataForm.salesmanName}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单日期">
                <p class="text">{{dataForm.orderDate}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单编码">
                <p class="text">{{dataForm.orderCode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款方式">
                <p class="text">{{dataForm.paymentMode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款金额">
                <p class="text">{{dataForm.receivableMoney}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="定金比率">
                <p class="text">{{dataForm.earnestRate}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="预付定金">
                <p class="text">{{dataForm.prepayEarnest}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="运输方式">
                <p class="text">{{dataForm.transportMode}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发货日期">
                <p class="text">{{dataForm.deliveryDate}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发货地址">
                <p class="text">{{dataForm.deliveryAddress}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="相关附件">
                <ul class="el-upload-list el-upload-list--text">
                  <li class="el-upload-list__item" v-for="(item,i) in fileList" :key="i"
                    @click="download(item.fileId)">
                    <a class="el-upload-list__item-name"><i
                        class="el-icon-document"></i>{{item.fileName}}
                    </a>
                  </li>
                </ul>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="订单备注">
                <p>{{dataForm.description}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制单人员">
                <p class="text">{{dataForm.creatorUserId}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制单时间">
                <p class="text">{{dataForm.creatorTime|toDate()}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="修改人员">
                <p class="text">{{dataForm.lastModifyUserId}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="修改时间">
                <p class="text">{{dataForm.lastModifyTime|toDate()}}</p>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="box">
          <el-tabs v-model="activeName">
            <el-tab-pane label="订单商品" name="goods">
              <el-table :data="list" size='small' show-summary :summary-method="getSummaries">
                <el-table-column type="index" width="50" label="序号" align="center" />
                <el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip />
                <el-table-column prop="specifications" label="规格型号" width="80" />
                <el-table-column prop="unit" label="单位" width="80" />
                <el-table-column prop="qty" label="数量" width="80" />
                <el-table-column prop="price" label="单价" width="80" />
                <el-table-column prop="amount" label="金额" width="80" />
                <el-table-column prop="discount" label="折扣%" width="90" />
                <el-table-column prop="cess" label="税率%" width="90" />
                <el-table-column prop="actualPrice" label="实际单价" width="80" />
                <el-table-column prop="actualAmount" label="实际金额" width="80" />
                <el-table-column prop="description" label="备注" width="80" />
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="收款计划" name="plan">
              <el-table :data="planList" size='small' show-summary :summary-method="getSummaries">
                <el-table-column type="index" width="50" label="序号" align="center" />
                <el-table-column prop="receivableDate" label="收款日期"
                  :formatter="jnpf.tableDateFormat" />
                <el-table-column prop="receivableRate" label="收款比率%" />
                <el-table-column prop="receivableMoney" label="收款金额" />
                <el-table-column prop="receivableMode" label="收款方式" />
                <el-table-column prop="abstract" label="收款摘要" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ExportExcel, NextInfo, PrevInfo } from '@/api/extend/order'
import { Info } from '@/api/workFlowForm/Common'
import { getDownloadUrl } from '@/api/common'
export default {
  data() {
    return {
      activeName: 'goods',
      dataForm: {
        id: '',
        customerName: '',
        salesmanId: '',
        orderDate: '',
        orderCode: '',
        paymentMode: '',
        receivableMoney: 0,
        earnestRate: 0,
        prepayEarnest: 0,
        transportMode: '',
        deliveryDate: '',
        deliveryAddress: '',
        description: '',
        customerId: '',
        salesmanName: '',
      },
      dataRule: {},
      list: [],
      planList: [],
      loading: true,
      fileList: [],
    }
  },
  methods: {
    goBack() {
      this.$emit('close')
    },
    init(id) {
      this.dataForm.id = id || ''
      this.loading = true
      this.$nextTick(() => {
        if (this.dataForm.id) {
          this.$refs['dataForm'].resetFields()
          Info('crmOrder', this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.dataForm.orderDate = this.jnpf.toDate(this.dataForm.orderDate)
            this.dataForm.deliveryDate = this.jnpf.toDate(this.dataForm.deliveryDate, "yyyy-MM-dd")
            this.list = res.data.goodsList
            this.planList = res.data.collectionPlanList
            this.fileList = JSON.parse(this.dataForm.fileJson)
            for (let i = 0; i < this.fileList.length; i++) {
              this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
            }
            this.loading = false
          })
        }
      })
    },
    prve() {
      this.loading = true
      PrevInfo(this.dataForm.id).then(res => {
        if (!res.data) {
          this.loading = false
          this.$message({ message: '第一单了哦', type: 'warning', duration: 1500 })
          return
        }
        this.dataForm = res.data
        this.dataForm.orderDate = this.jnpf.toDate(this.dataForm.orderDate)
        this.dataForm.deliveryDate = this.jnpf.toDate(this.dataForm.deliveryDate, "yyyy-MM-dd")
        this.list = res.data.goodsList
        this.planList = res.data.collectionPlanList
        this.fileList = JSON.parse(this.dataForm.fileJson)
        for (let i = 0; i < this.fileList.length; i++) {
          this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
        }
        this.loading = false
      })
    },
    next() {
      this.loading = true
      NextInfo(this.dataForm.id).then(res => {
        if (!res.data) {
          this.loading = false
          this.$message({ message: '最后一单了哦', type: 'warning', duration: 1500 })
          return
        }
        this.dataForm = res.data
        this.dataForm.orderDate = this.jnpf.toDate(this.dataForm.orderDate)
        this.dataForm.deliveryDate = this.jnpf.toDate(this.dataForm.deliveryDate, "yyyy-MM-dd")
        this.list = res.data.goodsList
        this.planList = res.data.collectionPlanList
        this.fileList = JSON.parse(this.dataForm.fileJson)
        for (let i = 0; i < this.fileList.length; i++) {
          this.$set(this.fileList[i], 'name', this.fileList[i].fileName)
        }
        this.loading = false
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (index === 1) {
          sums[index] = '';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '';
        }
      });
      return sums
    },
    exportExcel() {
      ExportExcel(this.dataForm.id).then(res => {
        if (res.data && res.data.url) {
          window.location.href = this.define.comUrl + res.data.url
        } else {
          this.$message({ message: '导出失败', type: 'error', duration: 1500 })
        }
      })
    },
    print() {
      this.$message({ message: '正在努力开发中...', type: 'warning', duration: 1500 })
    },
    download(id) {
      getDownloadUrl('workFlow', id).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-select,
>>> .el-date-editor {
  width: 100%;
}
>>> .el-tabs__header {
  margin-bottom: 0;
}
.box {
  position: relative;
}
.add-btn {
  position: absolute;
  right: 10px;
  top: 2px;
  z-index: 100;
}
>>> .el-tabs .el-table {
  .cell {
    padding: 0 5px;
  }
  .el-input-number {
    width: 100%;
    .el-input-number__decrease,
    .el-input-number__increase {
      display: none;
    }
    .el-input__inner {
      padding: 0 15px;
      text-align: left;
    }
  }
}
.order-form {
  height: 100%;
  overflow: hidden;
}
.main {
  padding: 10px;
  flex: 1;
  overflow: hidden auto;
}
.text {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
>>> .el-upload-list__item:first-child {
  margin-top: 4px;
}
</style>