<template>
  <div>
    <el-dialog title="请输入你要注册的用户信息！" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户的表单信息 -->
      <el-form ref="form" :rules="rules" :model="form" :label-position="labelPosition">
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
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD"
            autocomplete="new-password">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-form ref="form_login" class="login-container" :model="form_login" :rules="rules_login">
      <h3 class="login_title">心灵放假</h3>
      <el-form-item label="用户名：" prop="name">
        <el-input v-model="form_login.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="form_login.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="item_button">
        <el-button @click="login" type="primary" class="login_button">登录</el-button>
        <el-button @click="register" type="primary" class="register_button">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu, addUser } from "@/api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      labelPosition: "left",
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
        password: "",
        checkPass: "",
      },
      form_login: {
        name: "",
        password: "",
      },
      rules_login: {
        name: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
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
    // login() {
    //   //表单校验
    //   this.$refs.form_login.validate((vaild) => {
    //     if (vaild) {
    //       getMenu(this.form_login).then(({ data }) => {
    //         console.log(data);
    //         if (data.code === 20000) {
    //           //token信息存入cookie用于不同页面间的通讯
    //           Cookie.set("token", data.data.token);
    //           //获取菜单数据，存入store中
    //           this.$store.commit("setMenu", data.data.menu);
    //           this.$store.commit("addMenu", this.$router);
    //           //跳转到首页
    //           console.log(this.$router);
    //           this.$router.push("/home");
    //         } else {
    //           this.$message.error(data.data.message);
    //         }
    //       });
    //     }
    //   });
    // },
    login() {
      //表单校验
      this.$refs.form_login.validate((valid) => {
        if (valid) {
          getMenu(this.form_login).then(({ data }) => {
            console.log(data);
            // ===== 安全判断：防止 data.data 不存在 =====
            if (data.code === 20000) {
              // token信息存入cookie
              Cookie.set("token", data.data.token);
              // 获取菜单数据
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              // 跳转首页
              this.$router.push("/home");
            } else {
              // 修复：安全读取 message，不存在就给默认提示
              const msg = data.data?.message || "登录失败，请检查账号或密码";
              this.$message.error(msg);
            }
          }).catch(err => {
            // 网络错误/后端未启动时，不会进入then，会走这里！
            console.error("请求异常：", err);
            this.$message.error("网络异常或服务未启动，请检查后端服务");
          });
        }
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid, 'valid')
        if (valid) {
          // 后续对表单数据的处理
          addUser(this.form).then(() => {
          });
          // 清空表单的数据
          this.$refs.form.resetFields();
          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    // 弹窗关闭的时候
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    register() {
      console.log(45641)
      this.modalType = 0;
      this.dialogVisible = true;
    },

  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 200px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cacaca;

  .login_title {
    text-align: center;
    margin-bottom: 18px;
  }

  .item_button {
    display: flex;
    justify-content: center;

    .login_button {
      margin: 5px 50px;
    }

    .register_button {
      margin: 5px 50px;
    }
  }
}

.el-dialog {
  .el-input {
    width: 600px;
  }

  .el-select {
    width: 600px;
  }
}
</style>