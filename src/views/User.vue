<template>
  <div class="user-manage">
    <!-- 筛选区域 -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="user">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" placeholder="请选择状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 列表区域 -->
    <div class="base-table">
      <!-- 列表按钮 -->
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 弹窗 -->
    <el-dialog title="用户新增" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="userForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            :disabled="action == 'edit'"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userForm.userEmail"
            :disabled="action == 'edit'"
            placeholder="请输入用户邮箱"
          >
            <template #append>@imooc.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="deptListProps"
            clearable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 弹框按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>




<script>
import utils from "./../utils/utils";
export default {
  name: 'user',
  data () {
    return {
      showModal: false,
      action: "",
      user: {
        userId: "",
        userName: "",
        state: 0,  //必须数字
      },
      userList: [],
      roleList: [], //系统角色
      deptList: [], //部门
      checkedUserIds: [],
      deptListProps: {
        checkStrictly: true,
        value: '_id',
        label: 'deptName'
      },
      pager: {
        pageNum: 1,
        pageSize: 10,  //每页10条
        total: 0,  //总页数
      },
      userForm: {
        userName: "",
        userEmail: "",
        mobile: "",
        state: "",
        deptId: "",
        roleList: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur",
          },
        ],
        userEmail: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
        ],
        mobile: [
          {
            pattern: /1[3-9]\d{9}/,
            message: "请输入正确的手机号格式",
            trigger: "blur",
          },
        ],
        deptId: [
          {
            required: true,
            message: "请输入部门",
            trigger: "blur",
          },
        ],
      },
      columns: [  //列表 每一列属性
        {
          label: "用户ID",
          prop: "userId",
        },
        {
          label: "用户名",
          prop: "userName",
        },
        {
          label: "用户邮箱",
          prop: "userEmail",
        },
        {
          label: "用户角色",
          prop: "role",
          formatter (row, column, value) {
            return {
              0: "管理员",
              1: "普通用户",
            }[value];
          },
        },
        {
          label: "用户状态",
          prop: "state",
          formatter (row, column, value) {
            return {
              1: "在职",
              2: "离职",
              3: "试用期",
            }[value];
          },
        },
        {
          label: "注册时间",
          prop: "createTime",
          width: 180,
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "最后登录时间",
          prop: "lastLoginTime",
          width: 180,
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(value));
          },
        },
      ]
    }
  },
  mounted () {
    //请求用户列表
    this.getUserList()
    this.getDeptList()
    this.roleList = [{ _id: "001", roleName: "总监" }, { _id: "002", roleName: "JAVA" }, { _id: "003", roleName: "运营" },];
  },
  methods: {
    //获取部门列表
    async getDeptList () {
      let list = await this.$api.getDeptList();
      console.log('%c 🍬 部门列表: ', 'font-size:20px;background-color: #465975;color:#fff;', list);
      this.deptList = list;
    },
    async getUserList () {
      // const params = {
      //   userId: this.user.userId,
      //   userName: this.user.userName,
      //   state: this.user.state,
      //   pageNum: this.pager.pageNum,
      //   pageSize: this.pager.pageSize
      // }
      const params = { ...this.user, ...this.pager }
      try {
        const { list, page } = await this.$api.getUserList(params)
        console.log('%c 🍠 page: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', page);
        this.userList = list
        this.pager.total = +page.total
      } catch (error) {
        console.log('getUserList-error', error);
      }

    },
    //查询
    handleQuery () {
      this.getUserList();
    },
    // 重置
    handleReset (form) {
      this.$refs[form].resetFields();
    },
    handleSelectionChange (list) {
      let arr = [];
      list.map((item) => {
        arr.push(item.userId);
      });
      this.checkedUserIds = arr;
      console.log('%c 🍸   this.checkedUserIds : ', 'font-size:20px;background-color: #B03734;color:#fff;', this.checkedUserIds);

    },
    // 用户编辑
    handleEdit (row) {
      console.log('%c 🍈 row: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', row);
      this.action = "edit";
      this.showModal = true;
      //fix:这里一定要next 否则会有bug 每一次要等初始状态之后才能赋值弹窗
      this.$nextTick(() => {
        Object.assign(this.userForm, row);
      });
    },
    async handleDel (row) {
      await this.$api.userDel({
        userIds: [row.userId], //可单个删除，也可批量删除
      });
      this.$message.success("删除成功");
      this.getUserList();
    },
    //新增
    handleCreate () {
      this.action = "add"
      this.showModal = true
    },
    //todo:批量删除

    async handlePatchDel (row) {
      if (this.checkedUserIds.length == 0) {
        this.$message.error("请选择要删除的用户");
        return;
      }
      const res = await this.$api.userDel({
        userIds: this.checkedUserIds, //可单个删除，也可批量删除
      });
      if (res.nModified > 0) {
        this.$message.success("删除成功");
        this.getUserList();
      } else {
        this.$message.success("修改失败");
      }

    },
    handleCurrentChange (current) {
      this.pager.pageNum = current;
      this.getUserList();
    },
    //提交
    async handleSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        console.log('%c 🍢 valid: ', 'font-size:20px;background-color: #42b983;color:#fff;', valid);
        if (valid) {
          let params = this.userForm
          params.userEmail += "@imooc.com";
          params.action = this.action;
          let res = await this.$api.userSubmit(params);
          this.showModal = false;
          this.$message.success("用户创建成功");
          this.handleReset("dialogForm");
          this.getUserList();
        }
      })
    },
    //关闭
    handleClose () {
      this.showModal = false;
      //重置
      this.handleReset("dialogForm");
    }
  },
  watch: {
    showModal () {
      if (!this.showModal) {
        console.log('关闭了 :>> ');
        this.handleReset("dialogForm");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-with-select {
  .el-input-group__prepend {
    background-color: rgb(212, 40, 40);
  }
}
</style>