var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '交通費メモ',section1:'ユーザー登録データ',section2:'交通費データ' });
});

module.exports = router;
