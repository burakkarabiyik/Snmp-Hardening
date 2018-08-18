

  module.exports=function functionName(ip,telnet,komut,konsol,callback) {

      var topluluk =require('./topluluksorgula');
    var bodyParser = require('body-parser');

    var pass = 'SiberLab1!\n' // this is a working user
     var net = require('net');
    var conn = net.connect(23, ip);



    conn.setEncoding('utf-8');

    var telnetdegeri;
    conn.on('connect', function() {
     console.log("Komut Gönderme Başladı");

     cagir();
    });

    conn.on('end', function(data) {

      });
      conn.on('error', function(data) {
        console.log("cihazla bağ kesildi");
        });
     var cagir=function(){

       conn.write(telnet+"\n"+"enable"+"\n"+konsol+"\n"+"terminal length 0"+"\n"+komut+"\n"+"do wr mem\nexit\nexit\n");
callback(null,"");
     };
     conn.on('data', function(data) {










       });

    }
