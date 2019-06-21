var express = require('express');
var router = express.Router();

// 
var mysql = require('./js/conn')

//引入token
const jwt = require('jsonwebtoken')
const secret = 'itsource';

/* 统一设置响应头解决跨域 */ 
router.all('*', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*') // 允许访问的域
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	next() // 放行
})

// 引入数据库连接模块
const connection = require('./js/conn')

/* const expressJwt = require('express-jwt');
const secret = 'itsource';

router.use(expressJwt ({
    secret 
}).unless({
    path: ['/login/checklogin']  //除了这些地址，其他的URL都需要验证
}));
router.use(function (err, req, res, next) {
    //当token验证失败时会抛出如下错误
    if (err.name === 'UnauthorizedError') {   
        //这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...');
    }
})
 */

// 登陆验证
router.post('/loginForm',(req,res) => {
    // 接收参数
    let { account,password } = req.body;

    // let id = req.user.id;
    // console.log(id);
    

        
    // 准备sql        select 字段列表 from 表名  where 条件;
    const sqlStr = `select*from accounts where account='${account}' and password='${password}' `
    // 执行SQL
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        //如果有长度就成功
        if(data.length){
        //  生成token
        const token = jwt.sign(Object.assign({},  data[0]), secret, {
            expiresIn:  60 * 60 * 2 // 过期时间
        })
          res.send({code:0,reason:"登陆成功",token})
        }else{
          res.send({code:1,reason:"请检查用户名或密码"})
        }
    })
})





module.exports = router;