<!--<template>
    <div class="Swiper-Top">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
        </van-swipe>
    </div>
</template>

<style lang="less" scoped>
.Swiper-Top{
    width: 100%;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

</style>-->




<template>
    <div id="swiperTop">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in state.images" :key="image.id">
          <img :src="image.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </template>
  <script>
 /* import axios from "axios";*/
  import { getBanner } from "@/request/api/home.js";
  import { reactive, onMounted } from "vue";
  export default {
    setup() {
      const state = reactive({
        images: [
          "https://img.yzcdn.cn/vant/apple-1.jpg",
          "https://img.yzcdn.cn/vant/apple-2.jpg",
        ],
      });
      onMounted(async () => {
        // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
        //   console.log(res);
        //   state.images=res.data.banners
        //   console.log(state.images);
        // })
        let res = await getBanner();
        state.images=res.data.banners
        console.log(res);
      });
      return { state };
    },
  };
  </script>
  <style lang="less">
  #swiperTop {
    //需要在上面自己添加一个id
    .van-swipe {
      width: 100%;
      height: 300px;
      .van-swipe-item {
        padding: 0 0.2rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
      .van-swipe__indicator--active {
        background-color: rgb(219, 130, 130);
      }
    }
  }
  </style>


  