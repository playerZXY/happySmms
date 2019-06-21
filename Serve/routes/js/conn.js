//引入mysql
const mysql = require('mysql')

//创建连接对象
const connection = mysql.createConnection({
    host:'localhost',  //数据库地址
    user:'root',   //用户名
    password:'root',  //密码
    database:'supermarket'  //数据库名
})

//执行连接方法
connection.connect();
console.log("数据库连接成功");

module.exports=connection;
