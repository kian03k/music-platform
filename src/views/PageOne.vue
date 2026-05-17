<template>
  <el-row>
    <el-col :span="8">
      <el-card class="userInfo" shadow="hover">
        <h3>信息修改：</h3>
        <el-form
          ref="form"
          :rules="rules"
          :model="form"
          :label-position="labelPosition"
        >
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD"
              autocomplete="new-password"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="地址" prop="addr">
            <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="new-password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submit">确定修改</el-button>
        <el-button @click="resetForm('form')">清空数据</el-button>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <img
          class="pic-404__parent"
          src="../static/背景图1.jpg"
          height="500px"
          width="910px"
      /></el-card>
      <el-card class="card3"
        ><div class="form-group">
          <div><label class="a123">留言板：</label></div>
            
            <textarea class="form-control" rows="3" id="content"></textarea>
            <div> <button class="btn btn-default" id="sendBtn">提交</button></div>
           

            <!--留言列表-->
          </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getPersonInfo, changePersonInfo } from "../api";
import Cookie from "js-cookie";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
        password: "",
        checkPass: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      tableData: [],
      modalType: 0, // 0表示新增的弹窗， 1表示编辑
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid, 'valid')
        if (valid) {
          // 后续对表单数据的处理
          changePersonInfo(this.form).then(() => {
            // 重新获取列表的接口
            this.getPersonInfo();
          });

          // 清空表单的数据
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },

    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 注意需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
    },

    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    getPersonInfo() {
      var token = Cookie.get("token");
      getPersonInfo({ id: token }).then((data) => {
        this.form = JSON.parse(JSON.stringify(data.data));
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
  },
  mounted() {
    this.getPersonInfo();
  },
};
</script>
<style lang="less" scoped>
.userInfo {
  width: 400px;
}
.card3 {
  .form-group{
            padding: 0.4em 0;
            text-align: justify;
            font-size: 16px;
            margin-top: 10px;

            .a123{
              color: rgb(5, 221, 117);
              text-align: center;
              width: 20px;
            }
            .form-control{
              color: rgb(91, 113, 19);
              width: 800px;
              height: 200px;
            }
      }
}
</style>