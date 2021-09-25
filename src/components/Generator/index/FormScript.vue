<template>
  <el-dialog title="表单脚本" :close-on-click-modal="false"
    class="JNPF-dialog JNPF-dialog_center form-script-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="950px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
    <div class="form-script-dialog-body">
      <div class="left-tree">
        <el-tree :data="treeData" default-expand-all :expand-on-click-node="false"
          :props="treeProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="right-main">
        <JNPFCodeEditor v-model="text" :options="options" ref="CodeEditor" />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="onClose()">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import JNPFCodeEditor from '@/components/JNPFEditor/monaco'
export default {
  components: { JNPFCodeEditor },
  props: ['tpl', 'fields'],
  data() {
    return {
      text: '',
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'label',
      },
      treeData: [],
      options: {
        language: 'vue'
      },
    }
  },
  watch: {
    keyword(val) {
      this.search()
    },
    activeName(val) {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.search()
      }
    }
  },
  methods: {
    onOpen() {
      this.text = this.tpl
      this.getTree()
      this.$nextTick(() => {
        this.$refs.CodeEditor.changeEditor({
          value: this.text,
          options: this.options
        })
      });
    },
    getTree() {
      let list = []
      const loop = (data, parent) => {
        if (!data) return
        if (data.__config__ && data.__config__.jnpfKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
          loop(data.__config__.children, data)
        }
        if (Array.isArray(data)) data.forEach(d => loop(d, parent))
        if (data.__vModel__) {
          if (data.__config__.jnpfKey === 'table') {
            let item = {
              value: data.__vModel__,
              label: data.__config__.label,
              children: []
            }
            let children = []
            if (data.__config__.children && Array.isArray(data.__config__.children) && data.__config__.children.length) {
              for (let i = 0; i < data.__config__.children.length; i++) {
                const child = data.__config__.children[i]
                children.push({ value: child.__vModel__, label: child.__config__.label })
              }
            }
            item.children = children
            list.push(item)
          } else {
            list.push({ value: data.__vModel__, label: data.__config__.label })
          }
        }
      }
      loop(this.fields)
      this.treeData = list
    },
    onClose() {
      this.$emit('updateScript', this.text)
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    handleNodeClick(item, node) {
      this.$refs.CodeEditor.insert(item.value);
    }
  }
}
</script>
<style lang="scss" scoped>
.form-script-dialog {
  >>> .el-dialog .el-dialog__body {
    padding: 10px 30px 2px;
  }
  .form-script-dialog-body {
    height: 600px;
    display: flex;

    .left-tree {
      height: 600px;
      width: 220px;
      flex-shrink: 0;
    }
    .right-main {
      height: 600px;
      flex: 1;
      border: 1px solid #ddd;
    }
  }
}
</style>