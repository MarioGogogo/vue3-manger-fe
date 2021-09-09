<!--
 * @Author: MarioGo
 * @Date: 2021-09-09 21:47:52
 * @LastEditTime: 2021-09-09 22:53:09
 * @LastEditors: MarioGo
 * @Description: 文件描述
 * @FilePath: /manager-fe/src/views/AppConfig.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-config">
    <!-- 表格内容 -->
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreateOpen">新增</el-button>
      </div>
      <el-table
        :data="appList"
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
      :title="action == 'create' ? 'App上传' : '编辑'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="uploadForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="项目包名称" prop="appName">
          <el-select
            placeholder="请选择项目"
            v-model="uploadForm.appName"
            @change="handleSelectUser"
          >
            <el-option label="FlutterApp" value="FlutterApp"></el-option>
            <el-option
              label="ReactNativeApp"
              value="ReactNativeApp"
            ></el-option>
            <el-option label="HybirdApp" value="HybirdApp"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="App版本号" prop="appVersion">
          <el-input
            v-model="uploadForm.appVersion"
            placeholder="请输入版本号"
            style="width: 192px"
          />
        </el-form-item>
        <el-form-item label="上传文件" prop="appFilePath">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemove"
            :on-change="handleOnChange"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button size="small" type="primary">选取文件</el-button>
            </template>
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                只传一个文件后缀.apk的文件，且不超过 10MB
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="Md5" prop="appMd5">
          <el-input v-model="uploadForm.appMd5" disabled style="width: 192px" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">上传</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "appconfig",

  data () {
    return {
      action: "",
      showModal: false,
      uploadForm: {
        appName: "",
        appVersion: "",
        appMd5: "",
        appFilePath: ""
      },
      appList: [],
      fileList: [],
      columns: [
        {
          label: '项目包名',
          prop: 'appName',
        },
        {
          label: '版本号',
          prop: 'appVersion',
        },
        {
          label: 'md5',
          prop: 'appMd5',
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          formatter (row, column, value) {
            return utils.formateDate(new Date(value));
          },
        }
      ],
    }
  },
  methods: {
    handleCreateOpen () {
      this.showModal = true
      this.action = "create"
    },
    handleSelectUser (value) {
      console.log('value :>> ', value);
    },
    beforeAvatarUpload (file) {
      console.log('%c 🍣 上传: ', 'font-size:20px;background-color: #B03734;color:#fff;', file);
      const isApk = file.type === '' && file.name.split('.')[1] === "ipa"
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isApk) {
        this.$toast.error('上传App只能是 ipa 格式!')
      }
      if (!isLt10M) {
        this.$toast.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传服务器
    submitUpload () {
      this.$refs.upload.submit()
    },

    // 删除
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handleOnChange (file, fileList) {
      console.log(file, fileList)
    },
    handleClose () {
      this.showModal = false
      this.action = ""
    },
    //提交服务器保存
    handleSubmit () {

    }
  },
}
</script>

<style lang="scss" scoped>
</style>