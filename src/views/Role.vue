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
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="roleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="roleForm.remark"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹窗内容 -->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <!-- 树形 -->
        <el-form-item label="选择权限">
          <el-tree
            ref="permissionTree"
            :data="menuList"
            show-checkbox
            node-key="_id"
            default-expand-all
            :props="{ label: 'menuName' }"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { nextTick } from '@vue/runtime-core'
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
    this.getMenuList()
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
    // 菜单列表初始化
    async getMenuList () {
      try {
        let list = await this.$api.getMenuList() // { list,page } 解构
        this.menuList = list
        this.getActionMap(list)
      } catch (e) {
        throw new Error(e)
      }
    },
    getActionMap (list) {
      let actionMap = {}
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop()
          if (item.children && item.action) {
            actionMap[item._id] = item.menuName
          }
          if (item.children && !item.action) {
            deep(item.children)
          }
        }
      }
      deep(JSON.parse(JSON.stringify(list)))
      this.actionMap = actionMap
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
    //角色编辑
    handleEdit (row) {
      console.log('%c 🥕 列表内容: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', row);
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        this.roleForm = row
      })

    },
    // 角色提交
    handleSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this // 解构 roleForm, action
          let params = { ...roleForm, action }
          let res = await this.$api.roleOperate(params)
          if (res) {
            this.showModal = false
            this.$toast.success('创建成功')
            this.handleRest('dialogForm')
            this.getRoleList()
          }
        }
      })
    },
    // 弹框关闭
    handleClose () {
      this.handleRest('dialogForm')
      this.showModal = false
    },
    handleOpenPermission (row) {
      this.curRoleId = row._id
      this.curRoleName = row.roleName
      this.showPermission = true
      //获取当前的权限列表
      let { checkedKeys } = row.permissionList
      //渲染到树上
      setTimeout(() => {
        // checkedKeys 只负责按钮权限
        this.$refs.permissionTree.setCheckedKeys(checkedKeys)
      })
    },
    // 角色删除
    async handleDel (_id) {
      await this.$api.roleOperate({ _id, action: 'delete' })
      this.$toast.success('删除成功')
      this.getRoleList()
    },
    handleCurrentChange () {

    },
    // 设置权限提交
    handlePermissionSubmit () {
      //获取当前设置权限
      let nodes = this.$refs.tree.getCheckedNodes
      //获取哪些权限选中状态
      let halfKeys = this.$refs.tree.getHalfCheckedKeys()
      let checkedKeys = []
      let parentKeys = []
      // 遍历权限 是否有子属性 添加checkid
      nodes.map((node) => {
        if (!node.children) {
          checkedKeys.push(node._id)
        } else {
          parentKeys.push(node._id)
        }
      })
      let params = {
        _id: this.curRoleId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys)
        }
      }
      await this.$api.updatePermission(params)
      this.showPermission = false
      this.$toast.success('设置成功')
      this.getRoleList()
    }

  },
  watch: {
    showModal (n) {
      if (n) {
        this.roleForm = {}
      } else {
        this.$nextTick(() => {
          this.roleForm = row
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>