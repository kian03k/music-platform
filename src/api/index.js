import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/getData')
}

export const getUser = (params) => {
    // console.log(params, 'params')
    // 返回用户列表
    return http.get('/user/getUser', params)
}

export const addUser = (data) => {
    return http.post('/user/add', data)
}

export const editUser = (data) => {
    return http.post('/user/edit', data)
}

export const delUser = (data) => {
    return http.post('/user/del', data)
}

export const getMenu = (data) => {
    console.log(data)
    return http.post('/permission/getMenu', data)
}
export const returnSql = (data) => {
    return http.post('/getsql', data)
}
export const getPersonInfo = (data) => {
    return http.post('/person/get', data)
}

export const changePersonInfo = (data) => {
    return http.post('/person/change', data)
}
export const logOut = (data) => {
    return http.post('/home/logout', data)
}