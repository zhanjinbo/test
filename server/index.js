// 加载Express模块111111
// 搭建node.js环境 全新环境要装node.js  和express
// 进入server文件夹 npm install --save express(出现worm是正常的他找json文件没有没关系,脚手架需要这个serve没有没关系)
const express = require('express');

//加载MD5模块
const md5 = require('md5');

// 加载CORS模块44444
const cors = require('cors');

// 加载body-parser模块
const bodyParser = require('body-parser');

// 加载MySQL模块
const mysql = require('mysql');

// 6666创建MySQL连接池
const pool = mysql.createPool({
  // 数据库服务器的地址
  host: '127.0.0.1',
  // 数据库服务器的端口号
  port: 3306,
  // 数据库用户的用户名
  user: 'root',
  // 数据库用户的密码
  password: '',
  // 数据库名称
  database: 'xzqa',
  // 编码方式
  charset: 'utf8',
  // 最大连接数
  connectionLimit: 20
});

// 创建WEB服务器实例22222222
const server = express();

//555555 将CORS作为Server的中间件.解决跨域问题 
// use 一定要在引入之后
server.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080']
}));

//将bodyParser作为Server的中间件
server.use(bodyParser.urlencoded({
  extended: false
}));


// 测试接口
// server.get('/test',(req,res)=>{
//   res.send('ok');
// });

//11.获取所有文章分类信息的接口
// 服务器已经接收到了客户端的请求,执行操作
server.get('/category',(req,res)=>{
  let sql = 'SELECT id,category_name FROM xzqa_category';
  // 执行数据库查询
  pool.query(sql,(error,results)=>{
    if(error) throw error;
    // 给客户端发送响应的结果
    res.send({message:'查询成功',code:1,results:results});
    // console.log(results);
  });
});

// 获取指定分类下包含的文章数据,服务器拿到客户端发过来的文章类目的cid
server.get('/articles',(req,res)=>{
  let cid = req.query.cid;
  // console.log(req);
  // console.log(req.query);
  let page = parseInt(req.query.page);
  // console.log(cid);
  // console.log(page); 
  let pagesize = 10;
  let pagecount;
  let sql = "SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?";
  pool.query(sql,[cid],(error,results)=>{
    if(error) throw error;
    let rowcount = results[0].count;
    pagecount = Math.ceil(rowcount / pagesize);
    //---------------------------------------------
    let offset = (page-1) * pagesize;
  sql = 'SELECT id,subject,description,image FROM xzqa_article  WHERE category_id=? LIMIT ?,?';
  // cid查询的类目 offset 位移,每次查询时候位移的位置,pagesize是每次查询的数量
  pool.query(sql,[cid,offset,pagesize],(error,results)=>{
    if(error) throw error;
    res.send({message:'查询成功',code:1,results:results,pagecount:pagecount});
  });
    // -------------------------------------------- 
  });
  
});


// 获取文章详细信息(包括标题,正文,作者等)
server.get('/details', (req, res) => {
  //获取URL地址栏的参数
  let id = req.query.id;
  //SQL查询
  let sql = 'SELECT r.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_article AS r INNER JOIN xzqa_author AS u ON author_id = u.id WHERE r.id=?';
  // 执行SQL查询
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    //results代表的返回的结果集,为数组类型;同是在该数组中包含了一个
    //对象,该对象就是文章的详细信息,在使用时,无需返回数组可直接返回对象
    //所以results[0]代表的就是文章详细信息的对象
    //results此时的结果如 [{id:1,subject:'AA',nickname:'淘气的松鼠'}]
    res.send({ message: '查询成功', code: 1, articleInfo: results[0] });
  });

});

// 用户注册的接口
server.post('/register', (req, res) => {
  //console.log(md5('12345678')) ;
  //获取用户名和密码
  let username = req.body.username;
  let password = req.body.password;
  // console.log(username,password);
  //查找用户是否存在
  let sql = 'SELECT COUNT(id) AS count FROM xzqa_author WHERE username=?';
  pool.query(sql, [username], (error, results) => {
    if (error) throw error;
    //如果用户不存在,则插入记录
    if (results[0].count == 0) {
      sql = 'INSERT INTO xzqa_author(username,password) VALUES(?,MD5(?))';
      pool.query(sql, [username, password], (error, results) => {
        if (error) throw error;
        res.send({ message: '注册成功', code: 1 });
      })
    } else { //否则产生合理的错误提示
      res.send({ message: '用户已存在', code: 0 });
    }
  })
});


//用户登录的接口
server.post('/login', (req, res) => {
  //获取用户名和密码
  let username = req.body.username;
  let password = req.body.password;
  //以用户名和密码为条件进行查找
  let sql = 'SELECT id,username,avatar,article_number,nickname FROM xzqa_author WHERE username=? AND password=MD5(?)';
  pool.query(sql, [username, password], (error, results) => {
    if (error) throw error;
    if (results.length == 0) {
      res.send({ message: '登录失败', code: 0 });
    } else {
      res.send({ message: '登录成功', code: 1, userInfo: results[0] });
    }
  });

});

server.get('/data',(req,res)=>{
  //假设该数据为数据库服务器返回的数据 
  let object = {
    productName:'SHARP夏普超大屏商用电视广告机4K显示器120英PN-H120',
    salePrice:900000
  };
  res.send({message:'查询成功',code:1,results:object});
});

//获取文章详细信息(包括标题,正文,作者等)
server.get('/details',(req,res)=>{
  let id = req.query.id;
  console.log(id);
  let sql = 'SELECT r.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_article AS r INNER JOIN xzqa_author AS u ON author_id = u.id WHERE r.id=?';
  pool.query(sql,[id],(error,results)=>{
    if(error) throw error;
    res.send({message:'查询成功',code:1,articleInfo:results[0]});
  });
}); 


// 指定WEB服务器监听的端口333333(端口号在客户端已经设置好了,axios里面设置的 )
server.listen(3000);

