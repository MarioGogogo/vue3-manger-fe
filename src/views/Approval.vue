<!--
 * @Author: MarioGo
 * @Date: 2021-09-15 21:44:46
 * @LastEditTime: 2021-09-15 21:57:09
 * @LastEditors: MarioGo
 * @Description: 待我审批
 * @FilePath: /manager-fe/src/views/Approval.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="leave-manage">
    <div class="query-form">
      <el-form ref="formlineForm" :inline="true" :model="queryForm">
        <el-form-item label="审批状态" prop="applyState">
          <el-select
            v-model="queryForm.applyState"
            placeholder="请选择审批状态"
          >
            <el-option value="" label="全部"></el-option>
            <el-option :value="1" label="待审批"></el-option>
            <el-option :value="2" label="审批中"></el-option>
            <el-option :value="3" label="审批拒绝"></el-option>
            <el-option :value="4" label="审批通过"></el-option>
            <el-option :value="5" label="作废"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getApplyList">查询</el-button>
          <el-button @click="handleReset('formlineForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <el-table :data="leaveList">
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button
              v-if="
                scope.row.curAuditUserName == userInfo.userName &&
                [1, 2].includes(scope.row.applyState)
              "
              v-has="'approval-check'"
              @click="handleQuery(scope.row)"
              size="mini"
              >审核</el-button
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

    <el-dialog
      title="审核"
      width="50%"
      v-model="showDetailModal"
      destroy-on-close
    >
      <el-form
        ref="dialogForm"
        :model="auditForm"
        :rules="rules"
        label-width="120px"
        label-suffix=":"
      >
        <el-form-item label="申请人">
          <div>{{ detail.applyUser.userName }}</div>
        </el-form-item>
        <el-form-item label="休假类型">
          <div>{{ detail.applyTypeName }}</div>
        </el-form-item>
        <el-form-item label="休假时间">
          <div>{{ detail.time }}</div>
        </el-form-item>
        <el-form-item label="休假时长">
          <div>{{ detail.leaveTime }}</div>
        </el-form-item>
        <el-form-item label="休假原因">
          <div>{{ detail.reasons }}</div>
        </el-form-item>
        <el-form-item label="审批状态">
          <div>{{ detail.applyStateName }}</div>
        </el-form-item>
        <el-form-item label="审批人">
          <div>{{ detail.curAuditUserName }}</div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            :rows="3"
            v-model="auditForm.remark"
            placeholder="请输入审核备注"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleApprove('pass')"
            >审核通过</el-button
          >
          <el-button @click="handleApprove('refuse')">驳回</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from '../utils/utils'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, toRaw } from 'vue'

export default defineComponent({
  name: 'approval',
  setup() {
    const { ctx, proxy } = getCurrentInstance()
    // 获取Composition API 自定义全局对象
    const { $api } = getCurrentInstance().appContext.config.globalProperties
    const queryForm = reactive({
      applyState: 1
    })

    const leaveList = ref([])
    const pager = reactive({ pageNum: 1, pageSize: 10 })

    // 详情弹框显示对象
    const showDetailModal = ref(false)
    // 详情弹框对象
    const detail = ref({})
    // 获取用户信息
    const userInfo = proxy.$store.state.userInfo

    // 定义表单定义规则
    const rules = {
      remark: [
        { required: true, message: '请输入审核备注', trigger: 'blur' }
      ],
    }
    const auditForm = reactive({
      remark: ''
    })
    // 定义动态表格的动态数据
    const columns = reactive([
      {
        label: '单号',
        prop: 'orderNo',
        width: 120
      },
      {
        label: '申请人',
        prop: 'applyUser.userName',
        formatter(row) {
          return row.applyUser.userName
        }
      },
      {
        label: '休假时间',
        prop: '',
        width: 110,
        formatter(row) {
          return `${utils.formateDate(new Date(row.startTime), 'yyyy-MM-dd')} 到 ${utils.formateDate(new Date(row.endTime), 'yyyy-MM-dd')}`
        }
      },
      {
        label: '休假时长',
        prop: 'leaveTime'
      },
      {
        label: '休假类型',
        prop: 'applyType',
        formatter(row, column, value) {
          return {
            1: '事假',
            2: '调休',
            3: '年假'
          }[value]
        }
      },
      {
        label: '休假原因',
        prop: 'reasons'
      },
      {
        label: '申请时间',
        prop: 'createTime',
        width: 180,
        formatter: (row, column, value) => {
          return utils.formateDate(new Date(value))
        }
      },
      {
        label: '审批人',
        prop: 'auditUsers'
      },
      {
        label: '当前审批人',
        prop: 'curAuditUserName'
      },
      {
        label: '审批状态',
        prop: 'applyState',
        formatter(row, column, value) {
          return {
            1: '待审批',
            2: '审批中',
            3: '审批拒绝',
            4: '审批通过',
            5: '作废'
          }[value]
        }
      }
    ])

    // 初始化数据调用
    onMounted(() => {
      getApplyList()
    })

    // 获取审批列表
    const getApplyList = async () => {
      try {
        const { list, page } = await $api.getLeaveList({ ...queryForm, ...pager, type: 'approval' })
        leaveList.value = list
        pager.total = page.total
      } catch (error) {
        proxy.$toast.error(error)
      }
    }

    // 重置查询
    const handleReset = (form) => {
      ctx.$refs[form].resetFields()
    }

    // 弹框关闭
    const handleClose = () => {
      showDetailModal.value = false
      handleReset('dialogForm')
    }

    // 分页时间处理
    const handleCurrentChange = (current) => {
      pager.pageNum = current
      getApplyList()
    }

    // 查看详情
    const handleQuery = (row) => {
      showDetailModal.value = true
      let data = { ...row }
      data.applyTypeName = {
        1: '事假',
        2: '调休',
        3: '年假'
      }[data.applyType]
      data.time = `${utils.formateDate(new Date(data.startTime), 'yyyy-MM-dd')} 到 ${utils.formateDate(new Date(data.endTime), 'yyyy-MM-dd')}`
      data.applyStateName = {
        1: '待审批',
        2: '审批中',
        3: '审批拒绝',
        4: '审批通过',
        5: '作废'
      }[data.applyState]

      detail.value = data
    }

    // 审核
    const handleApprove = (action) => {
      ctx.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          let params = { action, remark: auditForm.remark, _id: detail.value._id }
          // 发送请求
          try {
            await $api.leaveApprove(params)
            handleClose()
            proxy.$toast.success('处理成功')
            getApplyList()
            // 修改提醒条数
            proxy.$store.commit('saveNoticeCount', proxy.$store.state.noticeCount - 1)
          } catch (error) {
            proxy.$toast.error(error)
          }
        }
      })
    }

    return {
      queryForm,
      leaveList,
      pager,
      showDetailModal,
      rules,
      auditForm,
      columns,
      detail,
      userInfo,
      getApplyList,
      handleReset,
      handleCurrentChange,
      handleQuery,
      handleApprove,
    }
  }
})
</script>