<template>
  <div class="process-container" v-loading="loading">
    <div class="left-container">
      <div class="left-list">
        <div class="left-item" @click="changeFlow(item)" v-for="(item,i) in flowList"
          :key="item.flowId" :class="{'active':activeConf.flowId===item.flowId}">
          <p class="name">{{item.fullName}}</p>
          <el-dropdown @click.stop>
            <i class="icon el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="copyFlow(item)">复制</el-dropdown-item>
              <el-dropdown-item @click.native="editFlow(item)">编辑</el-dropdown-item>
              <el-dropdown-item @click.native="delFlow(i)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="add-btn" @click="addFlow">
        <el-button type="text" icon="el-icon-plus">添加流程</el-button>
      </div>
    </div>
    <div class="center-container">
      <process-main :conf="activeConf.flowTemplateJson" :flowType="flowType"
        v-if="activeConf && activeConf.flowTemplateJson" :verifyMode="verifyMode" :key="key" />
    </div>
    <el-dialog :title="handleType === 'add' ? '新建流程' : '编辑流程'" :close-on-click-modal="false"
      append-to-body :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll
      width="600px">
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
        <el-form-item label="流程名称" prop="fullName">
          <el-input v-model="dataForm.fullName" placeholder="流程名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit()">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ProcessMain from "./main"
import { NodeUtils, getMockData } from "./FlowCard/util.js";

export default {
  name: 'Process',
  props: ['tabName', 'conf', 'flowType'],
  data() {
    let data = {}
    if (typeof this.conf === 'object' && this.conf !== null && JSON.stringify(this.conf) !== '{}') {
      data = Object.assign(NodeUtils.createNode('start'), this.conf)
    } else {
      data = getMockData()
    }
    return {
      data,
      activeConf: null,
      key: + new Date(),
      loading: false,
      verifyMode: false,
      flowList: [],
      visible: false,
      handleType: '',
      dataForm: {
        fullName: '',
        id: '',
        flowId: ''
      },
      dataRule: {
        fullName: [
          { required: true, message: '请输入流程名称', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    ProcessMain
  },
  created() {
    this.loading = true
    if (Array.isArray(this.conf) && this.conf !== null && JSON.stringify(this.conf) !== '[]') {
      this.flowList = this.conf
    } else {
      let item = {
        id: '',
        flowId: this.jnpf.idGenerator(),
        fullName: '流程',
        flowTemplateJson: getMockData()
      }
      this.flowList = [item]
    }
    this.activeConf = this.flowList[0]
    this.$nextTick(() => {
      this.loading = false
    })
    this.$store.dispatch('base/getPositionList')
    this.$store.dispatch('base/getRoleList')
    this.$store.dispatch('generator/getDepTree')
    this.$store.dispatch('generator/getGroupTree')
  },
  methods: {
    // 给父级组件提供的获取流程数据得方法
    getData() {
      this.verifyMode = true
      let boo = true
      let errorItem = {}
      for (let i = 0; i < this.flowList.length; i++) {
        boo = NodeUtils.checkAllNode(this.flowList[i].flowTemplateJson)
        errorItem = this.flowList[i]
        if (!boo) break;
      }
      if (boo) {
        return Promise.resolve({ formData: this.flowList })
      } else {
        return Promise.reject({ target: 2, msg: `请完善${errorItem.fullName}的流程设计` })
      }
    },
    addFlow() {
      this.handleType = 'add'
      this.dataForm = {
        id: '',
        flowId: this.jnpf.idGenerator(),
        fullName: '',
        flowTemplateJson: getMockData()
      }
      this.visible = true
    },
    editFlow(item) {
      this.handleType = 'edit'
      this.dataForm = JSON.parse(JSON.stringify(item))
      this.visible = true
    },
    delFlow(index) {
      if (this.flowList.length === 1) return this.$message.warning(`最后一个流程不能删除`);
      this.$confirm('此操作将永久删除该流程，是否继续？', '提示', {
        type: 'warning'
      }).then(() => {
        this.flowList.splice(index, 1)
      }).catch(() => { })
    },
    copyFlow(item) {
      let itemCopy = JSON.parse(JSON.stringify(item))
      this.$confirm('您确定要复制该流程，是否继续？', '提示', {
        type: 'warning'
      }).then(() => {
        let flowId = this.jnpf.idGenerator()
        const data = {
          id: '',
          flowId,
          fullName: itemCopy.fullName + flowId,
          flowTemplateJson: itemCopy.flowTemplateJson
        }
        this.flowList.push(data)
      }).catch(() => { })
    },
    changeFlow(item) {
      if (item.flowId === this.activeConf.flowId) return
      this.activeConf = item
      this.key = +new Date()
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.handleType === 'add') {
            this.flowList.push(JSON.parse(JSON.stringify(this.dataForm)))
            this.activeConf = this.flowList[this.flowList.length - 1]
            this.key = +new Date()
          } else {
            for (let i = 0; i < this.flowList.length; i++) {
              if (this.dataForm.flowId === this.flowList[i].flowId) {
                this.$set(this.flowList, i, JSON.parse(JSON.stringify(this.dataForm)))
                break
              }
            }
          }
          this.visible = false
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
.process-container {
  display: flex;
  height: 100%;

  .left-container {
    flex-shrink: 0;
    width: 220px;
    margin-right: 10px;
    background: #fff;
    border-radius: 4px;
    height: 100%;
    .left-list {
      padding: 10px;
      height: calc(100% - 40px);
      border-bottom: 1px solid #dcdfe6;
      overflow: auto;
      .left-item {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #dcdfe6;
        padding: 0 10px;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 10px;
        &.active {
          border: 1px solid #1890ff;
          background: #1890ff;
          .name {
            color: #fff;
          }
          .icon {
            color: #fff;
          }
        }
        .name {
          width: 160px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
    .add-btn {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .center-container {
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>
