var express = require('express');
var router = express.Router();
var {Client} = require('pg');  //データベースを使うための宣言
const dbpassword = process.env.DBPW //DBを使うのに必要
const apiKey = process.env.APIKEY //APIkeyを使うのに必要

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('pattern', { title: '移動パターン登録' });
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'ex_support',
    password:'shoji2324', // ここのPWはHerokuにUP後変更
    port:5432
  });
});



router.post('/', function(req, res, next) {
  var pattern_str = req.body["pattern"];
  var origin_str = req.body["origin"];
  var destination_str = req.body["destination"];
  var money_str = req.body["money"];

  var con = "tcp://postgres:shoji2324@localhost:5432/ex_support";
  pg.connect(con, function(err, client) {
      var qstr = "selcet from ex_support (pattern,origin,destination,money) values($1, $2, $3, $4);";
      var query = client.query(qstr,[pattern_str, origin_str, destination_str, money_str]);
      query.on('end', function(row,err) {
          response.redirect("/");
      });
      query.on('error', function(error) {
          console.log("ERROR!");
          response.render('pattern', {
              title: "ERROR",
              data: null,
              message: "ERROR is occured!"
          });
      });
  });
});

module.exports = router;