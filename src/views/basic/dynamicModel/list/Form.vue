<template>
  <div>
    <template v-if="formConf.popupType==='general'&&dialogLoading">
      <el-dialog :title="!dataForm.id ? '新建' : '编辑'" :close-on-click-modal="false"
        :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll
        :width="formConf.generalWidth">
        <parser :form-conf="formConf" @submit="submitForm" :key="key" ref="dynamicForm"
          v-if="!loading" />
        <span slot="footer" class="dialog-footer">
          <template v-if="formConf.hasPrintBtn && formConf.printId && dataForm.id && false">
            <el-button type="primary" @click="print">
              {{formConf.printButtonText||'打 印'}}
            </el-button>
          </template>
          <el-button @click="visible = false">{{formConf.cancelButtonText||'取 消'}}</el-button>
          <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
            {{formConf.confirmButtonText||'确 定'}}</el-button>
        </span>
      </el-dialog>
    </template>
    <template v-if="formConf.popupType==='fullScreen'">
      <transition name="el-zoom-in-center">
        <div class="JNPF-preview-main">
          <div class="JNPF-common-page-header">
            <el-page-header @back="goBack" :content="!dataForm.id ? '新建' : '编辑'" />
            <div class="options">
              <template v-if="formConf.hasPrintBtn && formConf.printId && dataForm.id && false">
                <el-button type="primary" @click="print">
                  {{formConf.printButtonText||'打 印'}}
                </el-button>
              </template>
              <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
                {{formConf.confirmButtonText||'确 定'}}</el-button>
              <el-button @click="goBack">{{formConf.cancelButtonText||'取 消'}}</el-button>
            </div>
          </div>
          <div class="dynamic-form-main" v-if="!loading"
            :style="{margin: '0 auto',width:formConf.fullScreenWidth}">
            <parser :form-conf="formConf" @submit="submitForm" :key="key" ref="dynamicForm" />
          </div>
        </div>
      </transition>
    </template>
    <template v-if="formConf.popupType==='drawer'">
      <el-drawer :title="!dataForm.id ? '新建' : '编辑'" :visible.sync="visible"
        :wrapperClosable="false" :size='formConf.drawerWidth' append-to-body
        class="JNPF-common-drawer">
        <div class="JNPF-flex-main">
          <div class="dynamicForm">
            <parser :form-conf="formConf" @submit="submitForm" :key="key" ref="dynamicForm"
              v-if="!loading" />
          </div>
          <div class="drawer-footer">
            <template v-if="formConf.hasPrintBtn && formConf.printId && dataForm.id && false">
              <el-button type="primary" @click="print">
                {{formConf.printButtonText||'打 印'}}
              </el-button>
            </template>
            <el-button @click="visible = false">{{formConf.cancelButtonText||'取 消'}}</el-button>
            <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
              {{formConf.confirmButtonText||'确 定'}}</el-button>
          </div>
        </div>
      </el-drawer>
    </template>
    <print-browse :visible.sync="printBrowseVisible" :id="formConf.printId" :formId="dataForm.id" />
  </div>
</template>

<script>
import { createModel, updateModel, getModelInfo } from '@/api/onlineDev/visualDev'
import Parser from '@/components/Generator/parser/Parser'
import PrintBrowse from '@/components/PrintBrowse'
import { deepClone } from '@/utils'
import {mapGetters} from "vuex";

