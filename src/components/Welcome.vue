<template>
  <div>
    <h2>welcome</h2>
    <el-button>登录</el-button>
  </div>
</template>

<script>
export default {
  name: "welcome",
  mounted () {
    this.$request.post("/login", {
      username: "jeremy",
      password: "123456"
    }).then((res) => {
      console.log('%c 🍠 登录返回: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', res);

    });
  },
}
</script>

<style lang="scss" scoped>
</style>