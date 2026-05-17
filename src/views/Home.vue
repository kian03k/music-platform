<template>
    <div>
      <TopNav />
  
      <SwpierTop />
      <IconList />
      <MusicList />
  
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  // import { getMusicItemList, getItemList } from "@/request/api/item.js";
  import TopNav from "@/components/home/TopNav.vue";
  import SwpierTop from "@/components/home/SwiperTop.vue";
  import IconList from "@/components/home/IconList.vue"
  import MusicList from "@/components/home/MusicList.vue"
  
  export default {
    data() {
      return {};
    },
    // async mounted(){
    //     let res2= await getItemList(5221080943);
    //     console.log(res2);
    // },
    components: { 
      TopNav,
      SwpierTop,
      IconList,
      MusicList,
    },
  };
  </script>
  
  
  
  
  
  
  
  <!--<template>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div class="user">
            <img src="../images/头像.png" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info"></div></el-card></el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
  </template>
  <script>
  import { getData } from "../api";
  export default {
    data() {
      return {};
    },
    mounted() {
      getData().then(() => {
        console.log('I get');
      });
    },
  };
  </script>
  <style lang="less" scoped>
  .user {
    display: flex;
    align-items: center;
    img {
      margin-right: 40px;
      width: 150px;
      height: 150px;
      border-radius: 50px;
    }
    .userinfo {
      .name {
        font-size: 32px;
        margin-bottem: 10px;
      }
      .access {
        color: #999;
      }
    }
  }
  </style>-->
  