<template>
  <div class="comSelect-container">
    <el-row>
      <el-col :span="18">
        <JNPF-TreeSelect :options="treeData" v-model="innerValue" :placeholder="placeholder"
          clearable :disabled="disabled" v-on="$listeners" lastLevel @selectChange="selectChange">
        </JNPF-TreeSelect>
      </el-col>
      <el-col :span="6">
        <el-button @click="goDictionary()">
          添加</el-button>
      </el-col>
    </el-row>
    <div>
      <el-dialog :visible.sync="dicVisible" append-to-body
        class="JNPF-dialog JNPF-dialog_center JNPF-dialog-tree-select" lock-scroll width="80%"
        @close="defaultValueChange">
        <dicIndex ref="dicIndex"></dicIndex>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dicIndex from '@/views/systemData/dictionary/index.vue';
export default {
  components: {
    dicIndex
  },
  name: 'dicSelect',
  props: ["value", "disabled", "placeholder"],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      treeData: [],
      innerValue: this.value,
      dicVisible: false,
    }
  },
  methods: {
    async getData() {
      this.treeData = await this.$store.dispatch('generator/getDicTree')
    }
  },
  created() {
    this.getData()
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
  watch: {
    innerValue(val) {
      val && this.$emit('change', val)
    },
    value(val) {
      this.innerValue = val
    }
  }
}
</script>
<style lang="scss">
.comSelect-container {
  .el-select {
    width: 100%;
  }
}
</style>