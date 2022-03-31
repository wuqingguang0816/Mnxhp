<template>
  <div class="columnDesign-box">
    <column-main ref="columnMain" :conf="columnData" :modelType="modelType"
      v-show="currentTab==='pc'" />
    <column-main-app ref="columnMainApp" :conf="appColumnData" :modelType="modelType"
      v-show="currentTab==='app'" />
    <div class="head-tabs">
      <div class="head-tabs-item" :class="{'active':currentTab==='pc'}" @click="currentTab='pc'">
        桌面端<i class="icon-ym icon-ym-pc"></i></div>
      <el-divider direction="vertical"></el-divider>
      <div class="head-tabs-item" :class="{'active':currentTab==='app'}" @click="currentTab='app'">
        移动端<i class="icon-ym icon-ym-mobile"></i>
      </div>
    </div>
  </div>
</template>
<script>
import ColumnMain from './main'
import ColumnMainApp from './mainApp'
export default {
  name: 'columnDesign-box',
  props: {
    columnData: {
      type: Object,
      default: () => { }
    },
    appColumnData: {
      type: Object,
      default: () => { }
    },
    modelType: ''
  },
  components: { ColumnMain, ColumnMainApp },
  data() {
    return {
      currentTab: 'pc',
    }
  },
  created() {
  },
  methods: {
    /**
      * 供父组件使用 获取列表JSON
    */
    getData() {
      return new Promise((resolve, reject) => {
        let columnData = this.$refs.columnMain.getData()
        if (!columnData) reject({ msg: '', target: 2 })
        let appColumnData = this.$refs.columnMainApp.getData()
        resolve({ columnData, appColumnData, target: 2 })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.columnDesign-box {
  width: 100%;
  height: 100%;
  position: relative;
  .head-tabs {
    position: absolute;
    right: 20px;
    top: 0;
    width: 300px;
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 18px;
    font-size: 20px;
    .head-tabs-item {
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
      .icon-ym {
        font-size: 14px;
        margin-left: 4px;
      }
      &.active {
        color: #1890ff;
      }
    }
  }
}
</style>