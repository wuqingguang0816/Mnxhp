<template>
  <div class="login-container">
    <!-- <div class="login-version">
      <p class="login-version-text">{{$t('login.version')}}{{define.version}}</p>
    </div> -->
    <div class="login-content">
      <div class="login-form">
        <img class="login-logo" src="../../assets/images/login_logo.png" alt="">
        <div class="login-tab" :class="'active'+active">
          <a class="item" :class="{'active': active==1}" @click="active=1">{{$t('login.title')}}</a>
          <a class="item" :class="{'active': active==2}"
            @click="active=2">{{$t('login.scanTitle')}}</a>
        </div>
        <el-form v-show="active==1" ref="loginForm" :model="loginForm" :rules="loginRules"
          autocomplete="on" label-position="left">
          <el-form-item prop="account">
            <el-input ref="account" v-model="loginForm.account" :placeholder="$t('login.username')"
              name="account" type="text" tabindex="1" autocomplete="on" prefix-icon="el-icon-user"
              size="large"></el-input>
          </el-form-item>
          <el-form-item class="rule-tip">{{$t('login.rule')}}</el-form-item>
          <el-tooltip v-model="capsTooltip" :content="$t('login.upper')" placement="right" manual>
            <el-form-item prop="password">
              <el-input ref="password" v-model="loginForm.password" show-password
                :placeholder="$t('login.password')" name="password" tabindex="2" autocomplete="on"
                @keyup.native="checkCapslock" @blur="capsTooltip = false" prefix-icon="el-icon-lock"
                size="large"></el-input>
              <!-- @keyup.enter.native="handleLogin" -->
            </el-form-item>
          </el-tooltip>
          <el-button :loading="loading" type="primary" class="login-btn" size="large"
            @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
        </el-form>
        <div v-show="active==2" class="login-form-QRCode">
          <img class="qrcode-img" src="../../assets/images/login_qr.png">
          <p class="qrcode-tip">正在测试,稍后上线</p>
        </div>
      </div>
    </div>
    <!-- <div class="login-foot">Copyright 引迈信息技术有限公司, All Rights Reserved. 沪ICP备17044791号-1
      助力企业和团队快速实现目标</div> -->
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', message: this.$t('login.accountTip') }
        ],
        password: [
          { required: true, trigger: 'blur', message: this.$t('login.passwordTip') }
        ]
      },
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      active: 1
    }
  },
  computed: {
    loginLoading() {
      return this.$store.state.user.loginLoading
    }
  },
  watch: {
    loginLoading(val) {
      if (!val) this.loading = false
    },
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    const _this = this
    document.onkeydown = function (e) {
      const { keyCode } = e
      if (keyCode === 13) {
        _this.handleLogin()
      }
    }
  },
  mounted() {
    this.$store.commit('user/SET_LOGIN_LOADING', false)
  },
  destroyed() {
    document.onkeydown = function (e) {
      const { keyCode } = e
      if (keyCode === 13) { }
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    handleLogin() {
      if (this.loading) return
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.commit('user/SET_LOGIN_LOADING', true)
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/home',
                query: this.otherQuery
              })
            })
            .catch(() => {
              this.$store.commit('user/SET_LOGIN_LOADING', false)
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>