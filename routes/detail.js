//const {json} = require('express');
//const {Router} = require('express');
//const { render } = require('ejs');
const { response } = require('express');
var express = require('express');
var router = express.Router();
//const request = require('request');
//const { render } = require('../app');
//const app = express();
//const {post} = require('./routes');
//const {route} = require('.');
const fetch = require('node-fetch');
var { Client } = require('pg');
//const FormData = require('form-data');
//DBを使うのに必要
//const dbpassword = process.env.DBPW 

//ページが読み込まれた際の初期画面
router.get('/',function(req, res,next){

    let opt = {
        title: '詳細ページ',
        message: '各項目を入力してください',
        price: 'ここに料金を表示'
    };
/*let date = req.body.date;
let routeStart = req.body.routeStart;
let routeGoal = req.body.routeGoal;
let routeWaypoint = req.body.routeWaypoint;*/
    res.render('detail', opt);

    //駅コード取得
    fetch('https://api.ekispert.jp/v1/json/station?key=test_VtL3kuyWkrB&name=%E9%98%BF%E4%BD%90%E3%83%B6%E8%B0%B7')
    .then(res =>res.text()) //データをテキストに変換
    .then(res => JSON.parse(res))   //json形式のテキストをオブジェクトに変換する
    .then(res =>console.log(res.ResultSet.Point[0].Station.code))
    .catch(err =>console.log('うんこ'));

    //単価を取得
    fetch('https://api.ekispert.jp/v1/json/search/course/extreme?key=test_VtL3kuyWkrB&viaList=22991:22741:22828')
    .then(res =>res.text()) //データをテキストに変換
    .then(res => JSON.parse(res))   //json形式のテキストをオブジェクトに変換する
    .then(res =>console.log(res.ResultSet.Course[0].Price[0].Oneway))
    .catch(err =>console.log('失敗'));
});

/*request用の部品を用意
var stationUrl;
let options = {
    method:'GET',
    url:stationUrl,
    json: true,
};*/

//検索ボタンが押された瞬間に実行
router.post('/',function(req,response,next){

    //各種API・パラメータの定義
    let baseUrl = 'https://api.ekispert.jp/v1/json/';   //すべてのベースURL
    let seachUrl = 'search/course/extreme?';//単価調べる用の部品URL
    let codeURl = 'station?';   //駅名を駅コードに変換する用の部品URL
    let accessKey = 'key=test_VtL3kuyWkrB'; //アクセスキーの定義  

    //フォームの入力内容を定義
    let stationStart ='&name=' +req.body.routeStart;
    let stationWaypoint ='&name=' +req.body.routeWaypoint;
    let stationGoal ='&name=' +req.body.routeGoal;

    //駅コード取得のための完成URL
    let searchCodeStart = `${baseUrl}${codeURl}${accessKey}${stationStart}` ;
    let searchCodeWaypoint = `${baseUrl}${codeURl}${accessKey}${stationWaypoint}` ;
    let searchCodeGoal = `${baseUrl}${codeURl}${accessKey}${stationGoal}` ;
    
    //取得した駅コードを単価検索用に連結
    let stationPrice ='&viaList=' +'ここに駅コード' +':' +'ここに駅コード'  +':' +'ここに駅コード' ;

    //単価検索用の完成URL
    let searchPrice = `${baseUrl}${seachUrl}${accessKey}${stationPrice}`; 

    //console.log(searchPrice);
    console.log(searchCodeStart);

    //let resData = res;

    //APIの呼び出しをして、返り値をdetail.ejsにrender
    fetch('https://api.ekispert.jp/v1/json/search/course/extreme?key=test_VtL3kuyWkrB&viaList=22991:22741:22828')
        .then(res =>res.text()) //データをテキストに変換
        .then(res => JSON.parse(res))   //json形式のテキストをオブジェクトに変換する
        .then(res =>{
            //async function sample(){
            //let  priceData  = res.ResultSet.Course[0].Price[0].Oneway;
            var priceData1=[];
            var priceData2=[];
            for(let i in res.ResultSet.Course){
                priceData1[i]  = res.ResultSet.Course[i].Price;
                console.log(i+priceData1[i]);
                /*for(let j in res.ResultSet.Course.Price){
                    priceData2  = priceData1.Price[j].Oneway;
                    console.log(priceData2[j]);
                }*/
            }
            for(let i in priceData1.Price){
            priceData2[i] = priceData1.Price[i];
            };
            console.log(priceData2);
            let opt = {
                title: '詳細ページ',
                message: '各項目を入力してください',
                price: priceData2[0]
                //price:'ここにAPIの戻り値を入力したい'
            };
            response.render('detail',opt);
        })
        .catch(err =>{
            console.log('失敗')});
})

    /*requestをAPIに送る・受け取る
    request.get(options,function(err,req,data){

        let opt = {
            price: data.ResultSet.Course.Price.Oneway,
            title: '詳細ページ',
            message: '各項目を入力してください'
        }
        res.render('detail', opt);
    });*/


/*
const formid = document.getElementById('formid');
formid.addEventListener("submit", function(e){
    
    e.preventDefault();

    fetch(stationURL)
        .then(res =>{
            //responseオブジェクトから単価を取得
            document.getElementById('price').textContent = res.items[0].ResultSet.Course.Price.Oneway;})
        .catch(err =>{
            document.getElementById('price').textContent = '料金を算出できませんでした。'});
});*/

module.exports = router;
