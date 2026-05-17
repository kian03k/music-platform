import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'          //全局引入
// import { Button, Row } from 'element-ui'   按需引入
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from "./store"
// import './api/mock'
import Cookie from 'js-cookie'
import Vant from 'vant'
import 'vant/lib/index.css';


// import cors from 'cors'
// Vue.use(cors); //使用cors中间件

Vue.config.productionTip = false
//全局引入
Vue.use(Vant);

Vue.use(ElementUI)
//按需引入
// Vue.use(Row)
// Vue.use(Button)

//全局前置导航守卫
router.beforeEach((to, from, next) => {
  // ...判断token是否存在
  const token = Cookie.get('token')
  //token不存在且当前页面不为login页面
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
