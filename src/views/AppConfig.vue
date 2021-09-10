<!--
 * @Author: MarioGo
 * @Date: 2021-09-09 21:47:52
 * @LastEditTime: 2021-09-10 21:40:27
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
        <el-table-column label="操作"   align="center">
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
            style="width: 300px"
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
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="上传文件" prop="appMd5">
          <el-input
            v-show="false"
            v-model="uploadForm.appMd5"
            style="width: 0px"
          />
          <el-upload
            class="upload-demo"
            action=""
            ref="upload"
            :limit="limit"
            :disabled="btnDisabled"
            :on-remove="handleRemove"
            :on-change="handleOnChange"
            :file-list="fileList"
            accept=".apk"
            :auto-upload="false"
          >
            <template #trigger>
              <el-button size="small" type="primary" :disabled="btnDisabled"
                >选取文件</el-button
              >
            </template>
            <el-button
              style="margin-left: 10px"
              size="small"
              type="success"
              :disabled="btnDisabled"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                只传一个文件后缀.apk的文件，且不超过 10MB
              </div>
            </template>
          </el-upload>
          <!-- 进度条 -->
          <el-progress
            v-show="uploadFlag"
            :percentage="fileUploadPercent"
            :status="fileUploadPercent === 100 ? 'success' : null"
            style="width: 300px"
          ></el-progress>
        </el-form-item>
        <el-form-item label="Md5" prop="appMd5">
          <el-input v-model="uploadForm.appMd5" disabled style="width: 300px" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">新增</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
