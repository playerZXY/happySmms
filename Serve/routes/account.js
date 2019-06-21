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
/* get凡是请求   测试 */
router.get('/', (req, res)=>{
  res.send('前后端通了！');
});


/* 添加账号 */ 
router.post('/accountadd', (req, res) => {
	// 接收参数
	let {account, password, region} = req.body;
	// 准备sql
	const sqlStr = `insert into accounts(account, password, region) values('${account}', '${password}', '${region}')`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '添加账号成功'}) // 响应成功的数据给前端
		} else {
			res.send({code: 1, reason: '添加账号失败'}) // 响应失败的数据给前端
		}
  })

})

// 账号列表请求
router.get('/accountList',(req,res)=>{
  // 准备sql
  const sqlStr = `select * from accounts order by ctime desc`;
  // 执行sql
  connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    res.send({data})
  })
})


// 单个删除
router.get('/accountDlete',(req,res)=>{
  //接受id
  let { id } = req.query;

  //准备sql
  const sqlStr = `delete from accounts where id=${id}`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if (err) throw err
    //判断
    if(data.affectedRows > 0) {
      res.send({ code:0,reason:'删除成功' })
    }else{
      res.send({ code:1,reason:'删除失败' })
      
    }
  })

})


// 编辑数据模态框的回填
router.get('/accountedit',(req,res)=>{
  // 接受参数
  let { id } = req.query;
  // 准备sql
  const sqlStr = ` select*from accounts where id=${id} `;
  //执行sql
  connection.query(sqlStr,(err,data) => {
      if(err) throw err;
      // 响应数据给前端
      res.send({data})
  })

})


// 编辑修改后保存
router.post('/editForm',(req,res) => {
  // 接收参数
  let { account,userGroup,id } = req.body;

  //准备sql
  const sqlStr = ` update accounts set account='${account}', region='${userGroup}' where id=${id} `;

  // 执行sql
  connection.query(sqlStr,(err,data) =>{
      if(err) throw err;
      if(data.affectedRows > 0){
        res.send({code:0,reason:"修改成功"})
      }else{
        res.send({code:1,reason:"修改失败"})
      }
  })


})


//批量删除
router.get('/deleaccList',(req,res) => {
    //接受参数
    let { idArr } = req.query;
    // 准备sql语句
    const sqlStr = `delete from accounts where id in (${idArr})`;
    //执行sql语句
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        // 判断
        if(data.affectedRows>0){
          res.send({code:0,reason:"批量删除成功"})
        }else{
          res.send({code:1,reason:"批量删除失败"})
          
        }
    })
})

// 分页管理
router.get('/accountAllpage',(req,res) => {
  // console.log(req.user)
  
    // 接受参数
    let { pagesize,currentpage } = req.query;

    // 准备sql
    // 定义变量 保存数据总条数据
      let total;

     

      // 准备sql
      let sqlStr = `select * from accounts order by ctime desc`;
      // 执行sql
      connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        total = data.length; // 获取数据总条数
      })

      // 构造sql 按照分页查询数据
      let n = (currentpage - 1) * pagesize; // 跳过多少条
      sqlStr += ` limit ${n}, ${pagesize}`; // 分页的sql

      // 执行sql
      connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send({total, data})  // 把中数据条数 和 当前页码对应的数据响应给前端
      })
})

//个人中心的名称更新
router.get('/userinfo',(req,res) => {
    let account =req.user.account;

    res.send({account})
})


//密码修改的原密码验证
router.get('/oldpassword',(req,res) => {
    //接受参数
    let { value } = req.query;

    let password = req.user.password;
    
    
    if(value === password){
      res.send({code:0,reason:'已确认'})
    }else{
      res.send({code:1,reason:'原密码错误，请再次确认'})
    }


})

//修改确认
router.post('/passmodify' ,(req,res) => {
    let { newpassword } =req.body;

    let id = req.user.id;
    //准备sql
    const sqlStr = `update accounts set password='${newpassword}' where id=${id} `;

    connection.query(sqlStr,(err,data) => {
        if(err) throw err;

        if(data.affectedRows>0){
          res.send({code:0,reason:"密码修改成功，请重新登陆"})
        }else{
          res.send({code:1,reason:"密码修改失败"})
          
        }
    })
})

//个人中心的账号同步
router.get('/getaccountp',(req,res) => {
    //获取当前登陆账号id
    let id = req.user.id;
    //准备sql
    const sqlStr = `select * from accounts where id=${id}`
    //执行
    connection.query(sqlStr,(err,data) => {
        if(err) throw err;
        
        res.send(data)
    })
})








module.exports = router;
