var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var accountRouter = require('./routes/account');    //引入账号子路由
var goodsRouter = require('./routes/goods')    //引入商品子路由
var loginRouter = require('./routes/login')    //引入登陆子路由
var router = express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* 验证token的合法性 */
const expressJwt = require('express-jwt');
//密钥
const secret = 'itsource';

// 验证token的合法性
app.use(expressJwt ({
  secret
}).unless({
  path: ['/login/loginForm']  // 除了这个地址，其他的URL都需要验证（其他的所有请求 都要带上token 才能获取数据 否则不能获取到数据）
}))
// 路由拦截器
app.use(function (err, req, res, next) {
  // 如果前端没有token或者是错误的token 就会抛出如下错误
  if (err.name === 'UnauthorizedError') { 
      // 响应给前端token无效的信息
      res.status(401).send('token不合法...');
  }
})
/* --------------------  验证token合法性结束  ---------------- */ 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/account', accountRouter);     //使用账号管理子路由
app.use('/login', loginRouter);     //使用登陆子路由
app.use('/goods',goodsRouter);    //使用商品管理子路由   

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(5555, () => {
            console.log('服务器开启成功，地址http://127.0.0.1:5555')
        })

module.exports = app;
