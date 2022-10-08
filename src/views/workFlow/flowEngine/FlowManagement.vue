<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="版本管理" />
        <div class="options">
          <el-button @click="goBack()">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main">
        <JNPF-table v-loading="listLoading" :data="list">
          <el-table-column prop="version" label="版本号" align="center">
            <template slot-scope="scope">
              <el-tag>V:{{scope.row.version}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="enabledMark" label="主版本" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.enabledMark==1?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUserId" label="创建人" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="jnpf.tableDateFormat" />
          <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="jnpf.tableDateFormat" />
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click.native="updateRelease(scope.row)"
                :disabled="scope.row.enabledMark==1">设为主版本
              </el-button>
              <el-button type="text" size="mini" @click.native="del(scope.row)" style="color:red">删除
              </el-button>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                      class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="flowInfo(scope.row)"> 流程图</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
      <!-- <FlowDetails v-if="flowVisible" ref="flow" @close="flowVisible=false" /> -->
    </div>
  </transition>
</template>

<script>
import { flowJsonList, mainVersion } from '@/api/workFlow/FlowEngine'
export default {
  components: {},
  props: [],
  data() {
    return {
      flowVisible: true,
      id: '',
      title: '',
      list: [],
      total: 0,
      listLoading: false,
      btnLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      },
      enCode: '',
    }
  },

  methods: {
    updateRelease(item) {
      this.$confirm('确认是否将当前修改的版本设为主版本？', '系统提示', {
        type: 'warning'
      }).then(() => {
        mainVersion(item.id).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: res.msg
            });
            this.initData()
          }
        })
      }).catch(() => { });
    },
    del(item) {
      this.$confirm('此操作将永久删除该数据，是否继续？', '系统提示', {
        type: 'warning'
      }).then(() => {

      }).catch(() => {
      });
    },
    flowInfo(item) {
      this.flowVisible = true
      this.$nextTick(() => {
        this.$refs.flow.inits(item)
      })
    },
    goBack() {
      this.$emit('close', true)
    },
    init(flowId) {
      this.id = flowId
      this.initData()
    },
    reset() {
      this.enCode = ''
      this.search()
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: 'desc',
        sidx: ''
      }
      this.initData()
    },
    initData() {
      this.listLoading = true
      let query = {
        ...this.listQuery,
        templateId: this.id
      }
      flowJsonList(this.id, query).then((res) => {
        this.list = res.data.list
      })
      this.listLoading = false

    },
  }
}
</script>
<style lang="scss" scoped>
.main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 0 10px;
  .JNPF-common-search-box {
    border-bottom: 1px solid #dcdfe6;
  }
  >>> .el-table {
    flex: 1;
    border-top: none;
  }
}
</style>
