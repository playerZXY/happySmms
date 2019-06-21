import req from '@/utils/request'

//登陆模块
export function checkLogin(params){
    return req.post('/login/loginForm',params)
}