export default {
  components: { Parser, PrintBrowse },
  data() {
    return {
      visible: false,
      key: +new Date(),
      formConf: {},
      dataForm: {
        id: '',
        data: ''
      },
      modelId: '',
      formData: {},
      btnLoading: false,
      loading: true,
      isPreview: false,
      useFormPermission: false,
      printBrowseVisible: false,
      formOperates: [],
      dialogLoading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    goBack() {
      this.$emit('refreshDataList')
    },
    print() {
      if (this.isPreview) return this.$message({ message: '功能预览不支持打印', type: 'warning' })
      this.printBrowseVisible = true
    },
    init(formConf, modelId, id, isPreview, useFormPermission) {
      this.formConf = deepClone(formConf)
      this.modelId = modelId
      this.isPreview = isPreview
      this.useFormPermission = useFormPermission
      this.dataForm.id = id || ''
      this.getFormOperates()
      this.loading = true
      this.dialogLoading = false
      this.$nextTick(() => {
        if (this.dataForm.id) {
          let extra = {
            modelId,
            id,
            type: 2
          }
          this.$store.commit('generator/SET_DYNAMIC_MODEL_EXTRA', extra)
          getModelInfo(modelId, this.dataForm.id).then(res => {
            this.dataForm = res.data
            if (!this.dataForm.data) return
            this.formData = { ...JSON.parse(this.dataForm.data), id: this.dataForm.id }
            this.fillFormData(this.formConf, this.formData)
            this.dialogLoading = true
            this.$nextTick(() => {
              this.visible = true
              this.loading = false
            })
          })
        } else {
          this.$store.commit('generator/SET_DYNAMIC_MODEL_EXTRA', {})
          //处理默认值
          let fields = this.formConf.fields;
          this.formData = {}
          if(fields != null && fields.length > 0) {
            for(let i = 0, len = fields.length; i< len; i++) {
              if(fields[i].__config__.jnpfKey === 'date' && fields[i].__config__.defaultCurrent == true) {
                this.formData[fields[i].__vModel__] = new Date().getTime()
              }else if(fields[i].__config__.jnpfKey === 'depSelect' && fields[i].__config__.defaultCurrent == true) {
                this.formData[fields[i].__vModel__] =  this.userInfo.departmentId
              }else if(fields[i].__config__.jnpfKey === 'comSelect' && fields[i].__config__.defaultCurrent == true) {
                this.formData[fields[i].__vModel__] =  this.userInfo.organizeId
              }else if(fields[i].__config__.jnpfKey === 'userSelect' && fields[i].__config__.defaultCurrent == true) {
                this.formData[fields[i].__vModel__] =  this.userInfo.userId
              }
            }
          }
          this.fillFormData(this.formConf, this.formData)
          this.dialogLoading = true
          this.$nextTick(() => {
            this.visible = true
            this.loading = false
          })
        }
        this.key = +new Date()
      })
    },
    getFormOperates() {
      if (this.isPreview || !this.useFormPermission) return
      const permissionList = this.$store.getters.permissionList
      const modelId = this.$route.meta.modelId
      const list = permissionList.filter(o => o.modelId === modelId)
      this.formOperates = list[0] && list[0].form ? list[0].form : []
    },
    fillFormData(form, data) {
      const loop = (list, parent) => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.__vModel__) {
            const val = data.hasOwnProperty(item.__vModel__) ? data[item.__vModel__] : item.__config__.defaultValue
            if (!item.__config__.isSubTable) item.__config__.defaultValue = val
            if (!this.isPreview && this.useFormPermission) {
              let id = item.__config__.isSubTable ? parent.__vModel__ + '-' + item.__vModel__ : item.__vModel__
              let noShow = true
              if (this.formOperates && this.formOperates.length) {
                noShow = !this.formOperates.some(o => o.enCode === id)
              }
              noShow = item.__config__.noShow ? item.__config__.noShow : noShow
              this.$set(item.__config__, 'noShow', noShow)
            }
          }
          if (item.__config__ && item.__config__.children && Array.isArray(item.__config__.children)) {
            loop(item.__config__.children, item)
          }
        }
      }
      loop(form.fields)
      form.formData = data
    },
    submitForm(data, callback) {
      if (!data) return
      this.btnLoading = true
      const formData = { ...this.formData, ...data }
      this.dataForm.data = JSON.stringify(formData)
      const formMethod = this.dataForm.id ? updateModel : createModel
      formMethod(this.modelId, this.dataForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500,
          onClose: () => {
            if (callback && typeof callback === "function") callback()
            this.visible = false
            this.btnLoading = false
            this.$emit('refreshDataList', true)
          }
        })
      }).catch(() => { this.btnLoading = false })
    },
    dataFormSubmit() {
      if (this.isPreview) return this.$message({ message: '功能预览不支持数据保存', type: 'warning' })
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm()
    }
  }
}
</script>
