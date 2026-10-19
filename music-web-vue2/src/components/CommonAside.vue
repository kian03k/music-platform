<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#FFF0F5"
    text-color="#708090"
    active-text-color="#FF8C00"
  >
    >
    <h3 class="text">{{isCollapse ? '状态栏':'音乐平台'}}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
    >
      <!-- 字符串拼接 ES6  -->
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="item in haveChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<!-- 只作用于当前页面 -->


 <style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400px;
  }
}
</style>
  
  <script>

import Cookie from 'js-cookie'
export default {
  data() {
    return {
      // isCollapse: false,
      // menuData: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其他",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "首页1",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "首页2",
      //         icon: "setting",
      //         url: "Other/PageTwo",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      console.log(item);
      console.log(this.$route.path);
      console.log(item.path);
      //判断当前路由与跳转的路由是否一致
      if (
        this.$route.path != item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
    },
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单
    haveChildren() {
      return this.menuData.filter((item) => item.children);
    },
    menuData(){
      //如果缓存没有数据，从STORE中读取
      return JSON.parse(Cookie.get('menu'))||this.$store.state.tab.menu
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>

.el-menu{
  border-right: none;
  .text{
  color: black;
}
}
</style>