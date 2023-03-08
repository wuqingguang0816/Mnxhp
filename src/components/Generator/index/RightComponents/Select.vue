<template>
  <el-row>
    <el-form-item label="控件标题">
      <el-input v-model="activeData.__config__.label" placeholder="请输入控件标题" />
    </el-form-item>
    <el-form-item label="标题提示">
      <el-input v-model="activeData.__config__.tipLabel" placeholder="请输入标题提示" />
    </el-form-item>
    <el-form-item label="占位提示">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <el-form-item label="默认值">
      <el-select v-model="activeData.__config__.defaultValue" placeholder="选择默认值" clearable
        :multiple="activeData.multiple" filterable>
        <el-option v-for="(item,i) in activeData.__slot__.options" :key="i"
          :label="item[activeData.__config__.props.label]"
          :value="item[activeData.__config__.props.value]">
        </el-option>
      </el-select>
    </el-form-item>
    <el-divider>数据选项</el-divider>
    <el-form-item label="" label-width="40px">
      <el-radio-group v-model="activeData.__config__.dataType" size="small"
        style="text-align:center" @change="dataTypeChange">
        <el-radio-button label="static">静态数据</el-radio-button>
        <el-radio-button label="dictionary">数据字典</el-radio-button>
        <el-radio-button label="dynamic">远端数据</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <template v-if="activeData.__config__.dataType==='static'">
      <draggable :list="activeData.__slot__.options" :animation="340" group="selectItem"
        handle=".option-drag">
        <div v-for="(item, index) in activeData.__slot__.options" :key="index" class="select-item">
          <div class="select-line-icon option-drag">
            <i class="icon-ym icon-ym-darg" />
          </div>
          <el-input v-model="item.fullName" placeholder="选项名" size="small" />
          <el-input v-model="item.id" placeholder="选项值" size="small" />
          <div class="close-btn select-line-icon"
            @click="activeData.__slot__.options.splice(index, 1)">
            <i class="el-icon-remove-outline" />
          </div>
        </div>
      </draggable>
      <div style="margin-left: 29px;">
        <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text"
          @click="addSelectItem()">
          添加选项
        </el-button>
        <el-button style="padding-bottom: 0" icon="el-icon-circle-plus-outline" type="text"
          @click="updateSelectItem">
          批量编辑
        </el-button>
      </div>
    </template>
    <template v-if="activeData.__config__.dataType === 'dictionary'">
      <el-form-item label="数据字典">
        <el-row class="jnpf-el-row">
          <el-col :span="18">
            <JNPF-TreeSelect :options="dicOptions" v-model="activeData.__config__.dictionaryType"
              placeholder="请选择数据字典" lastLevel clearable @change="dictionaryTypeChange"
              @selectChange="selectChange">
            </JNPF-TreeSelect>
          </el-col>
          <el-col :span="6">
            <el-button @click="goDictionary()">
              添加</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="存储字段">
        <el-select v-model="activeData.__config__.props.value" placeholder="请选择存储字段">
          <el-option label="id" value="id"></el-option>
          <el-option label="enCode" value="enCode"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-if="activeData.__config__.dataType === 'dynamic'">
      <el-form-item label="远端数据">
        <interface-dialog :value="activeData.__config__.propsUrl"
          :title="activeData.__config__.propsName" popupTitle="远端数据" @change="propsUrlChange" />
      </el-form-item>
      <el-form-item label="存储字段">
        <el-input v-model="activeData.__config__.props.value" placeholder="请输入存储字段" />
      </el-form-item>
      <el-form-item label="显示字段">
        <el-input v-model="activeData.__config__.props.label" placeholder="请输入显示字段" />
      </el-form-item>
      <el-table :data="activeData.__config__.templateJson"
        v-if="activeData.__config__.templateJson && activeData.__config__.templateJson.length">
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column prop="field" label="参数名称">
          <template slot-scope="scope">
            <span class="required-sign">{{scope.row.required?'*':''}}</span>
            {{scope.row.fieldName?scope.row.field+'('+scope.row.fieldName+')':scope.row.field}}
          </template>
        </el-table-column>
        <el-table-column prop="value" label="表单字段">
          <template slot-scope="scope">
            <el-select v-model="scope.row.relationField" placeholder="请选择表单字段" clearable filterable
              @change="onRelationFieldChange($event,scope.row)">
              <el-option v-for="item in formFieldsOptions" :key="item.realVModel"
                :label="item.realLabel" :value="item.realVModel">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-divider />
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="能否搜索" v-show="showType==='pc'">
      <el-switch v-model="activeData.filterable" />
    </el-form-item>
    <el-form-item label="能否多选">
      <el-switch v-model="activeData.multiple" @change="multipleChange" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>
    <div>
      <el-dialog :visible.sync="dicVisible" append-to-body
        class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select" lock-scroll width="80%"
        @close="defaultValueChange">
        <dicIndex ref="dicIndex"></dicIndex>
      </el-dialog>
      <el-dialog :visible.sync="updateVisible" append-to-body title="批量编辑"
        class="JNPF-dialog JNPF-dialog_center update-dialog" lock-scroll width="400">
        <el-alert title="注意：每行对应一个选项；选项名和选项值之间用英文 | 隔开。参考格式如下：" type="warning" :closable="false"
          show-icon />
        <el-input type="textarea" :rows="10" v-model="resultInfo" autosize></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">{{$t('common.cancelButton')}}</el-button>
          <el-button type="primary" @click="handleSure()">
            {{$t('common.confirmButton')}}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </el-row>
