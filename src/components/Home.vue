<template>
  <div class="basic-layout">
    <div class="nav-side">
      <!-- 系统logo -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 导航栏 -->

    </div>
    <div class="content-right">
      <!-- 头部 -->
        <div class="nav-top"></div>
        <!-- 内容部分 -->
        <div class="wrapper">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
}
</script>

<style lang="scss" scoped>
</style>