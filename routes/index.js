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
var id2=[];
var date02=[];
var month2=[];
var date2=[];
var shuppatsu2=[];
var totyaku2=[];
var keiyu2=[];
var shudan2=[];
var money2=[];
var times2=[];
var job2=[];
var memo2=[];
/* GET home page. */
router.get('/', async function(req, res, next) { 
  /* データベース呼び出しのための宣言（恐らくこれでuser_dataとkotsuhi_memoの両方使える） */
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'ex_support',
    password:'shoji2324',
    port:5432,
    dateStrings:'date'
});

/* ここでデータベースにアクセスする */
client.connect(async function(err, client) {
  if (err) {
    console.log(err); //エラー時にコンソールに表示
  } else {
    client.query("SELECT * FROM kotsuhi_memo WHERE ptn_toroku_flg = 1", function (err, result) {  //第１引数にSQL
     
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
      console.log(date0);
    });
    client.query("SELECT * FROM kotsuhi_memo WHERE ptn_toroku_flg = 0", function (err, result) {  //第１引数にSQL     
      for(var i in result.rows){
        id2[i]=result.rows[i].memo_no;
        date02[i]=result.rows[i].memo_ymd;
        month2[i]=date02[i].getMonth()+1;
        date2[i]=date02[i].getDate();
        shuppatsu2[i]=result.rows[i].shuppatsu_nm;
        totyaku2[i]=result.rows[i].totyaku_nm;
        keiyu2[i]=result.rows[i].keiyu_nm;
        shudan2[i]=result.rows[i].shudan_nm;
        money2[i]=result.rows[i].memo_kingaku;
        times2[i]=result.rows[i].times;
        job2[i]=result.rows[i].job_memo;
        memo2[i]=result.rows[i].biko_memo;
      } 
      console.log(date02);     
    });
    let opt={
      title: '交通費メモ',
      tmonth:tmonth,
      lmonth:lmonth,
      id:id,
      month:month,
      date:date,
      date0:date0,
      shuppatsu: shuppatsu,
      totyaku:totyaku,
      keiyu:keiyu,
      shudan:shudan,
      money:money,
      times:times,
      job:job,
      memo:memo,
      id2:id2,
      month2:month2,
      date2:date2,
      date02:date02,
      shuppatsu2: shuppatsu2,
      totyaku2:totyaku2,
      keiyu2:keiyu2,
      shudan2:shudan2,
      money2:money2,
      times2:times2,
      job2:job2,
      memo2:memo2
    }
    res.render('index', opt);
  }
});
});

//+1を押すとき
router.post('/',async function(req,res,next){
  let id3=req.body.id;
  let shuppatsu3=req.body.shuppatsu;
  let totyaku3=req.body.totyaku;
  let shudan3=req.body.shudan;
  let money3=req.body.money;
  let times3=req.body.times;
  let job3=req.body.job;
  let memo3=req.body.memo;
  console.log(id3+shuppatsu3+totyaku3+shudan3+money3+times3+job3+memo3);
  var client=new Client({
    user:'postgres',
    host:'localhost',
    database:'ex_support',
    password:'skylight',
    port:5432
});
/* ここでデータベースにアクセスする */
client.connect(async function(err, client) {
  if (err) {
    console.log(err); //エラー時にコンソールに表示
  } else {
    // client.query("UPDATE kotsuhi_memo SET times=times+1 AND biko_memo=biko_memo+ ,"+today.getMonth()+"/"+today.getDate()+" where memo_no="+id2);
    client.query("UPDATE kotsuhi_memo SET times=times+1 WHERE memo_no="+id3);
    client.query("SELECT * FROM kotsuhi_memo WHERE ptn_toroku_flg = 1", function (err, result) {  //第１引数にSQL
     
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
    await client.query("SELECT * FROM kotsuhi_memo WHERE ptn_toroku_flg = 0", function (err, result) {  //第１引数にSQL     
      for(var i in result.rows){
        id2[i]=result.rows[i].memo_no;
        date02[i]=result.rows[i].memo_ymd;
        month2[i]=date02[i].getMonth()+1;
        date2[i]=date02[i].getDate();
        shuppatsu2[i]=result.rows[i].shuppatsu_nm;
        totyaku2[i]=result.rows[i].totyaku_nm;
        keiyu2[i]=result.rows[i].keiyu_nm;
        shudan2[i]=result.rows[i].shudan_nm;
        money2[i]=result.rows[i].memo_kingaku;
        times2[i]=result.rows[i].times;
        job2[i]=result.rows[i].job_memo;
        memo2[i]=result.rows[i].biko_memo;
      }      
    });
    let opt={
      title: '交通費メモ',
      tmonth:tmonth,
      lmonth:lmonth,
      id:id,
      month:month,
      date:date,
      date0:date0,
      shuppatsu: shuppatsu,
      totyaku:totyaku,
      keiyu:keiyu,
      shudan:shudan,
      money:money,
      times:times,
      job:job,
      memo:memo,
      id2:id2,
      month2:month2,
      date2,date2,
      date02:date02,
      shuppatsu2: shuppatsu2,
      totyaku2:totyaku2,
      keiyu2:keiyu2,
      shudan2:shudan2,
      money2:money2,
      times2:times2,
      job2:job2,
      memo2:memo2
    }
    res.render('index', opt);
  }
});
});

//詳細を押すとき
router.post('/detail',async function(req,res,next){
  let id=req.body.id;
  let shuppatsu=req.body.shuppatsu;
  let totyaku=req.body.totyaku;
  let shudan=req.body.shudan;
  let money=req.body.money;
  let times=req.body.times;
  let job=req.body.job;
  let memo=req.body.memo;
  console.log(id+shuppatsu+totyaku+shudan+money+times+job+memo);
  res.render('detail', {
    title: '詳細ページ',
    message: '各項目を入力してください',
    price: 'ここに料金を表示'
  });
});

module.exports = router;
