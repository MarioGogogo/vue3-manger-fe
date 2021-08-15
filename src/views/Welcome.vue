<template>
  <div class="welcome">
    <div class="w-content">
      <div class="w-content-top">
        <div class="top-green"></div>
        <div class="top-blue"></div>
        <div class="top-gray"></div>
      </div>
      <div class="w-content-mid"></div>
      <div class="w-content-bottom"></div>
    </div>
    <!-- <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">慕课通用后台管理系统</div>
      <div class="desc">
        - Vue3.0+ElementPlus+Node+Mongo打造通用后台管理系统
      </div>
    </div>
    <div class="img"></div>  -->
  </div>
</template>

<script>
export default {
  name: "welcome",

}
</script>

<style lang="scss" scope>
.welcome {
  display: flex;
  height: 100%;
  background-color: #fff;
  .w-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .w-content-top {
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .top-green {
        flex-basis: 33%;
        background: #26abab;
        height: 120px;
        border-radius: 10px;
      }
      .top-blue {
        flex-basis: 33%;
        background: #3a92e0;
        height: 120px;
        border-radius: 10px;
      }
      .top-gray {
        flex-basis: 33%;
        background: #727eb5;
        height: 120px;
        border-radius: 10px;
      }
    }
  }

  .content {
    position: relative;
    bottom: 40px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    margin-left: 105px;
    background-image: url('./../assets/images/welcome.png');
    width: 371px;
    height: 438px;
  }
}
</style>