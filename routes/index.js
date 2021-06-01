var express = require('express');
var router = express.Router();
var{Client}=require('pg');  //データベースを使うための宣言
const dbpassword = process.env.DBPW //DBを使うのに必要
const apiKey = process.env.APIKEY //APIkeyを使うのに必要

var today=new Date();
var tmonth;
var lmonth;
if(today.getDate()>20){
  tmonth=today.getMonth()+2;
  lmonth=today.getMonth()+1;
}else{
  tmonth=today.getMonth()+1;
  lmonth=today.getMonth();
}
var id=[];
var date0=[];
var month=[];
var date=[];
var shuppatsu=[];
var totyaku=[];
var keiyu=[];
var shudan=[];
var money=[];
var times=[];
var job=[];
var memo=[];
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
client.connect(async function(err, client) {
  if (err) {
    console.log(err); //エラー時にコンソールに表示
  } else {
    client.query('SELECT * FROM kotsuhi_memo', function (err, result) {  //第１引数にSQL
     
      for(var i in result.rows){
        id[i]=result.rows[i].memo_no;
        date0[i]=result.rows[i].memo_ymd;
        month[i]=date0[i].getMonth()+1;
        date[i]=date0[i].getDate();
        shuppatsu[i]=result.rows[i].shuppatsu_nm;
        totyaku[i]=result.rows[i].totyaku_nm;
        keiyu[i]=result.rows[i].keiyu_nm;
        shudan[i]=result.rows[i].shudan_nm;
        money[i]=result.rows[i].memo_kingaku;
        times[i]=result.rows[i].times;
        job[i]=result.rows[i].job_memo;
        memo[i]=result.rows[i].biko_memo;
      }
      
    });
  }
});
res.render('index', {
  title: '交通費メモ',
  tmonth:tmonth,
  lmonth:lmonth,
  id:id,
  date:month+'/'+date,
  shuppatsu: shuppatsu, //引き出したデータ
  totyaku:totyaku,
  keiyu:keiyu,
  shudan:shudan,
  money:money,
  times:times,
  job:job,
  memo:memo
});

});

router.post('/',function(req,res,next){
  var id1=req.body.id;
  console.log(req.body);
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'ex_support',
    password:dbpassword,
    port:5432
});
/* ここでデータベースにアクセスする */
client.connect( function(err, client) {
  client.query("update kotsuhi_memo set times=times+1,biko_memo=biko_memo+"+today.getMonth()+"/"+today.getDate()+" where id="+id1);
  if (err) {
    console.log(err); //エラー時にコンソールに表示
  } else {
    client.query('SELECT * FROM kotsuhi_memo', function (err, result) {  //第１引数にSQL
      var id=[];
      var date0=[];
      var month=[];
      var date=[];
      var shuppatsu=[];
      var totyaku=[];
      var keiyu=[];
      var shudan=[];
      var money=[];
      var times=[];
      var job=[];
      var memo=[];
      for(var i in result.rows){
        id[i]=result.rows[i].memo_no;
        date0[i]=result.rows[i].memo_ymd;
        month[i]=date0[i].getMonth()+1;
        date[i]=date0[i].getDate();
        shuppatsu[i]=result.rows[i].shuppatsu_nm;
        totyaku[i]=result.rows[i].totyaku_nm;
        keiyu[i]=result.rows[i].keiyu_nm;
        shudan[i]=result.rows[i].shudan_nm;
        money[i]=result.rows[i].memo_kingaku;
        times[i]=result.rows[i].times;
        job[i]=result.rows[i].job_memo;
        memo[i]=result.rows[i].biko_memo;
      }
      res.render('index', {
        title: '交通費メモ',
        id:id,
        date:month+'/'+date,
        shuppatsu: shuppatsu, //引き出したデータ
        totyaku:totyaku,
        keiyu:keiyu,
        shudan:shudan,
        money:money,
        times:times,
        job:job,
        memo:memo
      });
      // console.log(result); //コンソール上での確認用なため、この1文は必須ではない。
    });
  }
});

});

module.exports = router;

