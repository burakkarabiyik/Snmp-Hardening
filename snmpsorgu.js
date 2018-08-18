
function snmpsorgu(data,callback) {
 if (!(this instanceof snmpsorgu)) {
   return new snmpsorgu(data);
 }

 this.data = data;
}

exports.parse = snmpsorgu;

// Returns the device type: IOS or NX-OS.
snmpsorgu.prototype.trap = function (callback) {
  var snmp = require('snmp-native');
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  var session = new snmp.Session({ host: '192.168.60.1', port: 161, community: 'public' });

  session.getNext({ oid: [1,3,6,1,2,1,11,30] }, function (error, varbinds) {
      if (error) {
          console.log('Fail :(');
      } else {
          if(varbinds[0].value==1)
          {
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo2 = db.db("mydb");
             dbo2.collection("hatalar").remove({hatakodu:"traps"});
          });

          callback(null,"");
        }
          else {
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;

            var dbo2 = db.db("mydb");
                        var sebebi="traps not enable";
                        var myquery = { sebep:sebebi};
                        var newvalues = { $set: {hatakodu: "traps",hata:"traps", sebep: sebebi } };

            dbo2.collection("hatalar").updateOne(myquery, newvalues,{upsert:true}, function(err, res) {
              if (err) throw err;
              callback(null,"");
            });
          });
          }
      }
      session.close();
  });


}
