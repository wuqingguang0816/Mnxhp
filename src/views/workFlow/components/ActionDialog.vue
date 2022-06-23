<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="fromVisible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width='600px'>
    <el-form label-width="80px" :model="from" :rules="fromRules" ref="from">
      <template v-if="type==='transfer'||type==='assign'">
        <el-form-item label="指派节点" prop="nodeCode" v-if="type==='assign'">
          <el-select v-model="from.nodeCode" placeholder="请选择指派节点">
            <el-option v-for="item in assignNodeList" :key="item.nodeCode" :label="item.nodeName"
              :value="item.nodeCode" />
          </el-select>
        </el-form-item>
        <el-form-item :label="title+'给谁'" prop="freeApproverUserId"
          :rules="[{ required: true, message: `请选择${title}给谁`, trigger: 'click' }]">
          <user-select v-model="from.freeApproverUserId" :placeholder="`请选择${title}给谁`" />
        </el-form-item>
        <el-form-item :label="title+'意见'" prop="handleOpinion">
          <el-input v-model="from.handleOpinion" :placeholder="`请输入${title}意见（选填）`" type="textarea"
            :rows="4" />
        </el-form-item>
      </template>
      <template v-if="type==='revoke'||type==='recall'">
        <el-form-item :label="title+'原因'" prop="handleOpinion">
          <el-input v-model="from.handleOpinion" :placeholder="`请输入${title}原因（选填）`" type="textarea"
            :rows="4" />
        </el-form-item>
      </template>
      <el-form-item :label="title+'附件'" prop="fileList">
        <JNPF-UploadFz v-model="from.fileList" :limit="limit" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="fromVisible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="handleAction()">{{$t('common.confirmButton')}}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Transfer, Recall, Assign } from '@/api/workFlow/FlowBefore'
import { Revoke } from '@/api/workFlow/FlowLaunch'
export default {
  props: {
    assignNodeList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      fromVisible: false,
      type: '',
      title: '',
      id: '',
      from: {
        nodeCode: '',
        handleOpinion: '',
        freeApproverUserId: '',
        fileList: [],
      },
      fromRules: {
        nodeCode: [
          { required: true, message: '请选择指派节点', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    init(type, id) {
      this.id = id
      this.type = type
      switch (this.type) {
        case 'transfer':
          this.title = '转审'
          break
        case 'assign':
          this.title = '指派'
          break
        case 'revoke':
        case 'recall':
          this.title = '撤回'
          break
        default:
          break
      }
      this.fromVisible = true
      this.$nextTick(() => {
        this.$refs.from.resetFields()
        this.from.nodeCode = ''
        this.from.freeApproverUserId = ''
        this.from.handleOpinion = ''
      })
    },
    handleAction() {
      this.$refs.from.validate((valid) => {
        if (!valid) return
        let formMethod = ''
        switch (this.type) {
          case 'transfer':
            formMethod = Transfer
            break
          case 'assign':
            formMethod = Assign
            break
          case 'revoke':
            formMethod = Revoke
            break
          case 'recall':
            formMethod = Recall
            break
          default:
            break
        }
        let query = { ...this.from }
        query.fileList = JSON.stringify(this.from.fileList)
        formMethod(this.id, query).then(res => {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.$refs.from.resetFields()
              this.fromVisible = false
              this.$emit('close', true)
            }
          })
        })
      })
    },
  }
}
</script>