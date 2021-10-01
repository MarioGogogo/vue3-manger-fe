<!--
 * @Author: MarioGo
 * @Date: 2021-10-01 15:56:07
 * @LastEditTime: 2021-10-01 21:25:39
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/packages/QueryForm/FormItem.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-form-item :prop="item.model">
    <el-input v-if="item.type == 'input'" v-bind="$attrs" />
    <el-select v-else-if="item.type == 'select'" v-bind="$attrs" >
      <el-option v-for="option in item.options" :key="option.value" :value="option.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: "FormItem",
  props: ["item"],
  setup (props) {
     
  }
}
</script>

<style lang="scss" scoped>
</style>