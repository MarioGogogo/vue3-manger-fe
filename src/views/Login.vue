<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">🐻 暴力熊</div>
        <!-- 账号 -->
        <el-form-item prop="userName">
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="user.userName"
          />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userPwd">
          <el-input
            type="password"
            prefix-icon="el-icon-view"
            v-model="user.userPwd"
          />
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" class="btn-login" :loading="loading" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data () {
    return {
      loading:false,
      user: {
        userName: "",
        userPwd: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    login () {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          // 校验成功！
          this.loading = true
          try {
            const res = await this.$api.login(this.user)
            res.createTime = new Date().getTime();
            this.loading = false
            if (res === undefined) {
              return  // this.$message.error("网络请求异常，请稍后再试");
             } 
              this.$store.commit("saveUserInfo", res);
              this.$router.push("/welcome");
          } catch (error) {
             this.loading = false
          }

        } else {
          // 校验失败！
        }
        console.log('%c 🥩 val: ', 'font-size:20px;background-color: #465975;color:#fff;', valid);
      })
    }
  },
}
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>