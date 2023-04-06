<template>
  <el-dialog :visible.sync="visible" append-to-body title="批量编辑" :closeOnClickModal="false"
    class="JNPF-dialog JNPF-dialog_center update-dialog" lock-scroll width="400">
    <el-alert title="注意：每行对应一个选项；选项名、选项值和父级选项值之间用英文 | 隔开。格式如下：" type="warning" :closable="false"
      show-icon />
    <div class="format-one">根节点格式：选项名|选项值 输入示例：选项一|选项一的值</div>
    <div class="format-two">子节点格式：选项名|选项值|父级选项值 输入示例：选项一|选项一的值|选项一父级的值</div>
    <el-input type="textarea" :rows="100" v-model="resultInfo" autosize class="textarea"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="handleSure()">
        {{$t('common.confirmButton')}}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  props: {
  },
  data() {
    return {
      visible: false,
      resultInfo: '',
      separator: '|',
      options: []
    }
  },
  computed: {
  },
  methods: {
    init(options) {
      this.options = options || []
      console.log(this.options)
      this.analysis()
      this.visible = true
    },
    analysis() {
      this.resultInfo = ''
      if (this.options.length > 0) {
        const loop = (list, id) => {
          for (let i = 0; i < list.length; i++) {
            const e = list[i]
            if (e.id === e.fullName) {
              this.resultInfo += e.id + '\n'
            } else {
              let separator = ''
              if (id) {
                separator = this.separator + id
              }
              this.resultInfo += e.fullName + this.separator + e.id + separator + '\n'
            }
            if (e && e.children && Array.isArray(e.children)) {
              loop(e.children, e.id)
            }
          }
        }
        loop(this.options)
      }
    },
    handleSure() {
      this.options = []
      let lineArray = this.resultInfo.split('\n')
      if (lineArray.length > 0) {
        lineArray.forEach((optLine) => {
          if (!!optLine && !!optLine.trim()) {
            if (optLine.indexOf(this.separator) !== -1) {
              let item = optLine.split(this.separator) || []
              const getParentId = (list, item) => {
                let parentId = item[item.length - 1]
                for (let i = 0; i < list.length; i++) {
                  const element = list[i];
                  if (element.children && element.children.length) getParentId(element.children, item)
                  if (element.id == parentId) {
                    if (!this.isRepeatId(item[1])) {
                      element.children = element.children ? element.children : []
                      element.children.push(
                        {
                          fullName: item[0],
                          id: item[1],
                        }
                      )
                    }
                  }
                }
              }
              if (item.length < 2) return
              if (item.length == 2) {
                if (!this.isRepeatId(item[1])) {
                  this.options.push({
                    fullName: item[0],
                    id: item[1],
                  })
                }
              } else {
                getParentId(this.options, item)
              }
            }
          }
        })
      } else {
        this.options = []
      }
      this.$emit('change', this.options)
      this.visible = false
    },
    isRepeatId(id) {
      var flag = false
      const loop = (list) => {
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          if (element.id == id) {
            flag = true
          }
          if (Array.isArray(element.children)) loop(element.children)
        }
      }
      loop(this.options)
      return flag
    }
  }
}
</script>
<style lang="scss" scoped>
.format-one {
  border: 1px solid #dcdfe6;
}
.format-two {
  border-right: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
.textarea {
  >>> .el-textarea__inner {
    height: 300px !important;
  }
}
</style>
