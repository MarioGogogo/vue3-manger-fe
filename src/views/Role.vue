<template>
  <div class="role-manage">
    <!-- 头部搜索 -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleRest('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleOpenPermission(scope.row)"
              >设置权限</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 弹窗内容 -->
  </div>
</template>

<script>
import utils from '../utils/utils'
export default {
  name: "role",
  data () {
    return {
      queryForm: {
        roleName: ""
      },
      roleList: [],
      columns: [
        {
          label: '角色名称',
          prop: 'roleName',
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '权限列表',
          prop: 'permissionList',
          formatter: (row, column, value) => {
            let names = []
            let list = value.halfCheckedKeys || []
            list.map(key => {
              if (key) names.push(this.actionMap[key])
            })
            return names.join(',')
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 150,
          formatter (row, column, value) {
            return utils.formateDate(new Date(value))
          }
        }
      ],
      pager: {
        total: 0,
        pageSize: 10,
      },
      showModal: false,
      action: 'create',
      roleForm: {},
      rules: {
        roleName: {
          required: true,
          message: '请输入角色名称'
        }
      },
      // 权限展示
      showPermission: false,
      curRoleId: "",
      curRoleName: "",
      menuList: [],
      // 菜单映射表
      actionMap: {}
    }
  },
  mounted () {
    this.getRoleList();
  },
  methods: {
    // 角色列表初始化
    async getRoleList () {
      try {
        let { list, page } = await this.$api.getRoleList(this.queryForm) // { list,page } 解构
        console.log('%c 🍖 list, page: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', list, page);
        this.roleList = list
        this.pager.total = page.total
      } catch (e) {
        throw new Error(e)
      }
    },
    // 表单重置
    handleRest (form) {
      this.$refs[form].resetFields()
    },
    // 角色添加
    handleAdd (type, row) {
      this.action = 'create'
      this.showModal = true
    },
    handleEdit () {

    },
    handleOpenPermission () {

    },
    handleDel () {

    },
    handleCurrentChange () {

    }

  },
}
</script>

<style lang="scss" scoped>
</style>