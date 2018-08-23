var exprexx=require('express');
require('./db');
var Usere=require('./model/yonghu');
var app=exprexx();
//設置路由
//設置登陸路由
app.get( '/login',function (req,res) {

});
app.get('/regist',function (req,res) {
    var username=req.query.username;
    var pwd=req.query.pwd;
    var repwd=req.query.repwd;
    var email=req.query.email;
    if(pwd!==repwd){
        res.send('兩次密碼不一致');
        return;
    }
   var usernameReg=/^[A-Za-z_0-9]{5,10}$/
   var pwdReg=/^[a-zA-Z_0-9]{5,10}$/
   var emailReg=/^[a-zA-Z_0-9]{3,15}@[A-Za-z_0-9]{0,5}\.com$/
    if(!usernameReg.test(username)){
        res.send('用戶名不符合規範');
        return;
    }
    if(!pwdReg.test(pwd)){
        res.send('密码不符合规范');
        return;
    }
    if(!emailReg.test(email)){
        res.send('邮箱不符合规范');
        return;
    }
    Usere.findOne({username:username},function (err,data) {
        if(!err && !data ){
            Usere.create({username:username,pwd:pwd,emailReg:emailReg},function (err) {
                if(!err) res.send('注册成功');
                else console.log(err)
            })

        }else {
            res.send('用户名重复');
            return;

        }
    })


});
app.listen(3000,function (err) {
    if(!err)console.log('服务器启动成功')
    else console.log(err);
});
