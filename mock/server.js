
let express = require('express');
let Mock = require('mockjs');
let app = express();
let Data=require('./data.json');

/*首页*/
app.get('/test',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Mock.mock({
        code:0,
        data:Data.main
    }));
});
/*主分类*/
app.get('/test/serverice/:id',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    var id = req.params.id;
    res.send(Mock.mock({
       code:0,
       data:Data.main[id]
    }));
});
/*二级分类*/
app.get('/test/serverice/:id/:sort',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    var sort = req.params.sort;
    var id = req.params.id;
    var type=[];
    if(sort=='全部'){
        type=Data.main[id].serverice;
    }else{
        Data.main[id].serverice.forEach(item =>{
            if(item.type===sort){
                type.unshift(item);
            }
        });
    }
    res.send(Mock.mock({
        code:0,
        data:type
    }))
});
/*详情页*/
app.get('/test/detail/:id',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var msg=[];
    var id = req.params.id;
	let msg1=Data.serverices.find(item =>{
           return item.detailId==id
       });
    msg.push(msg1);
    res.send(Mock.mock({
       code:0,
       data:msg
    }));
});
/*服务商*/
app.get('/test/servers',function (req,res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Mock.mock({
        code:0,
        data:Data.servericeShops
    }))
});
/*服务商详情页*/
app.get('/test/servers/:shop',function (req,res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var shop = req.params.shop;
    var shops=[];
    var msg=Data.servericeShops.find(item =>{
        return item.shop==shop
    });
    shops.push(msg);
    res.send(Mock.mock({
        code:0,
        data:shops
    }))
});
/*登录*/
app.get('/login',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    var username=req.query.username;
    var password=req.query.password;
    let result=Data.user.findIndex(item => {
       return  item.username===username && item.pw===password;
    });
	console.log(result);
      if(result===-1){
          res.send('0')
      }else{
          res.send('1')
      }

});
/*注册*/
app.get('/register',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    let username=req.query.username;
    let passWord=req.query.password;
    console.log(username,passWord);
    let User={
        username:username,
        pw:passWord
    };
    Data.user.push(User);
    res.send("注册成功");
});
/*获取用户信息*/
app.get('/test/user',function (req,res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Mock.mock({
        code:0,
        data:Data.user
    }));
});
app.listen('5000');