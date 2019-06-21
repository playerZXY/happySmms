var express = require('express');
var router = express.Router();

// 
var mysql = require('./js/conn')

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
}) */
/* --------------------  验证token合法性开始  ---------------- */ 
// 准备一个签名（秘钥）
// const secretKey = 'wang_xx';
// /* 验证token的合法性 */
// const expressJwt = require('express-jwt');

// // 验证token的合法性
// router.use(expressJwt ({
//     secret: secretKey
// }).unless({
//     path: ['/login/loginForm']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
// })); 
// // 路由拦截器
// router.use(function (err, req, res, next) {
//     // 如果前端没有token或者是错误的token 就会抛出如下错误
//     if (err.name === 'UnauthorizedError') { 
//         // 响应给前端token无效的信息
//         res.status(401).send('token不合法...');
//     }
// })
/* --------------------  验证token合法性结束  ---------------- */ 


/* get凡是请求   测试 */
router.get('/', (req, res)=>{
  res.send('前后端通了！');
});

// 商品增加的post请求
router.post('/goodsadd',(req,res)=>{
    // 接受参数
    let { clcation,goodsCode,goodsName,goodsPrice,listprice,CostPrice,WareNum,goodsweight,goodsCompany,radio,Promotion } =req.body

    //sql语句
    const sqlStr = `insert into goods(clcation,goodsCode,goodsName,goodsPrice,listprice,CostPrice,WareNum,goodsweight,goodsCompany,radio,Promotion) values('${clcation}', '${goodsCode}', '${goodsName}', '${goodsPrice}', '${listprice}', '${CostPrice}', '${WareNum}', '${goodsweight}', '${goodsCompany}', '${radio}', '${Promotion}')`;

    //执行sql语句
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;

        // 判断
        if( data.affectedRows > 0 ){
            res.send({code:0,reason:'商品添加成功'})
        }else{
            res.send({code:1,reason:'商品添加失败'})
            
        }
    })
})

// 获取所有商品
router.get('/goodslist',(req,res) => {
    // 准备sql
    const sqlStr = `select * from goods order by ctime desc`;
    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        // 不能设置大于0的判断，不然数据库要是没有数据就不行了
        res.send({data})
    })
})


// 单条删除
router.get('/goodsDelet',(req,res) => {
    // 获取参数
    let { id } = req.query;
    // 准备sql
    const sqlStr = `delete from goods where id=${id}`;
    // 执行sql
    connection.query(sqlStr,(err,data) =>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:"删除成功"})
        }else(
            res.send({code:1,reason:'删除失败'})
        )
    })
})


// 修改框回填
router.get('/goodsedit',(req,res) => {
    // 获取参数
    let { id } = req.query;
    // 准备sql
    const sqlStr = `select * from goods  where id=${id}`;
    //执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;

        res.send({data})
    })
})


//修改框提交按钮，修改当前数据
router.post('/goodssave',(req,res) => {
    // 获取参数
    let { goodsName, clcation, goodsPrice, CostPrice, listprice, WareNum, goodsweight, goodsCompany,currenID } = req.body;

    //准备sql
    const sqlStr = `update goods set goodsName="${goodsName}", clcation="${clcation}",goodsPrice="${goodsPrice}",CostPrice="${CostPrice}",listprice="${listprice}",WareNum="${WareNum}",goodsweight="${goodsweight}",goodsCompany="${goodsCompany}"  where id=${currenID}`;
    // 执行
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:"修改成功"})
        }else{
            res.send({code:1,reason:"修改失败"})
        }
    })
}) 


// 批量删除
router.get('/batchdelet',(req,res) => {
    let { idArr } = req.query;
    const sqlStr = `delete from goods where id in (${idArr})`;
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;

        if(data.affectedRows>0){
            res.send({code:0,reason:"删除成功"})
        }else{
            res.send({code:1,reason:"删除失败"})
        }

    })
})


// 分页
/* router.get('/getgoodsall',(req,res) => {
    let { currentPage,pageSize } = req.query;
    
    //定义一个总数据变量
    let total;

    // 准备sql
    const sqlStr =`select * from goods order by id desc`;

    //执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        total = data.length;
    })

    // 构造sql 按照分页去查询数据
    let n = (currentPage - 1) * pageSize;  //跳过多少条
    sqlStr += ` limit ${n}, ${pageSize}`;

    console.log(sqlStr);
    

    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        res.send({total,data})
    })

    
}) */
router.get('/getgoodsall',(req,res) => {
    // 接受参数
    let { currentPage,pageSize,keyword,cateName } = req.query;

      // 定义变量 保存数据总条数据
      let total;
      // 构造sql
      let sqlStr = `select * from goods where 1=1`;
      // 如果分类不等于空 且 不等于全部
      if( cateName !== "全部" &&  cateName !== "" ){
        sqlStr += ` and clcation='${cateName}'`;
    }
    // 如果第二个关键字不为空 那么就拼接sql
    if (keyword !== '') {
        sqlStr += ` and(goodsName like '%${keyword}%' or goodsCode like '%${keyword}%')`
    }

    // 拼接排序
    sqlStr += ` order by ctime desc`;
    
     // 执行sql
     connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        total = data.length; // 获取数据总条数
      })

      // 构造sql 按照分页查询数据
      let n = (currentPage - 1) * pageSize; // 跳过多少条
      sqlStr += ` limit ${n}, ${pageSize}`; // 分页的sql

     
      // 执行sql
      connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send({total, data})  // 把中数据条数 和 当前页码对应的数据响应给前端
      })
      
})

//搜索按钮
router.get('/goodsserch',(req,res) => {
    // 获取参数
    let { keyword,cateName } = req.query;
    // 准备sql
    
    let sqlStr = `select * from goods where 1=1`;

    if( cateName !== "全部" ||  cateName !== "" ){
        sqlStr += ` and clcation='${cateName}'`;
    }

    if (keyword !== '') {
        sqlStr += ` and(goodsName like '%${keyword}%' or goodsCode like '%${keyword}%')`
    }

    // if(cateName === "全部" && keyword === ''){
    //     sqlStr = `select * from goods where 1=1`;
    // };


    // 执行sql
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;

        res.send(data)
    });

})





module.exports = router;