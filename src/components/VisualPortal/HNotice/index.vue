<template>
  <el-card shadow="never" class="portal-notice-box">
    <CardHeader v-if="activeData.title" slot="header" :title="activeData.title"
      :card="activeData.card" />
    <div class="portal-notice-box-body">
      <template>
        <template v-if="activeData.option.styleType==1">
          <JNPF-table :data="defaultValue" :show-header='activeData.option.showHeader'
            @row-click="readInfo" :hasNO="false" :border='activeData.border' :header-cell-style="{'font-size':activeData.option.headerFontSize+'px',
        'text-align':activeData.option.headerLeft, 
        background:activeData.option.headerBgColor,color:activeData.option.headerFontColor,
        'font-weight':activeData.option.headerFontWeight?'bolder':'normal'}"
            :cell-style="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}"
            :class="!activeData.border?'noticeList':''">
            <el-table-column type="index" width="50" v-if="activeData.option.tableIndex" label="序号"
              fixed='left' align="center" />
            <template v-for="(item, i) in list">
              <el-table-column :prop="item.filedName" :label="item.fullName" :align="item.align"
                :width="item.width" :key="i" :sortable="item.sortable"
                :fixed='item.fixed=="none"?"":item.fixed' v-if="item.id != 6">
                <template slot-scope="scope">
                  <div>
                    <el-tag
                      v-if="item.filedName === 'fullName' && list.filter(o=>o.id=='6')[0].show"
                      size="mini" :color="scope.row.category == 1?'#e5ebfe':'#ebe6ff'"
                      :style="{'color':scope.row.category == 1?'#1448f4':'#5e00f3'}">{{ scope.row.category }}</el-tag>
                    <span style="margin-left: 10px;">{{ scope.row[item.filedName] }}</span>
                  </div>
                </template>
              </el-table-column>
            </template>
          </JNPF-table>
        </template>
        <template v-if="activeData.option.styleType==2">
          <template v-if="defaultValue.length">
            <div style="padding: 0 18px;">
              <div v-for="(item, i) in defaultValue" :key="i" class="portal-list-box"
                @click="readInfo(item)"
                :style="{'border-bottom':i == defaultValue.length-1 ? 'none':'1px solid #ebeef5'}">
                <div v-if=' i% 2 == 0' class="portal-list-item"
                  :style="{'background': activeData.option.noticeOddLineColor ? activeData.option.noticeOddLineColor : activeData.option.noticeBgColor }">
                  <div class="item-image-box" v-if="activeData.option.showImage">
                    <img v-if="item.category == 1"
                      :src="item.coverImage ? define.comUrl+item.coverImage : coverImage" alt=""
                      class="item-image">
                    <img v-else :src="item.coverImage ? define.comUrl+item.coverImage : coverImage2"
                      alt="" class="item-image">
                  </div>
                  <div class="itme-content-box">
                    <div class="item-title">
                      <el-tag size="mini" :color="item.category == 1?'#ebe6ff':'#e5ebfe'"
                        v-if="list[0].show"
                        :style="{'color':item.category == 1?'#9016f3':'#1448f4'}">{{ item.category == 1?'公告':'通知' }}</el-tag>
                      <span class="item-left-span" v-if="list[1].show"
                        :style="{'color':list[1].fontColor,'font-size':list[1].fontSize+'px','font-weight':list[1].fontWeight?700:400}">{{ item.fullName }}</span>
                      <div v-if="list[3].show">
                        <span class="item-right-span" v-if="list[3].timeClassify === '创建时间'"
                          :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{ item.creatorTime| toDateValue()}}</span>
                        <span class="item-right-span" v-else
                          :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{item.releaseTime| toDateValue()}}</span>
                      </div>
                    </div>
                    <p :style="{'color':list[2].fontColor,'font-size':list[2].fontSize+'px','font-weight':list[2].fontWeight?700:400}"
                      class="itme-content" v-if="list[2].show">
                      {{ item.excerpt }}</p>
                  </div>
                </div>
                <div v-else
                  :style="{background: activeData.option.noticeEvenyLineColor ? activeData.option.noticeEvenyLineColor : activeData.option.noticeBgColor }"
                  class="portal-list-item">
                  <div class="item-image-box" v-if="activeData.option.showImage">
                    <img :src="item.coverImage ? define.comUrl+item.coverImage : coverImage" alt=""
                      class="item-image">
                  </div>
                  <div class="itme-content-box">
                    <div class="item-title">
                      <el-tag size="mini" :color="item.category == 1?'#ebe6ff':'#e5ebfe'"
                        v-if="list[0].show"
                        :style="{'color':item.category == 1?'#9016f3':'#1448f4'}">{{ item.category == 1?'公告':'通知' }}</el-tag>
                      <span class="item-left-span" v-if="list[1].show"
                        :style="{'color':list[1].fontColor,'font-size':list[1].fontSize+'px','font-weight':list[1].fontWeight?700:400}">{{ item.fullName }}</span>
                      <div v-if="list[3].show">
                        <span class="item-right-span" v-if="list[3].timeClassify === '创建时间'"
                          :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{ item.creatorTime| toDateValue()}}</span>
                        <span class="item-right-span" v-else
                          :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{item.releaseTime| toDateValue()}}</span>
                      </div>
                    </div>
                    <p :style="{'color':list[2].fontColor,'font-size':list[2].fontSize+'px','font-weight':list[2].fontWeight?700:400}"
                      class="itme-content" v-if="list[2].show">
                      {{ item.excerpt }}</p>
                  </div>
                </div>
              </div>
            </div>

          </template>
          <div class="portal-common-noData" v-else>
            <img src="@/assets/images/portal-nodata.png" alt="" class="noData-img">
            <p class="noData-txt">暂无数据</p>
          </div>
        </template>
        <template v-if="activeData.option.styleType==3">
          <template v-if="defaultValue.length">
            <div style="padding: 0 18px;">
              <div v-for="(item, i) in defaultValue" class="portal-list-box" :key="i"
                @click="readInfo(item)"
                :style="{'border-bottom':i == defaultValue.length-1 ? 'none':'1px solid #ebeef5'}">
                <div class="portal-list-item" v-if=' i% 2 == 0'
                  :style="{background: activeData.option.noticeOddLineColor ? activeData.option.noticeOddLineColor : activeData.option.noticeBgColor }">
                  <div class="item-image-box">
                    <img src="@/assets/images/gg.png" alt="" class="item-image">
                  </div>
                  <div style="" class="itme-content-box">
                    <div class="item-title">
                      <el-tag size="mini" :color="item.category == 1?'#ebe6ff':'#e5ebfe'"
                        v-if="list[0].show"
                        :style="{'color':item.category == 1?'#9016f3':'#1448f4'}">{{ item.category == 1?'公告':'通知' }}</el-tag>
                      <span class="item-left-span" v-if="list[1].show"
                        :style="{'color':list[1].fontColor,'font-size':list[1].fontSize+'px','font-weight':list[1].fontWeight?700:400}">{{ item.fullName }}</span>
                    </div>
                    <p :style="{'color':list[2].fontColor,'font-size':list[2].fontSize+'px','font-weight':list[2].fontWeight?700:400}"
                      class="itme-content" v-if="list[2].show">
                      {{ item.excerpt }}</p>
                    <div v-if="list[3].show">
                      <span class="item-right-span" v-if="list[3].timeClassify === '创建时间'"
                        :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{ item.creatorTime| toDateValue()}}</span>
                      <span class="item-right-span" v-else
                        :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{item.releaseTime| toDateValue()}}</span>
                    </div>
                  </div>
                </div>
                <div class="portal-list-item" v-else
                  :style="{background: activeData.option.noticeEvenyLineColor ? activeData.option.noticeEvenyLineColor : activeData.option.noticeBgColor }">
                  <div class="item-image-box">
                    <img src="@/assets/images/gg.png" alt="" class="item-image">
                  </div>
                  <div style="" class="itme-content-box">
                    <div class="item-title">
                      <el-tag size="mini" :color="item.category == 1?'#ebe6ff':'#e5ebfe'"
                        v-if="list[0].show"
                        :style="{'color':item.category == 1?'#9016f3':'#1448f4'}">{{ item.category == 1?'公告':'通知' }}</el-tag>
                      <span class="item-left-span" v-if="list[1].show"
                        :style="{'color':list[1].fontColor,'font-size':list[1].fontSize+'px','font-weight':list[1].fontWeight?700:400}">{{ item.fullName }}</span>
                    </div>
                    <p :style="{'color':list[2].fontColor,'font-size':list[2].fontSize+'px','font-weight':list[2].fontWeight?700:400}"
                      class="itme-content" v-if="list[2].show">
                      {{ item.excerpt }}</p>
                    <div v-if="list[3].show">
                      <span class="item-right-span" v-if="list[3].timeClassify === '创建时间'"
                        :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{ item.creatorTime| toDateValue()}}</span>
                      <span class="item-right-span" v-else
                        :style="{'color':list[3].fontColor,'font-size':list[3].fontSize+'px','font-weight':list[3].fontWeight?700:400}">{{item.releaseTime| toDateValue()}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </template>
          <div class="portal-common-noData" v-else>
            <img src="@/assets/images/portal-nodata.png" alt="" class="noData-img">
            <p class="noData-txt">暂无数据</p>
          </div>
        </template>
      </template>
    </div>
    <Form v-if="formVisible" ref="Form" />
  </el-card>
</template>
<script>
import CardHeader from "../CardHeader"
import { getNotice } from '@/api/home'
import Form from '@/views/basic/messageRecord/Form'
export default {
  components: { CardHeader, Form },
  props: {
    showType: { type: String, default: 'pc' },
    activeData: { type: Object, default: () => { } },
  },
  data() {
    return {
      coverImage: require("@/assets/images/gg.png"),
      coverImage2: require('@/assets/images/tz.png'),
      key: +new Date(),
      defaultValue: [],
      list: [],
      typeList: [],
      formVisible: false,
    }
  },
  watch: {
  },
  created() {
    this.initData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      let styleJson = {}
      styleJson['font-size'] = this.activeData.option.tableFontSize + 'px'
      styleJson['color'] = this.activeData.option.tableFontColor
      if (rowIndex % 2 == 0) {
        styleJson.background = this.activeData.option.tableOddLineColor ? this.activeData.option.tableOddLineColor : this.activeData.option.tableBgColor
        return styleJson
      } else {
        styleJson.background = this.activeData.option.tableEvenLineColor ? this.activeData.option.tableEvenLineColor : this.activeData.option.tableBgColor
        return styleJson
      }
    },
    readInfo(row) {
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs.Form.init(row.id)
      })
    },
    initData() {
      this.activeData.option.columnData.forEach((o, i) => {
        if (o.classify && o.classify.length) {
          this.typeList = o.classify
        }
      });
      let data = {
        typeList: this.typeList
      }
      getNotice(data).then(res => {
        this.defaultValue = JSON.parse(JSON.stringify(res.data.list)) || []
        this.defaultValue = this.defaultValue.slice(0, this.activeData.option.noticeCount)
        if (this.activeData.option.styleType == 1) {
          this.defaultValue.map(o => {
            o.creatorTime = this.jnpf.toDate(o.creatorTime)
            o.releaseTime = this.jnpf.toDate(o.releaseTime)
          })
          this.list = this.activeData.option.columnData.filter(o => o.show || !o.show && o.id == 6)
        } else {
          this.list = this.activeData.option.rowData
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.noticeList {
  >>> .el-table tr:last-child td {
    border-bottom: unset;
  }
}
.portal-table-box-body {
  height: 100%;
  overflow: auto;
}
.portal-notice-box {
  display: flex;
  flex-direction: column;

  >>> .el-card__header {
    height: 55px;
    padding: 0;
  }
  >>> .el-card__body {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
  .portal-notice-box-body {
    height: 100%;
    overflow: auto;
    .portal-list-box {
      display: flex;
      flex-direction: column;

      .portal-list-item {
        display: flex;
        height: 100%;
        width: 100%;
        padding: 12px 0;
        .item-image-box {
          width: 52px;
          height: 52px;
          flex-shrink: 0;

          .item-image {
            width: 100%;
            height: 100%;
          }
        }
        .itme-content-box {
          flex: 1;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;

          .item-title {
            .item-left-span {
              margin-left: 10px;
            }
            .item-right-span {
              float: right;
            }
          }
          .itme-content {
            min-width: 0;
            overflow: hidden;
            white-space: nowrap;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>