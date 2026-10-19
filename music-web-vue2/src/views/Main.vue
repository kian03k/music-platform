<template>
  <div>
    <el-container>

      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>

      <el-container>

        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
            <!-- 路由的出口 -->
            <router-view></router-view>
        </el-main>

        <el-footer>
        <common-bottom></common-bottom>
        </el-footer>
        
        
      </el-container>

    </el-container>
  </div>
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonBottom from '@/components/commonBottom.vue';
export default {
  data() {
    return {};
  },
  components:{
    CommonAside,
    CommonHeader,
    CommonBottom
  }
}; 
</script>
<style  scoped>
.el-header{
  padding: 0
}
.el-aside{
  background: #FFF0F5;
}
.el-footer{
  padding: 0px;
}
</style>>

