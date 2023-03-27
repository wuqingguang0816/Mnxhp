<template>
  <el-dialog title="选项设置" :close-on-click-modal="false" :visible.sync="visible"
    class="JNPF-dialog JNPF-dialog_center dialog_height" lock-scroll width="1000px" append-to-body>
    <el-table-column prop="classify" label="">
    </el-table-column>
    <JNPF-table :data="list" ref="dragTable" :hasNO="false" row-key="id" v-if="type==1">
      <el-table-column align="center" label="拖动" width="50">
        <template>
          <i class="drag-handler icon-ym icon-ym-darg" style="cursor: move;font-size:20px"
            title='点击拖动' />
        </template>
      </el-table-column>
      <el-table-column prop="fullName" label="名称">
        <template slot-scope="scope">
          <div style="display: flex;">
            <el-input v-model="scope.row.fullName" placeholder="请输入名称"
              :style="{'width': scope.row.id != 6?'50%':'100%'}" />
            <el-select v-model="scope.row.classify" placeholder="请选择" style="margin-left: 5px;"
              v-if="scope.row.id == 6">
              <el-option v-for="item in classifyOptions" :key="item.value" :label="item.fullName"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="show" width="70">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.show">
          </el-switch>
        </template>
      </el-table-column>
      <template v-if="showType!='app'">
        <el-table-column prop="sortable" label="排序" width="60" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.sortable" />
          </template>
        </el-table-column>
        <el-table-column prop="align" label="冻结方式">
          <template slot-scope="scope">
            <el-select v-model="scope.row.fixed" placeholder="请选择">
              <el-option v-for="item in fixedOptions" :key="item.value" :label="item.fullName"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="align" label="对齐方式">
          <template slot-scope="scope">
            <el-select v-model="scope.row.align" placeholder="请选择">
              <el-option v-for="item in alignOptions" :key="item.value" :label="item.fullName"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="width" label="宽度">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.width" placeholder="宽度" :min="0" :precision="0"
              controls-position="right" style="width:100%" />
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button size="mini" type="text" class="JNPF-table-delBtn"
            @click="handleDel(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </JNPF-table>
    <JNPF-table :data="list" ref="dragTable" :hasNO="false" v-else>
      <el-table-column prop="fullName" label="名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.fullName" placeholder="请输入名称" />
        </template>
      </el-table-column>
      <el-table-column prop="filedName" label="字段名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.filedName" placeholder="请输入字段名称" />
        </template>
      </el-table-column>
      <el-table-column prop="fontSize" label="大小">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.fontSize" placeholder="大小" :min="0" :precision="0"
            controls-position="right" style="width:100%" />
        </template>
      </el-table-column>
      <el-table-column prop="fontWeight" label="加粗" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.fontWeight" />
        </template>
      </el-table-column>
      <el-table-column prop="fontColor" label="颜色" align="center">
        <template slot-scope="scope">
          <el-color-picker v-model="scope.row.fontColor" />
        </template>
      </el-table-column>
    </JNPF-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="closeDialog()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  props: ['showType'],
  components: {},
  data() {
    return {
      visible: false,
      list: [],
      type: 1,
      fixedOptions: [
        {
          value: 'none',
          fullName: '无'
        }, {
          value: 'left',
          fullName: '左冻结'
        }, {
          value: 'right',
          fullName: '右冻结'
        }],
      alignOptions: [
        {
          value: 'left',
          fullName: '左对齐'
        }, {
          value: 'center',
          fullName: '居中对齐'
        }, {
          value: 'right',
          fullName: '右对齐'
        }],
      classifyOptions: [
        {
          value: '1',
          fullName: '公告'
        }, {
          value: '2',
          fullName: '通知'
        }],
    }
  },
  mounted() {

  },
  methods: {
    init(option, type) {
      this.type = type || 1
      this.list = option ? JSON.parse(JSON.stringify(option)) : []
      this.visible = true
      this.$nextTick(() => {
        this.setSort()
      });
    },
    closeDialog() {
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index];
        if (!element.fullName) return this.$message.warning('名称不能为空')
      }
      console.log(this.list)
      this.$emit('columnList', this.list)
      this.visible = false
    },
    handleDel(index) {
      this.list.splice(index, 1);
    },

    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
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
  }
}
</script>
<style lang="scss" scoped>
.JNPF-dialog_center {
  >>> .el-dialog__body {
    height: 70vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 0px 3px 2px !important;
    // padding-bottom: 20px !important;
  }
}
</style>