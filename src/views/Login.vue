<template>
<div id="login">
<el-form ref="form" :model="loginForm" label-width="60px">
<el-form-item label="用户名">
<el-input v-model="loginForm.name" placeholder="请输入用户名" clearable></el-input>
</el-form-item>
<el-form-item label="密 码">
<el-input v-model="loginForm.password" placeholder="请输入密码"  show-password></el-input>
</el-form-item>
<el-form-item>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button>注册</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<style>
  body{
    background-image: url('../assets/bg.jpg');
    background-size: 100%;
  }
  #login {
    background-color: rgb(247, 243, 243);
    position: absolute;
    top: 25%;
    left: 40%;
    height: 200px;
    width: 500px;
    padding: 25px 10px 5px 5px;
  }
</style>

<script>
import { httpPost } from '../api/api'

export default {
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const _this = this
      httpPost('/api/login', _this.loginForm).then((res) => {
        console.log(res)
        _this.userToken = 'Bearer ' + res.data.token
        localStorage.setItem('Authorization', _this.userToken)
        _this.$router.replace('/taskCenter')
        this.$message({
          type: 'success',
          message: '登陆成功'
        })
        localStorage.setItem('userName', res.data.userName)
      })
    }
  }
}
</script>
