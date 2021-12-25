<template>
  <div class="JNPF-common-layout">
    <div class="JNPF-common-layout-center">
      <el-row class="JNPF-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="银行卡号">
              <el-input v-model="query.numvalue" placeholder="请输入" clearable>
              </el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="6">-->
<!--            <el-form-item label="银行名">-->
<!--              <el-input-->
<!--                v-model="query.value5"-->
<!--                placeholder="请输入"-->
<!--                clearable-->
<!--              >-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()"
                >查询</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="reset()"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="JNPF-common-layout-main JNPF-flex-main">
        <div class="JNPF-common-head">
          <div></div>
          <div class="JNPF-common-head-right">
            <el-tooltip effect="dark" content="刷新" placement="top">
              <el-link
                icon="icon-ym icon-ym-Refresh JNPF-common-head-icon"
                :underline="false"
                @click="reset()"
              />
            </el-tooltip>
            <screenfull isContainer />
          </div>
        </div>
        <JNPF-table
          v-loading="listLoading"
          :data="list"
          @sort-change="sortChange"
        >
          <el-table-column
            prop="numvalue"
            label="银行卡号"
            align="left"
          />
          <el-table-column
            prop="namevalue"
            label="持卡人姓名"
            align="left"
          />
          <el-table-column
            prop="datevalue"
            label="有效期"
            align="left"
          />
          <el-table-column prop="value4" label="银行卡类型"  align="left" />
          <el-table-column prop="value5" label="银行名 " align="left" />
          <!-- <el-table-column
            prop="value7"
            label="有效期"
            width="100"
            align="left"
          />
          <el-table-column
            prop="value8"
            label="过期时间"
            width="100"
            align="left"
          /> -->
          <!-- <el-table-column
            prop="creatoruserid"
            label="创建用户"
            width="0"
            align="left"
          />
          <el-table-column
            prop="creatortime"
            label="创建时间"
            width="0"
            align="left"
          /> -->
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="addOrUpdateHandle(scope.row.id,true)"
                >查看详情
              </el-button>
            </template>
          </el-table-column>
        </JNPF-table>
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="initData"
        />
      </div>
    </div>
    <JNPF-Form v-if="formVisible" ref="JNPFForm" @refresh="refresh" />
    <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
  </div>
</template>

<script>
import request from "@/utils/request";
import { getDictionaryDataSelector } from "@/api/systemData/dictionary";
import JNPFForm from "./Form";
import ExportBox from "./ExportBox";
import { previewDataInterface } from "@/api/systemData/dataInterface";

export default {
  components: { JNPFForm, ExportBox },
  data() {
    return {
      query: {
        numvalue: undefined,
        namevalue: undefined,
        type:"2",
      },
      treeProps: {
        children: "children",
        label: "fullName",
        value: "id",
      },
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: "desc",
        sidx: "",
      },
      formVisible: false,
      exportBoxVisible: false,
      columnList: [
        { prop: "numvalue", label: "身份证号" },
        { prop: "namevalue", label: "姓名" },
        { prop: "datevalue", label: "出生日期" },
        { prop: "value4", label: "住址" },
        { prop: "value5", label: "性别" },
        { prop: "value6", label: "民族" },
        { prop: "value7", label: "有效期" },
        { prop: "value8", label: "过期时间" },
        { prop: "creatoruserid", label: "创建用户" },
        { prop: "creatortime", label: "创建时间" },
      ],
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    sortChange({ column, prop, order }) {
      this.listQuery.sort = order == "ascending" ? "asc" : "desc";
      this.listQuery.sidx = !order ? "" : prop;
      this.initData();
    },
    initData() {
      this.listLoading = true;
      let _query = {
        ...this.listQuery,
        ...this.query,
      };
      let query = {};
      for (let key in _query) {
        if (Array.isArray(_query[key])) {
          query[key] = _query[key].join();
        } else {
          query[key] = _query[key];
        }
      }
    //   var _list = [];
    //   this.list = _list;
    //   this.listLoading = false;
      request({
        url: `/api/extend/DiscernCard`,
        method: "get",
        data: query,
      }).then((res) => {
        this.list = res.data.list;
        this.total = res.data.pagination.total;

        this.listLoading = false;
      });
    },
    handleDel(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          request({
            url: `/api/extend/DiscernCard/${id}`,
            method: "DELETE",
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    addOrUpdateHandle(id, isDetail) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.JNPFForm.init(id, isDetail);
      });
    },
    exportData() {
      this.exportBoxVisible = true;
      this.$nextTick(() => {
        this.$refs.ExportBox.init(this.columnList);
      });
    },
    download(data) {
      let query = { ...data, ...this.listQuery, ...this.query };
      request({
        url: `/api/extend/DiscernCard/Actions/Export`,
        method: "GET",
        data: query,
      }).then((res) => {
        if (!res.data.url) return;
        window.location.href = this.define.comUrl + res.data.url;
        this.$refs.ExportBox.visible = false;
        this.exportBoxVisible = false;
      });
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: "desc",
        sidx: "",
      };
      this.initData();
    },
    refresh(isrRefresh) {
      this.formVisible = false;
      if (isrRefresh) this.reset();
    },
    reset() {
      for (let key in this.query) {
        this.query[key] = undefined;
      }
      this.query.type="2";
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: "desc",
        sidx: "",
      };
      this.initData();
    },
  },
};
</script>
