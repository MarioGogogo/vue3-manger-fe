<template>
  <div class="dept-manage">
    <!-- 头部搜索 -->
    <div class="query-form">
      <el-form :inline="true" ref="queryForm" :model="queryForm">
        <el-form-item>
          <el-input
            placeholder="请输入部门名称"
            v-model="queryForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDeptList" type="primary">查询</el-button>
          <el-button @click="handleRest('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格内容 -->
    <div class="base-table">
    </div>
  </div>
</template>

<script>
export default {
  name: "dept",
  data() {
    return {
      queryForm: {
        deptName:""
      }
    }
  },
  methods: {
    getDeptList() {
      
    },
    handleRest(queryForm){
     
    }
  },
}
</script>

<style lang="scss" scoped>
</style>