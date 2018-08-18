module.exports=function functionName(callback) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
var fs = require('fs');
var topluluk =fs.readFileSync('./topluluklar.txt','utf8');
var topluluklar = topluluk.split("\n") ;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var dbo2 = db.db("mydb");
dbo2.collection("hatalar").remove({hatakodu:"community"});
dbo2.collection("hatalar").remove({hatakodu:"Yetki"});
});

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var dbo2 = db.db("mydb");
    dbo.collection("snmp").find({}).toArray(function(err, result) {
      if (err) throw err;
      var length=result.length*topluluklar.length;

      var sira=0;
      for (var i = 0; i < result.length; i++) {
      for (var k = 0; k < topluluklar.length; k++) {

        if(result[i].community==topluluklar[k])
        {

          var topluluuk=result[i].community;

            var sebebi=topluluuk+" adlı community kullanılmamalıdır";
            var myquery = { sebep:sebebi};
            var newvalues = { $set: {hatakodu: "community",hata: topluluuk, sebep: topluluuk+" adlı community kullanılmamalıdır" } };

            dbo2.collection("hatalar").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
              if (err) throw err;

            });

        }

        sira++;
      }
      if(result[i].yetki=="RW")
     {
       var topluluuk=result[i].community;

         var sebebi=topluluuk+" adlı community RW kullanılmamalıdır";
         var myquery = { sebep:sebebi};
         var newvalues = { $set: {hatakodu: "Yetki",hata: topluluuk, sebep: sebebi } };

         dbo2.collection("hatalar").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
           if (err) throw err;

         });
     }

      if(length==sira)
      {
        callback(null,"");
        break;
        //yönlendirme
      }
      }

    });



});
}
