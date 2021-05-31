var express = require('express');
var router = express.Router();
var {Client} = require('pg');  //データベースを使うための宣言
const dbpassword = process.env.DBPW //DBを使うのに必要
const apiKey = process.env.APIKEY //APIkeyを使うのに必要

/* GET home page. */
router.get('/', function(req, res, next) { 
  // res.render('pattern', { title: '移動パターン登録' });
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'ex_support',
    password:dbpassword,
    port:5432
  });
// });



/* 移動パターン表示 */
client.connect( function(err, client) {
  if (err) {
    console.log(err); //エラー時にコンソールに表示
  } else {
    client.query('SELECT * FROM user_data', function (err, result) {  //第１引数にSQL
      res.render('pattern', {
        title: '移動パターン登録',
        datas: result.rows, //引き出したデータ
      });
    });
  }
});

});

module.exports = router;