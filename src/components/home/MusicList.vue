<template>
      <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="270"
        class="my-swpie"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item.id">
            <router-link :to="{path:'/songspage',query:{id:item.id}}">
            
          <img :src="item.picUrl" alt="" />
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gl-play-copy"></use>
            </svg>
            {{ changeCount(item.playCount) }}
          </span>
          <span class="name">{{ item.name }}</span>
          </router-link>
         
          
        </van-swipe-item>
      </van-swipe>
    </div>
    </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
//import VueRouter from 'vue-router';
//import ItemMusicVue from '@/views/ItemMusic.vue';
export default {
    
  //Vue2
  /* data() {
    return {
       musicList: [],
     };
   },
   methods: {
     async getGnedan() {
      let res = await getMusicList();
       console.log(res);
      this.musicList = res.data.result;
     },
     changeCount: function (num) {
       if (num >= 100000000) {
         return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
       }
     },
   },
   mounted() {
     this.getGnedan();
   }*/
  // Vue3
  setup() {
    

    const state = reactive({
      musicList: [],
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getMusicList();
      console.log(res);
      state.musicList = res.data.result;
    });
    return { state,changeCount };
  },
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 150px;
  padding: 10px;
  .musicTop {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      font-size: 30px;
      font-weight: 900;
    }
    .more {
      border: 1px solid #333;
      text-align: center;
      line-height: 40px;
      padding: 0 10px;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 300px;

    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 10px;
      position: relative;
      height: 250px;
      img {
        width: 100%;
        height: 200px;
        border-radius: 20px;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 15px;
        color: white;
        margin-top: 5px;
        .icon {
          width: 20px;
          height: 20px;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>

