module.exports=function functionName(ip,telnet,konsol,callback) {
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
  dbo.collection("snmpvarmi").remove({});

});
  telnetdegeri="";
cagir();
conn.write("exit\nexit\n")
  // As soon as we connect, we log it
});

conn.on('end', function(data) {
callback(null,"");
  });

  conn.on('error', function(data) {
    console.log("hataaa");
callback(null,"error");
    });
 var cagir=function(){

   conn.write(telnet+"\n"+"terminal length 0"+"\nenable"+"\n"+konsol+"\n"+"terminal length 0"+"\n"+"terminal length 0"+"\n"+"terminal length 0"+"\n"+"show snmp"+"\n");
 };
//////////////////////////////////////////////////////////////////////////////
 conn.on('data', function(data) {

   badpass(data);
   snmpvarmi(data);
   snmpmi(data);
   });



  ////////////////////////////// kayıt
  var snmpkayit=function(v)
  {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myquery = { varmi: v};
      var newvalues = { $set: {varmi: v } };

      dbo.collection("snmpvarmi").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
        if (err) throw err;
        if(v=="var")
        {
          return true;
        }
        else
          false;
      });
    });
  }
//////////////////////////////// Sorgula
var badpass=function(data)
{
  var re=/(% Bad passwords)/g;
    var match=re.exec(data);

    while(match!=null)
    {
      callback("error","error");
      match=re.exec(data);
    }
}
var snmpvarmi=function(data)
{
  var re=/SNMP agent not enabled/g;
    var match=re.exec(data);

    while(match!=null)
    {
      snmpkayit("yok");
      match=re.exec(data);
      callback("error","error");
    }
}
var snmpmi=function(data)
{
  var re=/Contact: (\w*)/g;
    var match=re.exec(data);

    while(match!=null)
    {
      snmpkayit("var");
      match=re.exec(data);
    }
}
}
