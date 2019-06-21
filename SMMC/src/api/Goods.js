import req from '@/utils/request'

//商品添加
export function goodsAdd(params){
    return req.post('/goods/goodsadd',params)
}

//批量删除
export function gobatchDel(params){
    return req.get('/goods/batchdelet',params)
}

//分页列表获取
export function getgoodsAll(params){
    return req.get('/goods/getgoodsall',params)
}

//修改编辑回填发送
export function handleEdit(params){
    return req.get('/goods/goodsedit',params)
}

//单条删除
export function handleDelete(params){
    return req.get('/goods/goodsDelet',params)
}


//修改模态框确认按钮
export function editFormVisible(params){
    return req.post('/goods/goodssave',params)
}

//搜索框搜索
export function querykeyword(params){
    return req.get('/goods/goodsserch',params)
}