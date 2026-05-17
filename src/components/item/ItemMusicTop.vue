<template>
    <div>
    <div class="itemMusicTop">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
    <div class="itemTopContent">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="palyCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gl-play-copy"></use>
          </svg>
          <span>{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <p class="rightP_one">{{ playlist.name }}</p>
        <div class="right_img">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <p class="rightP_two">
          <span>{{ playlist.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </p>
      </div>
    </div>
    <div class="itemTopFooter">
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
        </svg>
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="footerItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
    </div>
  </template>
  <script>
  export default {
    setup(props) {
      // console.log(props);
      // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
      props.playlist.creator=""
      
      // 对播放量的处理
      function changeCount(num) {
        if (num >= 100000000) {
          return (num / 100000000).toFixed(1) + "亿";
        } else if (num >= 10000) {
          return (num / 10000).toFixed(1) + "万";
        }
      }
      return{changeCount}
    },
    props: ["playlist"],
  };
  </script>
  <style lang="less" scoped>
  .itemMusicTop {
    margin-top: 10px;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: .2rem;
    position: relative;
    .itemLeft,
    .itemRight {
      width: 10%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 1px;
      span {
        font-size: 20px;
        color: #fff;
      }
      .icon {
        width: 30px;
        height: 30px;
        fill: #fff; //填充颜色
      }
    }
    .bgimg {
      width: 100%;
      height: 800px;
      position: absolute;
      z-index: -1;
      filter: blur(30px);
    }
  }
  .itemTopContent {
    width: 100%;
    height: 300px;
    padding: 0.2rem;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .contentLeft {
      width: 40%;
      height: 250px;
      position: relative;
  
      img {
        width: 220px;
        height: 220px;
        border-radius: 0.2rem;
        position: absolute;
        z-index: -1;
      }
      .palyCount {
        position: absolute;
        left: 0.1rem;
        margin-top: 0.1rem;
        .icon {
          width: 5px;
          height: 5px;
          margin-top: -0.02rem;
          vertical-align: middle;
        }
        span {
          font-size: 0.26rem;
          color: #fff;
        }
      }
    }
    .contentRight {
      width: 70%;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .rightP_one {
        font-size: 30px;
        font-weight: 900;
        color: #fff;
        font-family: "微软雅黑";
      }
      .right_img {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #ccc;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }
        span {
          margin-left: 0.1rem;
        }
        .icon {
          width: 30px;
          height: 30px;
          margin-top: -0.08rem;
          vertical-align: middle;
        }
      }
      .rightP_two {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 95%;
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 10px;
          color: #ccc;
        }
        .icon {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
  .itemTopFooter{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    margin-top: .5px;
    .footerItem{
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
      .icon{
        fill: #fff;
      }
      span{
        margin-top: .5px;
      }
    }
  
  }
  </style>