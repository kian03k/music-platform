// import { MenuItem } from "element-ui"
import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false,//控制菜单展开还是收起的属性
        menu: []
    },
    mutations: {
        //修改菜单状态的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //删除指定的tag数据
        //设置menu数据
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //组装动态路由的数据
            const menuArray = []
            
            menu.forEach(item => {
                if (item.children) {
                    item.chuildren = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.push({ path: '*', redirect: '/404', hidden: true });
            //路由的动态添加
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })

        }
    }
}