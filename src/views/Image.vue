<!--
 * @Author: MarioGo
 * @Date: 2021-09-10 23:59:04
 * @LastEditTime: 2021-09-11 23:17:17
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
        <el-form-item label="七牛云空间">
          <el-select v-model="queryForm.spaceKey">
            <el-option :value="'h5monkey'" label="h5monkey"></el-option>
            <el-option :value="'book'" label="book"></el-option>
            <el-option :value="'mall'" label="mall"></el-option>
          </el-select>
        </el-form-item>
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
              :src="spaceUrl + scope.row.key"
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
              @click="handleDel(scope.row.key)"
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
    <el-dialog title="上传图片" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="imageForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="图片前缀" prop="beforeName">
          <el-input
            v-model="imageForm.beforeName"
            placeholder="请输入图片名称前缀(方便统一管理 比如 foxhis_)"
          />
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            class="upload-demo"
            :auto-upload="false"
            drag
            action=""
            accept=".jpg,.png"
            :limit="limit"
            :on-remove="handleRemove"
            :on-change="handleOnChange"
            :file-list="fileList"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过2M 最多上传5张
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleOnlyOneSubmit"
            >单张图片上传</el-button
          >
          <el-button type="primary" @click="handleSubmit"
            >多张图片上传</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from '../utils/utils'
import axios from "axios"
export default {
  name: "image",
  data () {
    return {
      limit: 5,
      uploadFlag: false,
      fileUploadPercent: 0,
      queryForm: {
        spaceKey: "mall",//默认空间
        imageName: ""
      },
      fileList: [],  //上传图片数量
      imageList: [],
      formData: {

      },
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
        }
      ],
      pager: {
        total: 0,
        pageSize: 10,
      },
      showModal: false,
      action: 'create',
      imageForm: {
        beforeName: ""
      },
      rules: {
        imageName: {
          required: true,
          message: '请输入角色名称'
        }
      }
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
        this.spaceUrl = this.getSpaceUrl()

        // this.pager.total = page.total
      } catch (e) {
        throw new Error(e)
      }
    },
    getSpaceUrl () {
      switch (this.queryForm.spaceKey) {
        case "h5monkey":
          return "http://pp.52react.cn/"
          break;
        case "mall":
          return 'http://imagemall.52react.cn/'
          break;
        case "book":
          return 'http://book.52react.cn/'
          break;
        default:
          return ''
          break;
      }
    },

    // 删除
    handleRemove (file, fileList) {
      //多个文件移除   file.raw 才是真实的 file 对象
      this.fileList.splice(this.fileList.indexOf(file.raw), 1)
    },
    //文件上传本地 钩子
    handleOnChange (file, fileList) {
      const isImage = file.name.split(".").pop()
      console.log('%c 🌶 isImage: ', 'font-size:20px;background-color: #465975;color:#fff;', isImage);
      if (isImage !== "jpg" && isImage !== "png" && isImage !== "jpeg") {
        return this.$toast.error('上传图片只能是 jpg png 格式!')
      }
      const isLt2M = (file.size / 1024 / 1024) < 10
      if (!isLt2M) {
        return this.$toast.error('上传文件大小不能超过 2MB!')
      }

      //验证通过之后，将缓存区文件存入上传区文件中
      this.fileList.push({ name: file.name, file: file.raw });
      console.log('%c 🍶 file, fileList: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', this.fileList);
    },
    // 图片重置
    handleRest (form) {
      this.$refs[form].resetFields()
    },
    // 图片添加
    handleAdd (type, row) {
      this.action = 'create'
      this.showModal = true
    },


    // 上传服务器
    async submitUpload (files) {
      const _this = this
      let formData = new FormData();
      // 向 formData 对象中添加文件
      this.fileList.forEach(item => {
        formData.append('file', item.file)
      })
      formData.append('spaceKey', this.queryForm.spaceKey);
      formData.append('imageName', this.imageForm.beforeName);
      //设置文件保存路径
      // formData.append('path', this.path);
      axios({
        url: "http://localhost:8080/api/qiniu/uploadQiniuImage",
        // url: "http://localhost:8080/api/file/uploadMoreFile",
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
          this.handleClose()
          this.getImageList()
        }
      }).catch(err => {
        console.log(err)
      })

    },

    handleOnlyOneSubmit () {
      const _this = this
      let formData = new FormData();
      formData.append('file', this.fileList[0].file)
      formData.append('spaceKey', this.queryForm.spaceKey);
      formData.append('imageName', this.imageForm.beforeName);
      //设置文件保存路径
      // formData.append('path', this.path);
      axios({
        url: "http://localhost:8080/api/qiniu/uploadByOneQiniuImage",
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
        }
      }).catch(err => {
        console.log(err)
      })


    },


    // 图片提交
    handleSubmit () {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          this.submitUpload(this.formData.files) // 调用文件上传方法
        }
      })
    },
    // 弹框关闭
    handleClose () {
      this.handleRest('dialogForm')
      this.uploadFlag = false
      this.fileUploadPercent = 0
      this.fileList = []
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
    async handleDel (key) {
      const params = {
        spaceKey: this.queryForm.spaceKey,
        fileName: key
      }
      const res = await this.$api.deleteImage(params)
      console.log('%c 🍬 删除成功: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', res);
      if (res.data.size === 0) {
        this.$toast.success('删除成功')
        this.getImageList()
      }
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