import axios from 'axios';
import utils from "./../utils/utils";
export default {
  name: "appconfig",
  data () {
    var checkFilePath = (rule, value, callback) => {
      console.log('%c 🥜 checkFilePath: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', this.formData);
      if (this.formData.files === '') {
        return callback(new Error('文件未上传'))
      }
      setTimeout(() => {
        if (this.formData) {
          callback()
        }
      }, 1000)
    }
    return {
      action: "",
      btnDisabled: false,
      showModal: false,
      uploadFlag: false,
      uploadForm: {
        appFilePath: "",
        appName: "",
        appVersion: "",
        appMd5: "",

      },
      fileUploadPercent: 0,
      appList: [],
      fileList: [],
      formData: {
        files: ""
      },
      limit: 1,
      columns: [
        {
          label: '项目包名',
          prop: 'appName',
          width: 120,
          align:"center"

        },
        {
          label: '版本号',
          prop: 'appVersion',
          width: 120,
            align:"center"
        },
        {
          label: 'md5',
          prop: 'appMd5',
            align:"center"
        },
        {
          label: '更新时间',
          prop: 'updateTime',
            align:"center",
          formatter (row, column, value) {
            return utils.formateDate(new Date(value));
          },
        }
      ],
      rules: {
        appName: [
          {
            required: true,
            message: "请选择项目包",
            trigger: "change"
          }
        ],
        appVersion: [
          {
            required: true,
            message: "请输入版本号",
            trigger: "blur"
          }
        ],
        appFilePath: [
          {
            required: true,
            message: "请上传文件",
            trigger: "blur"
          }
        ],
        appMd5: [
          {
            required: true,
            message: "未检测到上传文件",
          }
        ]
      }
    }
  },
  mounted () {
    this.getAppList();
  },
  methods: {
    async getAppList () {
      try {
        const res = await this.$api.getAppList()
        this.appList = res.list
      } catch (error) {
        console.log('error :>> ', error);
      }

    },
    handleCreateOpen () {
      this.showModal = true
      this.action = "create"
    },
    handleSelectUser (value) {
      console.log('value :>> ', value);
    },
    //原生获取上传进度的事件
    onUploadProgress (progressEvent) {
      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
      console.log('上传 ' + complete)
    },
    // 上传服务器
    async submitUpload () {
      const _this = this
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append('file', this.formData.files);
      //设置文件保存路径
      // formData.append('path', this.path);
      axios({
        url: "http://localhost:8080/api/file/uploadFile",
        method: 'post',
        data: formData,
        headers: {
        },
        //原生获取上传进度的事件
        onUploadProgress: function (progressEvent) {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          _this.uploadFlag = true
          _this.fileUploadPercent = complete;
          console.log('上传 ' + complete)
        }
      }).then(res => {
        if (res.status === 200 && res.data && res.data.data && res.data.code === 200) {
          this.$toast.success("上传成功")
          this.btnDisabled = true
        }
      }).catch(err => {
        console.log(err)
      })
      // try {
      //   const res = await this.$api.uploadFile(formData, function (progressEvent) {
      //     let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
      //     console.log('上传 ' + complete)
      //   })
      //   console.log('%c 🍋 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
      //   if (res.msg === "上传成功") {
      //     this.$toast.success("上传成功")
      //     this.btnDisabled = true
      //   }
      // } catch (error) {
      //   console.log('%c 🥚 error: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', error);
      // }
    },



    // 删除
    handleRemove (file, fileList) {
      //一个文件移除
      this.fileList = []
      //多个文件移除   file.raw 才是真实的 file 对象
      // this.fileList.splice(this.fileList.indexOf(file.raw),1)
      this.uploadForm.appMd5 = ""
    },
    handleOnChange (file, fileList) {
      console.log('触发');
      const isApk = file.name.slice(file.name.length - 3, file.name.length) === "apk"
      const isLt10M = (file.size / 1024 / 1024) < 12
      if (!isApk) {
        this.$toast.error('上传App只能是 apk 格式!')
      }
      if (!isLt10M) {
        this.$toast.error('上传文件大小不能超过 5MB!')
      }
      if (!(isApk && isLt10M)) {
        this.fileList = []
        this.uploadForm.appMd5 = ""
      } else {
        console.log('%c 🍶 file, fileList: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', file, fileList);
        //验证通过之后，将缓存区文件存入上传区文件中
        this.uploadForm.appFilePath = file.raw
        this.formData.files = file.raw;
        this.handleToFileMd5(file, fileList)
      }
      console.log(this.fileList)
    },

    handleToFileMd5 (file, fileList) {
      const _this = this
      const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      const fileReader = new FileReader()
      const chunkSize = 2097152
      const chunks = Math.ceil(file.size / chunkSize)
      let currentChunk = 0
      //注意点，网上都是 这一步都是有问题的， SparkMD5.ArrayBuffer() 
      const spark = new SparkMD5.ArrayBuffer()
      fileReader.onload = function (e) {
        spark.append(e.target.result)
        currentChunk++
        if (currentChunk < chunks) {
          loadNext()
        } else {
          const sparkEnd = spark.end()
          //计算后的结果
          _this.uploadForm.appMd5 = sparkEnd
          console.log('computed hash', sparkEnd)
        }
      }
      fileReader.onerror = function () {
        console.warn('FileReader error.')
      }
      function loadNext () {
        const start = currentChunk * chunkSize
        const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        // 注意这里的 fileRaw
        fileReader.readAsArrayBuffer(blobSlice.call(file.raw, start, end))
      }
      loadNext() //这一步很重要
    },
    handleClose () {
      this.$refs['dialogForm'].resetFields();
      this.showModal = false
      this.fileList = []
      this.btnDisabled = false
      this.fileUploadPercent = 0
      this.action = ""
    },
    //提交服务器保存
    handleSubmit () {

      this.$refs.dialogForm.validate(async (valid) => {
        console.log('%c 🥦 valid: ', 'font-size:20px;background-color: #465975;color:#fff;', valid);
        if (valid) {
          if (!this.btnDisabled) {
            return this.$toast.error("文件未上传服务器")
          }
          try {
            let params = { ...this.uploadForm, action: this.action }
            const res = await this.$api.fileOperate(params)
            this.$toast.success("创建成功")
          } catch (error) {
            this.$toast.success("创建失败")
          }
          this.handleClose()
          this.getAppList()
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>