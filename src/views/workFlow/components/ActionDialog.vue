<template>
  <el-dialog :title="title" :close-on-click-modal="false" :visible.sync="fromVisible"
    class="JNPF-dialog JNPF-dialog_center" lock-scroll append-to-body width='600px'>
    <el-form label-width="80px" :model="from" :rules="fromRules" ref="from">
      <template v-if="type==='transfer'">
        <el-form-item :label="title+'给谁'" prop="freeApproverUserId">
          <user-select v-model="from.freeApproverUserId" :placeholder="`请选择${title}给谁`" />
        </el-form-item>
        <el-form-item :label="title+'意见'" prop="handleOpinion">
          <el-input v-model="from.handleOpinion" :placeholder="`请输入${title}意见（选填）`" type="textarea"
            :rows="4" />
        </el-form-item>
      </template>
      <template v-if="type==='revoke' || type==='recall'">
        <el-form-item :label="title+'原因'" prop="handleOpinion">
          <el-input v-model="from.handleOpinion" :placeholder="`请输入${title}意见（选填）`" type="textarea"
            :rows="4" />
        </el-form-item>
      </template>

      <el-form-item :label="title+'附件'" prop="fileList">
        <JNPF-UploadFz v-model="from.fileList" :limit="limit"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="fromVisible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="handleAction()">{{$t('common.confirmButton')}}
      </el-button>
    </span>
  </el-dialog>
</template>

<script setup>

</script>

<script>
import { Transfer, Recall } from '@/api/workFlow/FlowBefore'
import { Revoke } from '@/api/workFlow/FlowLaunch'
export default {
    props: {
      limit:{
        type:Number,
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
          handleOpinion:'',
          freeApproverUserId:[],
          fileList: [],
        },
        fromRules:{
          freeApproverUserId: [
            { required: true, message: '请选择转审给谁', trigger: 'change' }
          ]
        }
      };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
      init(type,id){
        this.id = id
        this.type = type
        switch (this.type){
          case 'transfer':
            this.title = '转审'
            break
          case 'revoke':
          case 'recall':  
            this.title = '撤回'
            break
          default:
            break  
        }
        
        this.fromVisible = true
      },
      handleAction(){
        let actionUrl = ''
        switch (this.type){
          case 'transfer':
            actionUrl = Transfer
            break
          case 'revoke':
            actionUrl = Revoke
            break
          case 'recall':
            actionUrl = Recall
            break    
          default:
            break  
        }
        let query = {...this.from}
        query.fileList = JSON.stringify(this.from.fileList)
        actionUrl(this.id,query).then(res => {
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
      },
    },
    components: {

    },
};
</script>

<style lang="scss" scoped>

</style>
