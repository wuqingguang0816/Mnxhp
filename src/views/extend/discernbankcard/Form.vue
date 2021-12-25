<template>
<el-dialog :title="!dataForm.id ? '新建' :  isDetail ? '详情':'编辑'"
           :close-on-click-modal="false"
           :visible.sync="visible" class="JNPF-dialog JNPF-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" :rules="rules" size="small" label-width="100px" label-position="right" :disabled="!!isDetail">
            <el-col :span="12" >
                <el-form-item  label="银行卡号"   prop="numvalue" >
                    <el-input    v-model="dataForm.numvalue" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="持卡人姓名"   prop="namevalue" >
                    <el-input    v-model="dataForm.namevalue" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="有效期"   prop="datevalue" >
                    <el-input    v-model="dataForm.datevalue" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="银行卡类型 "   prop="value4" >
                    <el-input    v-model="dataForm.value4" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="银行名 "   prop="value5" >
                    <el-input    v-model="dataForm.value5" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="12" >
                <el-form-item  label="民族"   prop="value6" >
                    <el-input    v-model="dataForm.value6" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="签发机关"   prop="value7" >
                    <el-input    v-model="dataForm.value7" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="有限期限"   prop="value8" >
                    <el-input    v-model="dataForm.value8" placeholder="请输入"  clearable  :style='{"width":"100%"}'>
                </el-input>
                </el-form-item>
            </el-col> -->
            <!-- <el-col :span="12" >
                <el-form-item  label="创建用户"   prop="creatoruserid" >
                    <el-input    v-model="dataForm.creatoruserid" placeholder="系统自动生成"  readonly >
                </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item  label="创建时间"   prop="creatortime" >
                    <el-input    v-model="dataForm.creatortime" placeholder="系统自动生成"  readonly >
                </el-input>
                </el-form-item>
            </el-col> -->
</el-form>
</el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false"> 取 消</el-button>
        <el-button type="primary" @click="dataFormSubmit()" v-if="!isDetail"> 确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    import { previewDataInterface } from '@/api/systemData/dataInterface'
    import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
    export default {
        components: {},
        props: [],
        data() {
            return {
                visible: false,
                loading: false,
                isDetail: false,
            dataForm: {
                            numvalue : '',
                            namevalue : '',
                            datevalue : '',
                            value4 : '',
                            value5 : '',
                            value6 : '',
                            value7 : '',
                            value8 : '',
                            creatoruserid : "",
                            creatortime : "",
            },
            rules:
            {
            },
        }
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {},
        methods: {
            init(id, isDetail) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.isDetail = isDetail || false;
                this.$nextTick(() => {
                    this.$refs['elForm'].resetFields();
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/extend/DiscernCard/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                          console.log(this.dataForm)
                            this.loading = false
                        })
                    }

                })
            },
            // 表单提交
            dataFormSubmit() {
                this.dataRule()
                this.$refs['elForm'].validate((valid) => {
                    if (valid) {
                            this.request()
                    }
                })
            },
            request() {
                var _data =this.dataList()
                if (!this.dataForm.id) {
                    request({
                        url: '/api/extend/DiscernCard',
                        method: 'post',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refresh', true)
                            }
                        })
                    })
                }else{
                    request({
                        url: '/api/extend/DiscernCard/'+this.dataForm.id,
                        method: 'PUT',
                        data: _data
                    }).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refresh', true)
                            }
                        })
                    })
                }
            },
            dataList(){
                var _data = JSON.parse(JSON.stringify(this.dataForm));
                return _data;
            },
            dataRule(){
            },
            dataInfo(data){
                this.dataForm = data
            },
        },
    }

</script>
