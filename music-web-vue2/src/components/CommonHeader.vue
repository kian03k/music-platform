<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        @click="handleMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <!-- <i class="el-icon-arrow-down el-icon--right">下拉菜单/斜体文本</i> -->
          <img src="../images/头像.png" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
          <!-- <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { logOut } from "../api/";
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "logout") {
        var token = Cookie.get("token");
        logOut({ id: token }).then((data) => {
          console.log(data);
        });
        Cookie.remove("token");
        //清除menu
        Cookie.remove("menu");
        this.$router.replace({ path: "/login" });
        location.reload();
        this.$router.push("/login");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #fff0f5;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>