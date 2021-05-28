var express = require('express');
var router = express.Router();
var{Client}=require('pg');  //データベースを使うための宣言
const dbpassword = process.env.DBPW //DBを使うのに必要
const apiKey = process.env.APIKEY //APIkeyを使うのに必要

/* GET home page. */
router.get('/', function(req, res, next) { 
  /* データベース呼び出しのための宣言（恐らくこれでuser_dataとkotsuhi_memoの両方使える） */
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'ex_support',
    password:dbpassword,
    port:5432
});
/* ここでデータベースにアクセスする */
client.connect( function(err, client) {
  if (err) {
    console.log(err); //エラー時にコンソールに表示
  } else {
    client.query('SELECT shuppatsu_nm FROM kotsuhi_memo', function (err, result) {  //第１引数にSQL
      res.render('index', {
        title: '交通費メモ',
        section1:'ユーザー登録データ',
        section2:'交通費データ',
        datas: result.rows[0].shuppatsu_nm, //引き出したデータ
      });
      console.log(result); //コンソール上での確認用なため、この1文は必須ではない。
    });
  }
});

});

module.exports = router;
