<template>
  <div>
    <el-dialog title="选项设置" :close-on-click-modal="false" :visible.sync="visible"
      class="JNPF-dialog JNPF-dialog_center todoData" lock-scroll width="1000px" append-to-body>
      <div class="main">
        <JNPF-table :data="list" ref="dragTable" :hasNO="false" row-key="id">
          <el-table-column align="center" label="拖动" width="50">
            <template>
              <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
                title='点击拖动' />
            </template>
          </el-table-column>
          <el-table-column prop="field" label="名称" width="200px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullName" placeholder="请输入名称" maxlength="50" />
            </template>
          </el-table-column>
          <el-table-column prop="field" label="图标" width="280px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.icon" placeholder="请输入图标名称">
                <el-button slot="append" @click="openIconsDialog(scope.row.icon,scope.$index)">
                  选择
                </el-button>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="图标颜色" width="70px">
            <template slot-scope="scope">
              <el-color-picker class="color-picker" v-model="scope.row.iconBgColor" />
            </template>
          </el-table-column>
          <el-table-column prop="dataLength" width="160px">
            <template slot="header">
              <p>
                链接类型
                <el-tooltip content="地址以http://或https://为开头" placement="top">
                  <a class="el-icon-question tooltip-question"></a>
                </el-tooltip>
              </p>
            </template>
            <template slot-scope="scope">
              <el-select v-model="scope.row.linkType" placeholder="请选择链接类型" filterable
                @change="linkTypeChange(scope.$index)" clearable>
                <el-option v-for="(item, index) in linkTypeList" :key="index" :label="item.label"
                  :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dataLength">
            <template slot-scope="scope">
              <JNPF-TreeSelect v-if="scope.row.linkType==1"
                :options="showType == 'pc'?menuList:appMenuList" v-model="scope.row.moduleId"
                placeholder="请选择菜单" lastLevel clearable
                @change="getSelectVal(arguments,scope.$index)">
              </JNPF-TreeSelect>
              <el-input v-if="scope.row.linkType==2" v-model="scope.row.urlAddress"
                placeholder="请输入链接地址">
                <el-select slot="append" v-model="scope.row.linkTarget" style="width: 80px;"
                  v-if="showType == 'pc'">
                  <el-option label="_self" value="_self" />
                  <el-option label="_blank" value="_blank" />
                </el-select>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-button size="mini" type="text" class="JNPF-table-delBtn"
                @click="handleDel(scope.$index)">删除
              </el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <div class="table-actions" @click="addHandle()">
          <el-button type="text" icon="el-icon-plus">添加</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
    <iconBox :visible.sync="iconsVisible" :current="currentIcon" @choiceIcon="setIcon" />
  </div>
</template>

<script>
import iconBox from '@/components/JNPF-iconBox'
import Sortable from 'sortablejs'
import { linkTypeList } from '../../components/config'
import { validURL } from '@/utils/validate'
export default {
  components: { iconBox },
  props: ['menuList', 'appMenuList', 'showType'],
  data() {
    return {
      visible: false,
      list: [],
      categoryList: [],
      iconsVisible: false,
      currentIcon: '',
      currentIndex: '',
      linkTypeList,
    }
  },
  methods: {
    init(data) {
      this.list = JSON.parse(JSON.stringify(data))
      this.getDictionaryData()
      this.visible = true
      this.$nextTick(() => {
        this.setSort()
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'WorkFlowCategory' }).then((res) => {
        this.categoryList = res
      })
    },
    confirm() {
      for (let i = 0; i < this.list.length; i++) {
        const element = this.list[i];
        if (!element.fullName) return this.$message.warning('名称不能为空')
        if (!element.icon) return this.$message.warning('请选择图标')
        if (!element.iconBgColor) return this.$message.warning('请选择图标颜色')
        if (element.linkType == 1 && (!element.urlAddress && !element.moduleId)) return this.$message.warning('请选择菜单')
        if (element.linkType == 2 && !element.urlAddress) return this.$message.warning('链接地址不能为空')
        if (element.linkType == 2 && !validURL(element.urlAddress)) return this.$message.warning('请输入正确的链接地址')
      }
      this.visible = false
      this.$emit('refresh', this.list)
    },
    openIconsDialog(icon, index) {
      this.currentIcon = icon
      this.currentIndex = index
      this.iconsVisible = true
    },
    setIcon(val) {
      this.list[this.currentIndex].icon = val
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
        },
        handle: '.drag-handler',
      })
    },
    getSelectVal(data, index) {
      const item = data[1]
      this.list[index].type = item.type
      this.list[index].urlAddress = item.urlAddress
      if (item.linkTarget) this.list[index].linkTarget = item.linkTarget
      if (item.propertyJson) this.list[index].propertyJson = item.propertyJson
    },
    addHandle() {
      const item = {
        fullName: "",
        moduleId: "",
        linkType: '',
        urlAddress: '',
        linkTarget: '_self',
        icon: "icon-ym icon-ym-webDesign",
        iconBgColor: "#1890FF",
        type: 2,
        id: this.jnpf.idGenerator()
      }
      this.list.push(item)
    },
    handleDel(index) {
      this.list.splice(index, 1)
    },
    linkTypeChange(index) {
      this.list[index].urlAddress = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.todoData {
  >>> .el-dialog__body {
    padding: 0 !important;
    height: 50vh;

    .main {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }
  .color-picker {
    display: flex;
  }
}
>>> .preview {
  border: 1px solid #dcdfe6;
}
>>> .json-editor {
  height: 430px;
  overflow: auto;
}
</style>