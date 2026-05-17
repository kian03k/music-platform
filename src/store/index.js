import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
// import ApiService from './ApiService'


import {
    getMusicLyric
  } from "@/request/api/item.js"
 

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        playList: [{ //播放列表
          al: {
            id: 89039055,
            name: "雨爱抖音版",
            pic: 109951164966568500,
            picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
            pic_str: "109951164966568495"
          },
          id: 1446137141,
          name: "雨爱（抖音版）",
          ar:[{name: "灏灏灏仔"}]
        }],
        playListIndex: 0, //默认下标为0
        isbtnShow: true, //暂停按钮的显示
        detailShow: false, //歌曲详情页的显示
        lyricList:{},//歌词
        currentTime:0,//当前时间
        duration:0,//歌曲总时长
       
        isFooterMusic:true,//判断底部组件是否需要显示
        token:"",

      },
      mutations: {
        updateIsbtnShow: function (state, value) {
          state.isbtnShow = value
        },
        pushPlayList:function(state,value){
          state.playList.push(value)
        },
        updatePlayList: function (state, value) {
          state.playList = value
          console.log(state.playList);
        },
        updatePlayListIndex: function (state, value) {
          state.playListIndex = value
        },
        updateDetailShow: function (state) {
          state.detailShow = !state.detailShow
        },
        updateLyricList:function(state,value){
          state.lyricList=value
        },
        updateCurrentTime:function(state,value){
          // console.log(state.currentTime);
          state.currentTime=value
        },
        updateDuration:function(state,value){
          state.duration=value
        },
        updateToken:function(state,value){
          state.token=value
          localStorage.setItem('token',state.token)
        },
        updateUser:function(state,value){
          state.user=value
        }
      },
      actions: {
        getLyric: async function (context, value) {
          let res = await getMusicLyric(value)
          console.log(res);
          context.commit("updateLyricList",res.data.lrc)
        },
      },



    modules:{
        tab,
        // ApiService
    }
})