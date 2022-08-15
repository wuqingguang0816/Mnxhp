<template>
  <div class="justAuth">
    <div class="JNPF-common-title mb-20">
      <h2 class="bold">第三方服务绑定</h2>
    </div>

    <el-col :span="22" :offset="1" class="mt-20">
      <template v-for="(item,i) in socialsList">
        <el-row :key="i">
          <el-col :span="1" class="col-img">
            <img v-if="item.enname=='wechat_open'" src="@/assets/images/socials/wechat_open.png" alt="" class="row-img" />
            <img v-if="item.enname==='qq'" src="@/assets/images/socials/qq.png" alt="" class="row-img" />
            <img v-if="item.enname==='wechat_enterprise'" src="@/assets/images/socials/wxWork.png" alt="" class="row-img" />
            <img v-if="item.enname==='dingtalk'" src="@/assets/images/socials/dingtalk.png" alt="" class="row-img" />
            <img v-if="item.enname==='feishu'" src="@/assets/images/socials/feishu.png" alt="" class="row-img" />
            <img v-if="item.enname==='github'" src="@/assets/images/socials/gitHub.png" alt="" class="row-img" />
            <!-- <img v-if="item.enname==='gitee'" src="@/assets/images/socials/gitee.png" alt="" class="row-img" /> -->
            <img v-if="!item.enname" src="" alt="" class="row-img" />
          </el-col>
          <el-col :span="21">
            <div class="tag-group-div">
              <span class="tag-group-span">{{item.name}}</span>
              <el-tag type="success" effect="dark" v-if="item.entity"> 已绑定 </el-tag>
              <el-tag type="warning" effect="dark" v-if="!item.entity"> 未绑定 </el-tag>
            </div>
            <div class="tag-group-con"> <span>{{item.describetion}}</span>
            </div>
          </el-col>
          <el-col :span="1" class="col-line-height">
            <el-button size="small" type="" v-if="item.entity" @click="deleteSocials(item.entity.id)">解绑</el-button>
            <el-button size="small" type="primary" v-if="!item.entity" @click="bingding(item.enname)">绑定</el-button>
          </el-col>
        </el-row>
        <el-divider class="divider-margin" :key="i"></el-divider>

      </template>
    </el-col>

    <el-dialog title="登录" :visible.sync="dialogVisible" width="500px" height="500px" :before-close="handleClose">
      <iframe :src="dialogSrt" width="100%" height="500px" frameborder="0" @load="iframeLoad" sandbox="allow-scripts allow-top-navigation allow-same-origin allow-top-navigation-by-user-activation">
      </iframe>
    </el-dialog>

  </div>
</template>
<script>
import { getSocialsUserList, binding, deleteSocials } from '@/api/permission/socialsUser'
export default {
  data() {
    return {
      socialsList: [],
      dialogVisible: false,
      dialogSrt: '',
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getSocialsUserList().then(res => {
        this.socialsList = res.data;
        this.loading = false
      })
    },
    bingding(data) {
      console.log(data)
      binding(data).then(res => {
        var iWidth; //弹出窗口的宽度;
        var iHeight;//弹出窗口的高度;
        var iTop = (window.screen.height - 30 - iHeight) / 2;//获得窗口的垂直位置;
        var iLeft = (window.screen.width - 10 - iWidth) / 2;
        let winURL = window.open(res.msg, '_blank', 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no')
        const loop = setInterval(() => {    // 使用定时器查询当前状态
          if (winURL && winURL.closed) {  // 进行判断条件   closed属性就是返回当前窗口的状态
            console.log('我被关闭了', winURL.frameElement)
            clearInterval(loop);       // 清除定时器
            this.init()
          }
        }, 500);

      })
    },



    deleteSocials(id) {
      this.$confirm('确定要解除该账号绑定?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteSocials(id).then(res => {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.init()
            }
          })
        })
        this.init()
      }).catch(() => { });


    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    iframeLoad() {
      console.log(123)
      window.addEventListener("message", this.handleMessage);
    },
    handleMessage(e) {
      //e为传过来的信息
      console.log(e)

    }
  }
}

</script>
<style scoped>
.col-img {
  margin: 0px 10px;
}
.tag-group-div {
  height: 24px;
  line-height: 24px;
}
.row-img {
  height: 50px;
  width: 50px;
}
.tag-group-span {
  height: 24px;
  line-height: 24px;
  margin-right: 20px;
  font-weight: bolder;
  font-size: 16px;
}
.tag-group-con {
  font-size: 14px;
  margin: 5px 0;
}
.divider-margin {
  margin: 15px 0px;
}
.tag-group-button {
  height: 24px;
  line-height: 24px;
}

.col-line-height {
  line-height: 50px;
}
</style>