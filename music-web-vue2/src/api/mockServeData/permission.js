import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        //判断用户是否存在
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home.vue",
                        },
                        // {
                        //     path: "/mall",
                        //     name: "mall",
                        //     label: "商品管理",
                        //     icon: "video-play",
                        //     url: "Mall.vue",
                        // },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "User.vue",
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "首页1",
                                    icon: "setting",
                                    url: "PageOne.vue",
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "首页2",
                                    icon: "setting",
                                    url: "PageTwo.vue",
                                },
                            ],
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        }
        else if (username === 'xiao' && password === 'xiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: "/home",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home.vue",

                        },
                        {
                            path: "/mall",
                            name: "mall",
                            label: "音乐列表",
                            icon: "video-play",
                            url: "Mall.vue",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "User.vue",
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: "page1",
                                    label: "首页1",
                                    icon: "setting",
                                    url: "Other/PageOne",
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "首页2",
                                    icon: "setting",
                                    url: "Other/PageTwo",
                                },
                            ],
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }
    }
}