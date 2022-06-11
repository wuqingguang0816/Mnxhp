<template>
  <div>
    <div class="JNPF-common-layout">

      <div class="JNPF-common-layout-center">
        <el-row class="JNPF-common-search-box" :gutter="16">
          <el-form @submit.native.prevent>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="search()">查询1</el-button>
                <el-button type="primary" @click="save()">保存</el-button>
                <!-- <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button> -->
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="JNPF-common-layout-main JNPF-flex-main ">
          <!-- <div class="JNPF-common-head">
            <div>
              <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新增
              </el-button>
            </div>
            <div class="JNPF-common-head-right">
              <el-tooltip effect="dark" content="刷新" placement="top">
                <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false"
                  @click="reset()" />
              </el-tooltip>
              <screenfull isContainer />
            </div>
          </div> -->
          <el-row>
            <el-table :data="list" @cell-click="detailOrder" height="400">

              <el-table-column label="序号" width="50" type="index" />
              <el-table-column label="配车单号" prop="billCode" width="140" />
              <el-table-column label="运输车辆" prop="tranCar" width="140" />
              <el-table-column label="驾驶员" prop="staff" width="140" />
              <el-table-column label="客户" prop="customer" width="140" />
              <el-table-column label="单据日期" prop="billTime" width="140">
                <template slot-scope="scope">
                  <span>{{  jnpf.toDate(scope.row.billTime,'yyyy-MM-dd') }}</span>
                </template>
              </el-table-column>
              <el-table-column label="制单人" prop="creatorUser" width="140" />
              <el-table-column label="制单时间" prop="creatorTime" width="140"
                :formatter="jnpf.tableDateFormat" />
              <el-table-column label="备注" prop="remark" />
            </el-table>
          </el-row>
          <el-row :gutter="10" class="mt-10 detail-wrap">
            <el-col :span="17">
              <el-table :data="list2" :key="randomKey" @cell-click="stockDetail"
                @cell-dblclick="editData">
                <el-table-column label="序号" width="50" type="index" />
                <el-table-column label="配车单号" prop="billCode" width="140" />
                <el-table-column label="客户编号" prop="customerCode" width="140" />
                <el-table-column label="客户简称" prop="customerName" width="140" />
                <el-table-column label="订单编号" prop="orderCode" width="140" />
                <el-table-column label="产品编号" prop="invMasCode" width="140" />
                <el-table-column label="规格说明" prop="invMasName" />
                <el-table-column label="本次发货数量" property="goodsNum" width="130">
                  <template slot-scope="scope">
                    <el-input-number v-if="scope.row[scope.column.property + 'isShow']" :min="0"
                      :step="1" :ref="scope.column.property" v-model="scope.row.goodsNum"
                      :controls="false" @blur="alterData(scope.row,scope.column)"></el-input-number>
                    <span v-else>{{ scope.row.goodsNum }}</span>
                  </template>
                </el-table-column>
              </el-table>

            </el-col>
            <el-col :span="7">
              <el-table :data="list3" :key="randomKey2" @cell-dblclick="editData2"
                style="width: 100%">

                <el-table-column label="产品编号" prop="invMasCode" />
                <el-table-column label="库位" prop="enCode" width="50" />
                <el-table-column label="库存数" prop="inventory" width="60" />
                <el-table-column label="本次发货数量" property="goodsNum" width="130">
                  <template slot-scope="scope">
                    <el-input-number v-if="scope.row[scope.column.property + 'isShow']" :min="0"
                      :step="1" :ref="scope.column.property" v-model="scope.row.goodsNum"
                      :controls="false" @blur="alterData2(scope.row,scope.column)">
                    </el-input-number>
                    <span v-else>{{ scope.row.goodsNum }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import request from '@/utils/request'
import { isNumber } from 'highcharts'
export default {
  data() {
    return {
      list: [],
      list2: [],
      list3: [],
      randomKey: Math.random(),
      randomKey2: Math.random(),
      randomKey3: Math.random(),
      detailMap: {},
      // 订单id和库存id,已分配数据
      orderCurm: {},
      // 分配库存计数器
      allocateStockCount: {},
      // 库存的总数量
      stockNum: {},
      productMap: {},
      operateId: '',
      tempEdit: 0,
      canSave:true,
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    // 初始化一开始的库存使用量
    initStockCount(arr) {
      arr.forEach((item,index) => {
        if(!this.allocateStockCount.hasOwnProperty(item.invMasCode)) {
          this.allocateStockCount[item.invMasCode]=new Map()
        }
        if(!this.allocateStockCount.hasOwnProperty(item.id)) {
          this.allocateStockCount[item.invMasCode][item.id]={
            total: item.inventory,
            used: 0
          }
          this.allocateStockCount[item.invMasCode].set(item.id,index)
        }
      })


    },
    search() {  
      this.clear()
      // request({
      //   url: '/api/SubDev/ewmatecarbasic',
      //   method: 'GET',
      // }).then((res)=>{
      // let arr=res.data
      this.list=[
        {
          "id": "a03d7806-e85e-11ec-b6f1-000c2947c348",
          "billCode": "PC220608001",
          "tranCar": "苏E-66666",
          "staff": "陈瑞",
          "customer": "亿维、引迈",
          "billTime": 1654825460000,
          "creatorUser": "管理员",
          "creatorTime": 1654825460000,
          "remark": null,
          "detailList": [
            {
              "id": "7c4fa1fb-e861-11ec-b6f1-000c2947c348",
              "billCode": "PC220608001",
              "customerCode": "EW",
              "customerName": "亿维",
              "tranCar": null,
              "orderCode": "DD22060601",
              "invMasId": "b41e7e23-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP1",
              "invMasName": "200*500",
              "goodsNum": 100
            },
            {
              "id": "fda89a55-e861-11ec-b6f1-000c2947c348",
              "billCode": "PC220608001",
              "customerCode": "YM",
              "customerName": "引迈",
              "tranCar": null,
              "orderCode": "DD22060601",
              "invMasId": "f96a94fb-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP2",
              "invMasName": "200*500",
              "goodsNum": 200
            },
            {
              "id": "d2019757-e861-11ec-b6f1-000c2947c348",
              "billCode": "PC220608001",
              "customerCode": "EW",
              "customerName": "亿维",
              "tranCar": null,
              "orderCode": "DD22060607",
              "invMasId": "b41e7e23-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP1",
              "invMasName": "200*500",
              "goodsNum": 80
            }
          ],
          "curmList": [
            {
              "id": "8e1169ab-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP1",
              "enCode": "2#",
              "inventory": 30
            },
            {
              "id": "5f1d9eb3-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP1",
              "enCode": "1#",
              "inventory": 80
            },
            {
              "id": "8e21b9ac-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP1",
              "enCode": "3#",
              "inventory": 200
            }
          ]
        },
        {
          "id": "858e2031-e85f-11ec-b6f1-000c2947c348",
          "billCode": "PC220608002",
          "tranCar": "苏E-77777",
          "staff": "王世孝",
          "customer": "宝达、百事、博宏",
          "billTime": 1654825750000,
          "creatorUser": "管理员",
          "creatorTime": 1654825750000,
          "remark": null,
          "detailList": [
            {
              "id": "b5bcc6a5-e865-11ec-b6f1-000c2947c348",
              "billCode": "PC220608002",
              "customerCode": "BD",
              "customerName": "宝达",
              "tranCar": null,
              "orderCode": "DD22060602",
              "invMasId": "f96a94fb-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP2",
              "invMasName": "200*500",
              "goodsNum": 50
            },
            {
              "id": "b5c587d9-e865-11ec-b6f1-000c2947c348",
              "billCode": "PC220608002",
              "customerCode": "BS",
              "customerName": "百事",
              "tranCar": null,
              "orderCode": "DD22060602",
              "invMasId": "f96a94fb-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP2",
              "invMasName": "200*500",
              "goodsNum": 50
            },
            {
              "id": "b5dedb18-e865-11ec-b6f1-000c2947c348",
              "billCode": "PC220608002",
              "customerCode": "BH",
              "customerName": "博宏",
              "tranCar": null,
              "orderCode": "DD22060602",
              "invMasId": "f96a94fb-e860-11ec-b6f1-000c2947c348",
              "invMasCode": "CP2",
              "invMasName": "200*500",
              "goodsNum": 50
            }
          ],
          "curmList": [

          ]
        },]

      this.list.forEach(e => {
        this.detailMap[e.id]=e.detailList
      })

      let detail=this.list[0].detailList
      this.list2=detail

      let curm=this.list[0].curmList.map(element => {
        element.goodsNum=0
        return element
      });

      this.initCurm(curm)

      // 默认展示第一个b区域记录
      this.stockDetail(this.list2[0])

      // })


    },
    clear(){
      this.orderCurm = {}
      this.allocateStockCount={}
    },
    initCurm(arr) {

      // 如果每次都请求需先循环清空key在执行操作

      // 生成总库存记录
      arr.forEach(item => {
        if(this.stockNum.hasOwnProperty(item.invMasCode)) {
          let temp=this.stockNum[item.invMasCode]

          this.stockNum[item.invMasCode]=item.inventory+temp
        } else {
          this.stockNum[item.invMasCode]=item.inventory
        }
      })
      // 初始化可用库存
      this.initStockCount(arr)

      // 初始化一个产品编号的记录
      if(arr.length>0) {
        let item=arr[0]
        this.productMap[item.invMasCode]=arr
      }

      this.list3=arr
    },
    // 检测库存分配余量
    checkStockNum(row) {
      let allocate=false
      let goodsCode=row.invMasCode

      let total=this.list2.filter(item => item.invMasCode===goodsCode).map(item => item.goodsNum)
        .reduce((sum,value) => {
          return sum+Number(value)
        },0)


      let totalCurm=this.stockNum[goodsCode]? this.stockNum[goodsCode]:0
      allocate=totalCurm>=total? true:false
      return allocate
    },
    addOrderCurm(key,count) {
      if(!this.orderCurm.hasOwnProperty(key)) {
        this.orderCurm[key]=0
      }
      this.orderCurm[key]+=count
    },
    reCalc(row,tag) {
      let allocate=this.checkStockNum(row)
      if(!allocate) return false
      let invMasCode=row.invMasCode
      let needAllocate=row.goodsNum
      if(tag) {
        for(let key in this.orderCurm) {
          let value=this.orderCurm[key]
          // row.id为订单id(b)
          if(key.includes(row.id)) {
            // 从ordercurm的key中删除
            delete this.orderCurm[key]
            // 从库存记录中used的数据更新
            let keyCurm=key.replace(row.id,'')
            this.allocateStockCount[row.invMasCode][keyCurm]['used']-=value
          }
        }
      }


      // 分配逻辑
      let remain=needAllocate
      let countMap=this.allocateStockCount[invMasCode]
      for(let key in countMap) {
        let value=countMap[key]
        let allocatableNum=value.total-value.used
        if(allocatableNum==0) continue
        // 刚好直接可以分配好
        if(remain<=allocatableNum) {
          this.addOrderCurm(row.id+key,remain)
          this.allocateStockCount[row.invMasCode][key]['used']=this.allocateStockCount[invMasCode][key]['used']+remain
          break
        } else {
          remain=remain-allocatableNum
          this.addOrderCurm(row.id+key,allocatableNum)
          this.allocateStockCount[row.invMasCode][key]['used']=this.allocateStockCount[invMasCode][key]['total']
        }

      }
      return true
    },
    save() {
      // 验证
    },
    queryStockNum(invMasId) {
      // todo 获取库存数量
      return new Promise((resolve,reject) => {
        let arr=[
          {
            "id": "msw8e1169ab-e860-11ec-b6f1-000c2947c348",
            "invMasCode": "CP2",
            "enCode": "2#",
            "inventory": 40
          },
          {
            "id": "kpf1d9eb3-e860-11ec-b6f1-000c2947c348",
            "invMasCode": "CP2",
            "enCode": "1#",
            "inventory": 60
          },
          {
            "id": "ns21b9ac-e860-11ec-b6f1-000c2947c348",
            "invMasCode": "CP2",
            "enCode": "3#",
            "inventory": 120
          }
        ]
        this.initCurm(arr)
        resolve()

        // request({
        //   url: '/api/SubDev/ewmatecarbasic/CurM',
        //   method: 'GET',
        //   data: { invMasId: invMasId }
        // }).then(res => {
        //   let arr=res.data
        //   this.initCurm(arr)
        //   resolve()
        // })
      })


    },
    async stockDetail(row,column) {
      this.operateId=row.id

      // 库存记录获取
      if(!this.productMap.hasOwnProperty(row.invMasCode)) {
        await this.queryStockNum(row.invMasId)
      } else {
        this.list3=this.productMap[row.invMasCode]
      }

      this.reCalc(row,true)

      // 显示产品分配数
      let arr=this.list3
      let usedNum = 0
      arr=arr.map(item => {
        let key=row.id+item.id
        let num=this.orderCurm[key]? this.orderCurm[key]:0
        usedNum+=num
        item.goodsNum=num
        return item
      })
      this.list3=arr
      if(usedNum<row.goodsNum){
        this.canSave = false
        this.$message.warning("当前库存不足以保存")
      }
    },
    detailOrder(row,column) {
      this.list2=this.detailMap[row.id]

      // 默认展示第一个b区域记录
      this.stockDetail(this.list2[0])
    },
    editData(row,column) {
      row[column.property+"isShow"]=true
      this.refreshTable()
      this.$nextTick(() => {
        this.tempEdit=row.goodsNum
        this.$refs[column.property]&&this.$refs[column.property].focus()
      })
    },
    editData2(row,column) {
      row[column.property+"isShow"]=true
      this.randomKey2=Math.random()
      this.$nextTick(() => {
        this.tempEdit=row.goodsNum
        this.$refs[column.property]&&this.$refs[column.property].focus()
      })
    },
    checkNumValid(row,goodsNum) {
      let num=Number(goodsNum)

      if(row.inventory<num) {
        this.$message.warning("库存不足")
        row.goodsNum=this.tempEdit
        return false
      }
      if(this.tempEdit>=row.goodsNum) return true

      if(row.inventory-this.allocateStockCount[row.invMasCode][row.id]['used']<row.goodsNum) {
        this.$message.warning("库存不足")
        row.goodsNum=this.tempEdit
        return false
      }
      return true
    },
    alterData2(row,column) {
      let goodsNum=row.goodsNum
      let flag=this.checkNumValid(row,goodsNum)
      if(!flag) {
        row[column.property+"isShow"]=false
        this.randomKey2=Math.random()
        return
      }
      // 修改对应的库存数量
      let changeNum=this.tempEdit-goodsNum

      let arr=this.list2
      for(let i in arr) {
        let val=arr[i]
        if(val.id==this.operateId) {
          let key=this.operateId+row.id
          if(changeNum>0) {
            // 减少
            this.allocateStockCount[row.invMasCode][row.id]['used']-=changeNum
            val.goodsNum-=changeNum
          } else {
            this.allocateStockCount[row.invMasCode][row.id]['used']+=(goodsNum-this.tempEdit)
            val.goodsNum+=(goodsNum-this.tempEdit)
          }
          this.orderCurm[key]=goodsNum
        }
      }

      this.list2=arr

      row[column.property+"isShow"]=false
      this.randomKey2=Math.random()
    },
    // b区域点击修改
    alterData(row,column) {

      row[column.property+"isShow"]=false
      this.refreshTable()

      // 重新显示库存使用数据
      this.stockDetail(row)
    },
    refreshTable() {
      this.randomKey=Math.random()
    },
  }

}
</script>

<style lang="scss" scope>
.main-wrap {
  height: calc(100vh-60px);
}
.detail-wrap {
  min-height: 200px;
  max-height: 30vh;
  overflow: hidden;
}
</style>