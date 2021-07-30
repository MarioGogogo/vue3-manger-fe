<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- 循环导入 -->
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index == 0">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  mounted () {
    console.log('路由', this.$route.matched);
  },
  computed: {
    breadList () {
      return this.$route.matched;
    },
  },
};
</script>