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
      <div class="action">
        <el-button type="primary" @click="handleCreateOpen">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children: 'children' }"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          v-bind="item"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :title="action == 'create' ? '创建部门' : '编辑部门'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="deptForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            placeholder="请选择上级部门"
            v-model="deptForm.parentId"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            :options="deptList"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            placeholder="请输入部门名称"
            v-model="deptForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <el-select
            placeholder="请选择部门负责人"
            v-model="deptForm.user"
            @change="handleSelectUser"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="deptName">
          <el-input
            placeholder="请输入负责人邮箱"
            v-model="deptForm.userEmail"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from "../utils/utils";
export default {
  name: "dept",
  data () {
    return {
      queryForm: {
        deptName: ""
      },
      columns: [
        {
          label: '部门名称',
          prop: 'deptName',
        },
        {
          label: '负责人',
          prop: 'userName',
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          formatter (row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter (row, column, value) {
            return utils.formateDate(new Date(value));
          },
        }
      ],
      deptList: [],
      pager: {
        pageNum: 1,
        pageSize: 10
      },
      action: 'create',
      showModal: false,
      deptForm: {
        parentId: [null]
      },
      userList: [],
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择上级部门",
            trigger: "blur"
          }
        ],
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur"
          }
        ],
        user: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted () {
    this.getDeptList()
    this.getAllUserList()
  },
  methods: {
    async getDeptList () {
      let list = await this.$api.getDeptList(this.queryForm)
      this.deptList = list
    },
    async getAllUserList () {
      let list = await this.$api.getAllUserList()
      this.userList = list
    },
    // 选中负责人
    handleSelectUser (val) {
      console.log('%c 🍷 选中负责人: ', 'font-size:20px;background-color: #B03734;color:#fff;', val);
      const [userId, userName, userEmail] = val.split("/")
      Object.assign(this.deptForm, { userId, userName, userEmail })
    },
    //重置
    handleRest (form) {
      this.$refs[form].resetFields()
    },
    handleClose () {
      this.showModal = false
      this.handleRest('dialogForm')
    },
    //打开编辑
    handleCreateOpen () {
      this.action = 'create'
      this.showModal = true
    },
    // 编辑
    handleEdit (row) {
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        Object.assign(this.deptForm, row, {
          user: `${row.userId}/${row.userName}/${row.userEmail}`
        })
      })
    },
    // 删除
    async handleDel (_id) {
      this.action = 'delete'
      await this.$api.deptDeptOperate({ _id, action: this.action })
      this.$toast.success("删除成功")
      this.getDeptList()
    },
    handleClose () {
      this.showModal = false
      this.handleRest('dialogForm')
    },
    //提交
    handleSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.deptForm, action: this.action }
          delete params.user
          try {
            await this.$api.deptDeptOperate(params)
            this.$toast.success("操作成功")

          } catch (error) {
            this.$toast.error("操作失败")
          }
          this.handleClose()
          this.getDeptList()
        }
      })
    },
  },
  watch: {
    showModal(newVal) {
       if(!newVal){
          this.handleClose()
       }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>