<template>
    <div>
    <img :src="musicList.al.picUrl" alt="" class="bgimg" />
      <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon liebiao" aria-hidden="true" @click="backHome"  >
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div >
        <p>{{ musicList.al.name }}</p>
        <span v-for="item in musicList.ar" :key="item.name">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>

  <div class="detailContent" v-show="!isLyricShow">
    <img
      src="@/assets/needle-ab.png"
      alt=""
      class="img_needle"
      :class="{ img_needle_active: !isbtnShow }"
    />
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img
      :src="musicList.al.picUrl"
      alt=""
      class="img_ar"
      @click="isLyricShow = true"
      :class="{ img_ar_active: !isbtnShow, img_ar_pauesd: isbtnShow }"
    />
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isbtnShow"
        @click="play"
      >
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>




  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex'

export default{
    data() {
    return {
      isLyricShow: false,
    };
  },
  computed: {
    ...mapState(["lyricList", "currentTime", "playListIndex", "playList",'duration']),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          // console.log(min,sec,Number(mill),lrc);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      console.log(arr);
      return arr;
    },
  },
  mounted() {
    // console.log(this.musicList);
    // console.log(this.lyricList.lyric);
    this.addDuration()
  },
  props: ["musicList", "isbtnShow", "play","addDuration"],
  methods: {
    backHome: function () {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    goPlay: function (num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      // console.log([p]);
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if(newValue===this.duration){
       
        if(this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0);
          this.play()
        }else{
           this.updatePlayListIndex(this.playListIndex+1);
        }
      }
      // console.log([this.$refs.musicLyric])
    },
  },



}


</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}

.detailTop {
  width: 100%;
  height: 20px;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  position: relative;
  margin-top:20px ;
  .detailTopLeft{
    width: 25%;
    height: 100%;
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin: 0 1px;

    span {
        font-size: 20px;
        color: #fff;
      }
      .icon {
        width: 25px;
        height: 25px;
        fill: #fff; //填充颜色
      }

  }
  .detailTopRight{
    width: 5%;
    height: 100%;
    display: flex;
    justify-content:space-between;
    align-items: right;
    margin: 0 1px;

      .icon {
        width: 25px;
        height: 25px;
        fill: #fff; //填充颜色
      }

  }
}

.detailContent {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 250px;
    height: 180px;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 250px;
    height: 180px;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 380px;
    height: 380px;
    position: absolute;
    bottom: 3.2rem;
    z-index: -1;
  }
  .img_ar {
    width: 238px;
    height: 238px;
    border-radius: 50%;
    position: absolute;
    bottom: 122px;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 15px;
  }
  .active {
    color: #fff;
    font-size: 20px;
  }
}


.detailFooter {
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 2rem;
      height: 2rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 30px;
      height: 30px;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
        width:2rem;
        height: 2rem;
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 30px;
      height: 30px;
    }
  }
}

</style>
