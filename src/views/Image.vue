<!--
 * @Author: MarioGo
 * @Date: 2021-09-10 23:59:04
 * @LastEditTime: 2021-09-11 01:35:11
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/views/Image.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="image-manage">
    <!-- 头部搜索 -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="图片名称" prop="imageName">
          <el-input
            v-model="queryForm.imageName"
            placeholder="请输入图片关键词"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getImageList">查询</el-button>
          <el-button @click="handleRest('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">上传图片</el-button>
      </div>
      <el-table :data="imageList">
        <el-table-column label="日期" width="120">
          <template #default="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="'http://pp.52react.cn/' + scope.row.key"
              fit="fit"
            >
              <template #placeholder>
                <div class="image-slot">加载中<span class="dot">...</span></div>
              </template>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column
          v-for="item in columns.slice(1, columns.length)"
          align="center"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
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
        :model="imageForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="imageName">
          <el-input
            v-model="imageForm.imageName"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="imageForm.remark"
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
          {{ curimageName }}
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
import utils from '../utils/utils'
export default {
  name: "image",
  data () {
    return {
      queryForm: {
        imageName: ""
      },
      imageList: [],
      columns: [
        {
          label: '图片预览',
          prop: 'key',
          width: 150
        },
        {
          label: '文件名',
          prop: 'key',
        },
        {
          label: '文件hash',
          prop: 'hash'
        },
        {
          label: '文件大小',
          prop: 'fsize',
          width: 100,
        },
        {
          label: '创建时间',
          prop: 'ctime',
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
      imageForm: {},
      rules: {
        imageName: {
          required: true,
          message: '请输入角色名称'
        }
      },
      // 权限展示
      showPermission: false,
      curimageId: "",
      curimageName: "",
      menuList: [],
      // 菜单映射表
      actionMap: {}
    }
  },
  mounted () {
    this.getImageList();
  },
  methods: {
    // 图片
    async getImageList () {
      try {
        let res = await this.$api.getImageList({
          ...this.queryForm,
          ...this.pager
        })

        this.imageList = res.list
        // this.pager.total = page.total
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
    //角色编辑
    handleEdit (row) {
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        this.imageForm = { _id: row._id, imageName: row.imageName, remark: row.remark }
      })

    },
    // 角色提交
    handleSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { imageForm, action } = this // 解构 imageForm, action
          let params = { ...imageForm, action }
          let res = await this.$api.imageOperate(params)
          if (res) {
            this.showModal = false
            this.$toast.success('创建成功')
            this.handleRest('dialogForm')
            this.getImageList()
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
      this.curimageId = row._id
      this.curimageName = row.imageName
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
      await this.$api.imageOperate({ _id, action: 'delete' })
      this.$toast.success('删除成功')
      this.getImageList()
    },
    //分页请求
    handleCurrentChange (current) {
      this.pager.pageNum = current
      this.getImageList()
    },
    // 设置权限提交
    async handlePermissionSubmit () {
      //获取当前设置权限
      let nodes = this.$refs.permissionTree.getCheckedNodes()
      //获取哪些权限选中状态
      let halfKeys = this.$refs.permissionTree.getHalfCheckedKeys()   //选中子菜单   半选中子菜单
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
        _id: this.curimageId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys)
        }
      }
      await this.$api.updatePermission(params)
      this.showPermission = false
      this.$toast.success('设置成功')
      this.getImageList()
    }

  },
  watch: {
    showModal (n) {
      if (n) {
        this.imageForm = {}
      } else {
        this.$nextTick(() => {
          this.imageForm = row
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>