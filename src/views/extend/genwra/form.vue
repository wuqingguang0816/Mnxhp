<template>
<el-dialog :title="!dataForm.id ? '新建' :'编辑'"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24"  >
                <el-form-item  label="名字"   prop="F_name" >
                    <el-input   v-model="dataForm.F_name" @change="changeData('F_name',-1)"   placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24"  >
                <el-form-item  label="年龄"   prop="F_age" >
                    <el-input   v-model="dataForm.F_age" @change="changeData('F_age',-1)"   placeholder="请输入"  clearable  :style='{"width":"100%"}'>

                </el-input>
                </el-form-item>
            </el-col>
    </template>
</el-form>
    <SelectDialog v-if="selectDialogVisible" :config="currTableConf" :formData="dataForm"
              ref="selectDialog" @select="addForSelect" @close="selectDialogVisible=false"/>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false"> 取 消</el-button>
        <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading"> 确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
    import { getDictionaryDataSelector } from '@/api/systemData/dictionary'

    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                loading: false,
                btnLoading: false,
                selectDialogVisible: false,
                currTableConf:{},
                addTableConf:{
            },
                tableRows:{
                },
            currVmodel:"",
            dataForm: {
                                                                F_name : '',
                                                                F_age : '',
            },
            rules:
            {



            },

            childIndex:-1,
                    isEdit:false,
                    interfaceRes: {
                        F_name:[
                    ],
                        F_age:[
                    ],
            },
        }
        },
        computed: {},
        watch: {},
        created() {
            this.dataAll()
        },
        mounted() {},
        methods: {
            changeData(model, index) {
                this.isEdit = false
                this.childIndex = index
                let modelAll = model.split("-");
                let faceMode = "";
                for (let i = 0; i < modelAll.length; i++) {
                    faceMode += modelAll[i];
                }
                for (let key in this.interfaceRes) {
                    if (key != faceMode) {
                        let faceReList = this.interfaceRes[key]
                        for (let i = 0; i < faceReList.length; i++) {
                            if (faceReList[i].relationField == model) {
                                let options = 'get' + key + 'Options';
                                if(this[options]){
                                    this[options]()
                                }
                                this.changeData(key, index)
                            }
                        }
                    }
                }
            },
            changeDataFormData(type, data, model,index,defaultValue) {
                if(!this.isEdit) {
                    if (type == 2) {
                        for (let i = 0; i < this.dataForm[data].length; i++) {
                            if (index == -1) {
                                this.dataForm[data][i][model] = defaultValue
                            } else if (index == i) {
                                this.dataForm[data][i][model] = defaultValue
                            }
                        }
                    } else {
                        this.dataForm[data] = defaultValue
                    }
                }
            },
            dataAll(){
            },
            clearData(){
                               this.dataForm.F_name = '';
                               this.dataForm.F_age = '';
            },
            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    this.$refs['elForm'].resetFields();
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/GenWra/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                            this.loading = false
                        });
                    }else{
                       this.clearData()
                    }
                });
                this.$store.commit('generator/UPDATE_RELATION_DATA', {})
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['elForm'].validate((valid) => {
                    if (valid) {
                            this.request()
                    }
                })
            },
            request() {
                this.btnLoading = true
                let _data =this.dataList()
                if (!this.dataForm.id) {
                    request({
                        url: '/api/example/GenWra',
                        method: 'post',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.btnLoading = false
                                this.$emit('refresh', true)
                            }
                        })
                    }).catch(()=>{  this.btnLoading = false  })
                }else{
                    request({
                        url: '/api/example/GenWra/'+this.dataForm.id,
                        method: 'PUT',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.btnLoading = false
                                this.$emit('refresh', true)
                            }
                        })
                    }).catch(()=>{  this.btnLoading = false  })
                }
            },
            openSelectDialog(key) {
                this.currTableConf=this.addTableConf[key]
                this.currVmodel=key
                this.selectDialogVisible = true
                this.$nextTick(() => {
                    this.$refs.selectDialog.init()
                })
            },
            addForSelect(data) {
                for (let i = 0; i < data.length; i++) {
                    let item={...this.tableRows[this.currVmodel],...data[i]}
                    this.dataForm[this.currVmodel].push(item)
                }
            },
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                return _data;
            },
            dataInfo(dataAll){
                let _dataAll =dataAll
                this.dataForm = _dataAll
                this.isEdit = true
                this.dataAll()
                this.childIndex=-1
            },
        },
    }

</script>
