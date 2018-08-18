module.exports=function functionName(ip,telnet,konsol,callback) {

  var topluluk =require('./topluluksorgula');
    var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://127.0.0.1:27017/";

var bodyParser = require('body-parser');

var pass = 'SiberLab1!\n' // this is a working user
 var net = require('net');
var conn = net.connect(23, ip);



conn.setEncoding('utf-8');

var telnetdegeri;
conn.on('connect', function() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
  dbo.collection("snmp").remove({});

});
  telnetdegeri="";
cagir();
conn.write("exit\nexit\n")
  // As soon as we connect, we log it
});
conn
conn.on('end', function(data) {
callback(null,"");

  });
 var cagir=function(){

   conn.write(telnet+"\n"+"enable"+"\n"+konsol+"\n"+"terminal length 0"+"\n"+"show run"+"\n");
 };
//////////////////////////////////////////////////////////////////////////////
 conn.on('data', function(data) {

   communityvarmi(data);

   });



  ////////////////////////////// kayıt


  var communitykaydet=function(a,b)
  {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = { community: a ,yetki:b};
      var newvalues = { $set: {community: a, yetki:b } };

      dbo.collection("snmp").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
        if (err) throw err;

      });
    });
  }
//////////////////////////////// Sorgula
var communityvarmi=function(data)
{
  var re = /snmp-server community (\w*) (\w*)/g;

        var match = re.exec(data);


   while(match!=null){

       communitykaydet(match[1],match[2]);
       match = re.exec(data);
     }



}
}
