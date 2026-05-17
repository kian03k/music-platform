import Vue from 'vue'
import VueRouter from 'vue-router'

//1.创建路由组件
import Main from '../views/Main.vue'
// import Home from '../views/Home.vue'
// import User from '../views/User.vue'
// import Mall from '../views/Mall.vue'
// import PageOne from '../views/PageOne.vue'
// import PageTwo from '../views/PageTwo.vue'
// import HelloWorld from '../components/HelloWorld.vue'
import Login from '../views/loginPage.vue'
Vue.use(VueRouter)
//2.将组件与路由进行映射
const routes = [
    //主路由
    {
        path: '/',
        component: Main,
        name:'Main',
        // component:HelloWorld,
        //重定向
        redirect:'/home',
        children: [
        ]
    },
    //Login
    {
        path:'/login',
        name:'login',
        component:Login,
    },
    {
        path: '/404',
        name: 'NotFound',
        meta: {
          title: 'Page not found',
          isLogin: false
        },
        component: () => import('@/views/NotFound')
      },


]

//3.创建router实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
export default router

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
