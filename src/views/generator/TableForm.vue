<template>
  <el-dialog title="数据选择" :close-on-click-modal="false" width="800px" class="JNPF-dialog JNPF-dialog_center table-dialog"
    lock-scroll append-to-body v-bind="$attrs" v-on="$listeners" @open="onOpen">
    <el-row class="JNPF-common-search-box" :gutter="16">
      <el-form @submit.native.prevent>
        <el-col :span="10">
          <el-form-item label="关键词">
            <el-input v-model="keyword" placeholder="请输入关键词查询" clearable @keyup.enter.native="initData()" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="initData()">
              {{ $t('common.search') }}</el-button>
            <el-button icon="el-icon-refresh-right" @click="refresh()">{{ $t('common.reset') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="JNPF-common-search-box-right">
        <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
          <el-link icon="icon-ym icon-ym-Refresh JNPF-common-head-icon" :underline="false" @click="initData()" />
        </el-tooltip>
      </div>
    </el-row>
    <JNPF-table v-loading="listLoading" :data="list" hasC @selection-change="handleSelectionChange" :border="false">
      <el-table-column prop="table" label="表名" width="300" />
      <el-table-column prop="tableName" label="说明" show-overflow-tooltip />
    </JNPF-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{ $t('common.cancelButton') }}</el-button>
      <el-button type="primary" @click="select()">{{ $t('common.confirmButton') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { DataModelListAll } from '@/api/systemData/dataModel'
export default {
  props: ['dbLinkId'],
  data() {
    return {
      listLoading: true,
      keyword: '',
      list: [],
      checked: []
    }
  },
  methods: {
    onOpen() {
      this.initData()
    },
    closeDialog() {
      this.$emit('update:visible', false)
    },
    refresh() {
      this.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      const dbLinkId = this.dbLinkId || '0'
      DataModelListAll(dbLinkId, {
        keyword: this.keyword,
        currentPage: 1,
        pageSize: 1000000
      }).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    select() {
      this.$emit('closeForm', this.checked)
      this.$emit('update:visible', false)
    },
    handleSelectionChange(val) {
      this.checked = val
    }
  }
}
</script>
<style lang="scss" scoped>
.table-dialog {
  >>>.el-dialog__body {
    height: 70vh;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .JNPF-common-search-box {
      margin-bottom: 0;

      .JNPF-common-search-box-right {
        padding: 10px 10px 0 0;
      }
    }
  }
}
</style>
