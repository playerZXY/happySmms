import req from '@/utils/request'

//批量删除
export function accountAllDelet(params){
    return req.get('/account/deleaccList',params)
}

//分页列表获取
export function accountAllGet(params){
    return req.get('/account/accountAllpage',params)
}

//单条删除
export function accountDlete(params){
    return req.get('/account/accountDlete',params)
}

//编辑模态框
export function accountBedit(params){
    return req.get('/account/accountedit',params)
}

//编辑框确定按钮
export function editSave(params){
    return req.post('/account/editForm',params)
}

//账号添加
export function accountAdd(params){
    return req.post('/account/accountadd',params)
}

//个人姓名
export function userinfo(params){
    return req.get('/account/userinfo',params)
}


//密码修改旧密码验证
export function oldPassword(params){
    return req.get('/account/oldpassword',params)
}

//确认修改
export function passModify(params){
    return req.post('/account/passmodify',params)
}


//密码修改旧密码验证
export function getAccountp(params){
    return req.get('/account/getaccountp',params)
}