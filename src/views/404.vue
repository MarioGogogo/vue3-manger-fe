<template>
  <div class="notFind">
    <img src="@/assets/images/404.gif" alt="" />
    <el-button class="back-btn" @click="handleGoHome"
      >{{ time }}秒后自动回首页</el-button
    >
  </div>
</template>

<script>
export default {
  name: "404",
  data () {
    return {
      time: 5,
      timer: null
    }
  },
  mounted () {
    this.autoGoHome()
  },
  methods: {
    autoGoHome () {
      if (this.time === 0) {
        clearTimeout(this.timer)
        this.$router.push('/')
      } else {
        this.timer = setTimeout(() => {
          this.time--
          this.autoGoHome()
        }, 1000);
      }
    },
    handleGoHome () {
      clearTimeout(this.timer)
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.notFind {
  img {
    width: 100%;
    height: 100vh;
  }
  .back-btn {
    position: fixed;
    left: 52%;
    bottom: 29%;
  }
}
</style>