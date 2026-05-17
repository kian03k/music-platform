<template>
    <div>
<ItemMusicTop :playlist="this.playlist" />
<ItemMusicList
    :itemList="this.itemList"
    :subscribedCount="this.playlist.subscribedCount"
/>
<!-- <FooterMusic/> -->
    </div>
</template>    

<script>
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
// import FooterMusic from "@/components/item/FooterMusic.vue"

export default {
    data(){
        return{
            playlist: {},
            itemList: [],
            id:'2230318386',
        };
    },
    methods:{
        async getGendan(){
            let id=this.id
            if(this.$route.query.id){
                id = this.$route.query.id
            }
            

            console.log(id);
      //   获取歌单详情页
            let res = await getMusicItemList(id);
            console.log(res);
            this.playlist = res.data.playlist;
        //   获取歌单的歌曲
              let result = await getItemList({ id, limit: 10, offset: 0 });
            console.log(result);
             this.itemList = result.data.songs

      //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
            sessionStorage.setItem("itemDetail", JSON.stringify());

        },

    },
    mounted(){
        this.getGendan();
    },

    components: {
    ItemMusicTop,
    ItemMusicList,
    // FooterMusic,
  },


};
</script>