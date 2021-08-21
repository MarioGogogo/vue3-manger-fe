<!--
 * @Author: MarioGo
 * @Date: 2021-08-21 21:44:34
 * @LastEditTime: 2021-08-21 23:35:16
 * @LastEditors: MarioGo
 * @Description: 审批
 * @FilePath: /manager-fe/src/views/Leave.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="leave-manage">
    <!-- 筛选区域 -->
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="审批状态" prop="state">
          <el-select v-model="queryForm.applyState">
            <el-option :value="0" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
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
        <el-button type="primary" @click="handleCreate">申请休假</el-button>
      </div>
      <el-table :data="applyList" @selection-change="handleSelectionChange">
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
              >查看</el-button
            >
            <el-button type="danger" size="mini" @click="handleDel(scope.row)"
              >作废</el-button
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
    <el-dialog title="申请休假" v-model="showModal" width="70%">
      <el-form
        ref="dialogForm"
        :model="leaveForm"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="休假类型" prop="applyType" required>
          <el-select v-model="leaveForm.applyType">
            <el-option :value="1" label="事假"></el-option>
            <el-option :value="2" label="调休"></el-option>
            <el-option :value="3" label="年假"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="休假时间" required>
          <el-row>
            <el-col :span="6">
              <el-form-item prop="startTime">
                <el-date-picker
                  v-model="leaveForm.startTime"
                  type="date"
                  placeholder="选择开始时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="7">
              <el-form-item prop="endTime">
                <el-date-picker
                  v-model="leaveForm.endTime"
                  type="date"
                  placeholder="选择结束时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="休假时长" prop="leaveTime" required>
          {{ leaveForm.leaveTime }}
        </el-form-item>
        <el-form-item label="休假原因" prop="reasons" required>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入休假原因"
            v-model="leaveForm.reasons"
          />
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
  name: "leave",
  data () {
    return {
      applyList: [],
      showModal: false,
      queryForm: {
        applyState: 0 // 1 待审批 2 审批中 3 审批拒绝 4 审批通过 5 作废
      },
      action: "",
      columns: [  //列表 每一列属性
        {
          label: "单号",
          prop: "orderNo",
        },
        {
          label: "休假时间",
          prop: "",
          width: 180,
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(row.startTime), 'yyyy-MM-dd') + "到" + utils.formateDate(new Date(row.endTime), 'yyyy-MM-dd');
          },
        },
        {
          label: "休假时长",
          prop: "leaveTime",

        },
        {
          label: "休假类型",
          prop: "applyType",
          formatter (row, column, value) {
            return {
              1: "事假",
              2: "调休",
              3: "年假",
            }[value];
          },
        },
        {
          label: "休假原因",
          prop: "reasons",
        },
        {
          label: "申请时间",
          prop: "createTime",
          formatter: (row, column, value) => {
            return utils.formateDate(new Date(row.createTime), 'yyyy-MM-dd')
          },
        },
        {
          label: "审批人",
          prop: "auditUsers",
        },
        {
          label: "当前审批人",
          prop: "curAuditUserName",
        },
        {
          label: "审批状态",
          prop: "applyState",
          formatter (row, column, value) {
            // 1 待审批 2 审批中 3 审批拒绝 4 审批通过 5 作废、
            return {
              1: "待审批",
              2: "审批中",
              3: "审批拒绝",
              4: "审批通过",
              5: "作废",
            }[value];
          },
        },
      ],
      pager: {
        pageNum: 1,
        pageSize: 10,  //每页10条
        total: 0,  //总页数
      },
      //弹框表单
      leaveForm: {
        applyType: 1,
        startTime: "",
        endTime: "",
        leaveTime: '0天',
        reasons: ""
      },
      rules: {
        applyType: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        reasons: [
          {
            required: true,
            message: "请输入休假原因",
            trigger: "blur",
          },
        ],
      },
    }
  },
  mounted () {
    this.getLeaveList();
  },
  methods: {
    async getLeaveList () {
      let params = { ...this.queryForm, ...this.pager }
      try {
        let { list, page } = await this.$api.getApplyList(params)
        this.applyList = list
        this.pager.total = page.total

      } catch (error) {
        console.log('error :>> ', error);
      }

    },
    //创建
    handleCreate () {
      this.action = "create"
      this.showModal = true
    },
    handleReset (form) {
      this.$refs[form].resetFields();
    },
    //查询
    handleQuery () {
      this.getLeaveList();
    },
    handleSelectionChange (row) {

    },
    //查看
    handleEdit () {

    },
    //删除
    handleDel () {
      this.action = "delete"

    },
    //分页
    handleCurrentChange () {

    },
    //关闭
    handleClose () {
      this.showModal = false
      //重置
      this.handleReset("dialogForm");
    },
    //提交
    handleSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
           //todo:to do something
        } else {

        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>