</template>
<script>
import comMixin from './mixin';
import dynamicMixin from './dynamicMixin';
import dicIndex from '@/views/systemData/dictionary/index.vue';
export default {
  components: {
    dicIndex
  },
  mixins: [comMixin, dynamicMixin],
  data() {
    return {
      dicVisible: false,
      updateVisible: false,
      resultInfo: '',
      separator: '|',
    }
  },
  methods: {
    addSelectItem() {
      const id = this.jnpf.idGenerator()
      this.activeData.__slot__.options.push({
        id: id,
        fullName: '选项' + id,
      })
    },
    selectChange() {
      this.$emit('changeSelect')
      this.dictionaryTypeChange(this.dictionaryId)
    },
    defaultValueChange() {
      this.selectChange()
    },
    goDictionary() {
      this.dicVisible = true
      this.$nextTick(() => {
        this.$refs.dicIndex.initData()
      })
    },
    updateSelectItem() {
      this.resultInfo = ''
      if (this.activeData.__slot__.options.length > 0) {
        this.activeData.__slot__.options.forEach((opt) => {
          if (opt.id === opt.fullName) {
            this.resultInfo += opt.id + '\n'
          } else {
            this.resultInfo += opt.fullName + this.separator + opt.id + '\n'
          }
        })
      }
      this.updateVisible = true
    },
    handleSure() {
      let lineArray = this.resultInfo.split('\n')
      if (lineArray.length > 0) {
        this.activeData.__slot__.options = []
        lineArray.forEach((optLine) => {
          if (!!optLine && !!optLine.trim()) {
            if (optLine.indexOf(this.separator) !== -1) {
              this.activeData.__slot__.options.push({
                id: optLine.split(this.separator)[0],
                fullName: optLine.split(this.separator)[1]
              })
            } else {
              this.activeData.__slot__.options.push({
                id: optLine,
                fullName: optLine
              })
            }
          }
        })
      } else {
        this.activeData.__slot__.options = []
      }
      this.updateVisible = false
    },
  }
}
</script>
<style lang="scss" scoped>
.jnpf-el-row {
  >>> .el-input__inner {
    border-radius: 4px 0 0 4px !important;
  }

  >>> .el-button {
    border-left: 0;
    background-color: #f5f7fa;
    font-size: 13px;
    color: #909399;
    border-radius: 0 4px 4px 0;
    line-height: 12px;
  }
  >>> .el-button:hover {
    border-color: #dcdfe6;
  }
}
.update-dialog {
  >>> .jsoneditor-outer {
    >>> .el-dialog__body {
      // min-height: 300px !important;
      padding: 10px 20px 10px !important;
    }
    .option-box-tip {
      margin-bottom: 20px;
    }
  }
}
</style>