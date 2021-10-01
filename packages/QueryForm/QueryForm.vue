<!--
 * @Author: MarioGo
 * @Date: 2021-10-01 15:50:54
 * @LastEditTime: 2021-10-01 22:33:28
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/packages/QueryForm/QueryForm.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-form :inline="true" ref="queryForm" :model="queryModel">
    <template v-for="(item, index) in form" :key="index">
      <form-item :item="item" v-bind="item" v-model="item.model" />
    </template>
    <el-form-item>
      <el-button @click="handleQuery()" type="primary">查询</el-button>
      <el-button @click="handleRest()">重置</el-button>
    </el-form-item>
  </el-form>
</template>




<script>
import { getCurrentInstance, reactive } from '@vue/runtime-core';
import FormItem from './FormItem.vue';
export default {
  name: "QueryForm",
  props: ["modelValue", "form"],
  emits: ["update:modelValue"],
  components: {
    FormItem
  },
  setup (props, context) {
    const ctx = getCurrentInstance();
    const form = props.form;
    const queryModel = reactive({

    })

    //重置
    const handleRest = () => {
      ctx.refs.queryForm.restFields()
    }
    //查询
    const handleQuery = (value) => {
      //优先执行改变 vmodel   再执行回调函数
      context.emit("update:modelValue", { userId: 888, userName: "jack" })
      context.emit("handleQuery", { userId: 888, userName: "jack" })

    }

    return {
      queryModel,
      handleRest,
      handleQuery
    }

  }
}
</script>

<style lang="scss" scoped>
</style>