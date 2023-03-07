<template>
  <div>
    <el-dialog :title="!dataForm.id ? '新建' : '编辑'" :close-on-click-modal="false"
      :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll width="600px">
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" v-loading="loading"
        label-width="100px">
        <jnpf-form-tip-item label="名称" prop="fullName">
          <el-input v-model="dataForm.fullName" placeholder="名称" maxlength="100">
          </el-input>
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="编码" prop="enCode">
          <el-input v-model="dataForm.enCode" placeholder="编码" maxlength="50">
          </el-input>
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="分类" prop="category">
          <el-select v-model="dataForm.category" placeholder="选择分类">
            <el-option :key="item.id" :label="item.fullName" :value="item.id"
              v-for="item in categoryList" />
          </el-select>
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="类型" prop="type">
          <el-select v-model="dataForm.type" placeholder="选择类型">
            <el-option label="门户设计" :value="0" />
            <el-option label="配置路径" :value="1" />
          </el-select>
        </jnpf-form-tip-item>
        <template v-if="dataForm.type==1">
          <jnpf-form-tip-item label="链接类型" prop="linkType" tip-label="链接类型选择页面，只支持PC显示，不支持APP显示。">
            <el-select v-model="dataForm.linkType" placeholder="选择链接类型" @change="changeLinkType">
              <el-option label="页面" :value="0" />
              <el-option label="外链" :value="1" />
            </el-select>
          </jnpf-form-tip-item>
          <jnpf-form-tip-item label="链接地址" prop="customUrl">
            <el-input v-model="dataForm.customUrl" placeholder="链接地址">
              <template slot="prepend" v-if="dataForm.linkType===0">@/views/</template>
            </el-input>
          </jnpf-form-tip-item>
        </template>
        <template v-if="dataForm.type==0">
          <jnpf-form-tip-item label="锁定" prop="enabledLock"
            tip-label="启用：不允许拖拽移动控件；禁用：允许用户在PC门户上拖拽大小及移动控件。">
            <el-switch v-model="dataForm.enabledLock" :active-value="1" :inactive-value="0" />
          </jnpf-form-tip-item>
        </template>
        <jnpf-form-tip-item label="排序" prop="sortCode">
          <el-input-number :min="0" :max="999999" v-model="dataForm.sortCode"
            controls-position="right" />
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="状态" prop="enabledMark">
          <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
        </jnpf-form-tip-item>
        <jnpf-form-tip-item label="说明" prop="description">
          <el-input v-model="dataForm.description" placeholder="说明" type="textarea" :rows="3" />
        </jnpf-form-tip-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()"
          :disabled="designBtnLoading">
          {{$t('common.confirmButton')}}</el-button>
        <el-button type="primary" @click="dataFormSubmit(1)" v-if="dataForm.type==0"
          :disabled="btnLoading" :loading="designBtnLoading">
          确定并设计</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPortalInfo, Update, Create } from '@/api/onlineDev/portal'
import PortalDesign from '@/components/VisualPortal/PortalDesign'
export default {
  components: { PortalDesign },
  data() {
    return {
      visible: false,
      loading: false,
      btnLoading: false,
      categoryList: [],
      dataForm: {
        id: '',
        fullName: '',
        enCode: '',
        sortCode: 0,
        enabledMark: 1,
        type: 0,
        linkType: null,
        customUrl: '',
        category: '',
        description: "",
        enabledLock: 1,
      },
      designBtnLoading: false,
      dataRule: {
        fullName: [
          { required: true, message: '门户名称不能为空', trigger: 'blur' },
          { validator: this.formValidate('fullName'), trigger: 'blur' },
        ],
        enCode: [
          { required: true, message: '门户编码不能为空', trigger: 'blur' },
          { validator: this.formValidate('enCode'), trigger: 'blur' },
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' },
        ],
        category: [
          { required: true, message: '门户分类不能为空', trigger: 'change' },
        ],
        linkType: [
          { required: true, message: '链接类型不能为空', trigger: 'change' },
        ],
        customUrl: [
          { required: true, message: '链接地址不能为空', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    init(categoryList, id) {
      this.categoryList = categoryList
      this.dataForm.id = id || ''
      this.visible = true
      this.btnLoading = false
      this.designBtnLoading = false
      this.dataForm.formData = null
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.loading = true
          getPortalInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.loading = false
          }).catch(() => { this.loading = false })
        }
      })
    },
    changeLinkType() {
      this.dataForm.customUrl = ''
    },
    dataFormSubmit(type) {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) return
        if (type) {
          this.designBtnLoading = true
        } else {
          this.btnLoading = true
        }
        const formMethod = this.dataForm.id ? Update : Create
        formMethod(this.dataForm).then((res) => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.btnLoading = false
              this.visible = false
              this.$emit('close', true)
              if (!this.dataForm.id) this.dataForm.id = res.data
              if (type == 1) this.$emit('initPortalDesign', this.dataForm.fullName, this.dataForm.id)
            }
          })
        }).catch(() => { this.btnLoading = false })
      })
    }
  }
}
</script>
