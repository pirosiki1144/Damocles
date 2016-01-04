var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dateutils = require('date-utils');

// DB Connect
// Scheme Definition


var MemoSchema = new mongoose.Schema( {
    title: String,
    body: String,
    metadata: {
        insert_user: String,
        insert_date: String,
        update_user: String,
        update_date: String    
    }
}, { collection: 'DMCL001M' }); // Collection名を不可算名詞に設定する。


// モデルとして登録
var Memo = mongoose.model('DMCL001M', MemoSchema);

// mongodbに接続
mongoose.connect('mongodb://localhost:27017/DAMOCLESDB'); // memoの部分はデ ータベース名

var tmpmemo = new Memo();

da = new Date();
//MongodbではUTCのみ扱える。明示的にJST->UTCに変換したほうがよい。
//今回はString型でJSTとして扱う。
var daa = da.toFormat("YYYY-MM-DDTHH24:MI:SS+09:00");


tmpmemo.title = 'title' + daa;
tmpmemo.body = 'body' + daa;
tmpmemo.metadata.insert_user = 'debug';
tmpmemo.metadata.insert_date = daa;
tmpmemo.metadata.update_user = 'debug';
tmpmemo.metadata.update_date = daa;





tmpmemo.save(function (err) {
    if (err) { console.log(err) }
});


// findしてコンソールに出力
Memo.find({}, function (err, docs) {
    if (!err) {
        var hoge="";
        console.log('num of item => ' + docs.length)
        for (var i = 0; i < docs.length; i++) {
            console.log(docs[i]);
            hoge = hoge + docs[i];
        }
        
        
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express', document: docs });
        });
        

        mongoose.disconnect()  // mongodbへの接続を切断
        return hoge;
        //process.exit()         // node.js終了
    } else {
        console.log("find error")
    }
});





module.exports = router;
