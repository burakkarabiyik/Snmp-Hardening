
var communityvarmi=require('./community');
var snmpvarmi=require('./snmpvarmi');
var sendsnmp =require('./sendsnmp');
var komutyolla =require('./komutyolla');
var topluluk =require('./topluluksorgula');
var dbs =require('./giris');
var ciscoparse = require('./snmpsorgu');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = ciscoparse.parse();
var fs = require('fs');
var sirala=function(callback1,callback2,callback3,callback4,komut,community,ip,telnet,konsol,callback)
{

   callback1(ip,telnet,konsol,function(err,result1){
     if(err)
     {
callback("nosnmp","error2");
     }
     else {
       callback2(ip,telnet,konsol,function(err,result2){
         if(err){
callback("error","error");
         }
         else {
           callback3(komut,community,ip,function(err,result3)
         {
           if(err)
           {
callback("error","error");
           }else {
             callback4(function(err,result4){
               if(err){
callback("error","error");
               }else {
                  parser.trap(function(err,result5){
                    if(err){
                        return "hata";
                    }else {
                      callback(null,"");
                    }

                  });
               }

             })
           }

         })
         }
       });
     }
   });




}




//snmpbulkget -c public -v 2c 192.168.60.1 1.3.6.1.2.1.11.19
//snmpbulkwalk -c public -v 2c 192.168.60.1  1.3.6.1.2.1.11.19

// trap snmpwalk -Os -c public -v 1 192.168.60.1 1.3.6.1.2.1.11.30



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var pass = 'SiberLab1!\n' // this is a working user
var inspect = require('util').inspect;

app.use(bodyParser.json());

var telnetsifre;
var konsolsifre;
var cihazip;
app.post('/giris',function(req,res){
 cihazip=req.body.ip;
 konsolsifre=req.body.konsol;
 telnetsifre=req.body.telnet;

  sirala(snmpvarmi,communityvarmi,sendsnmp,topluluk,"1.3.6.1.2.1.1.5.0","public",req.body.ip,req.body.telnet,req.body.konsol,function(err,resultt){
    if(err)
    {
      if(err=="nosnmp")
      {
        res.send("nosnmp");
      }
    }else {
      if(resultt=='error')
      {
         res.send('hata2');
      }
      else {
         res.send('true');
         conn.write(telnetsifre+"\n"+"enable"+"\n"+konsolsifre+"\nterminal length 0\n");

      }
    }
  });
});
app.post('/tekrarla',function(req,res){


  sirala(snmpvarmi,communityvarmi,sendsnmp,topluluk,"1.3.6.1.2.1.1.5.0","public",cihazip,telnetsifre,konsolsifre  ,function(err,resultt){
    if(err)
    {
      res.send('hata');
    }else {
      if(resultt=='error')
      {
         res.send('hata');
      }
      else {
         res.send('true');
      }
    }
  });
});



var html = fs.readFileSync('./hata.html', 'utf8')

 app.post('/hata',function(req,res){

   var db=require('monk')('mongodb://localhost:27017/mydb');


   var user=db.get('hatalar');

   user.find({},function(e,docs){

     res.send(docs);

   });
 });


 app.get('/komutyolla',function(req,res){

    var html = fs.readFileSync('./komutyolla.html', 'utf8')
 res.send(html);

 });

 app.get('/hata',function(req,res){

    var html = fs.readFileSync('./hata.html', 'utf8')
 res.send(html);

 });
//--------------------------------------------------------------------------------------------------------


var fs = require('fs');
var uzunluk=true;
var olustur=true;
var net = require('net');
var conn = net.connect(23, '192.168.1.1');     // Bağlantı İp adresi
var inspect = require('util').inspect;

conn.setEncoding('utf-8');

app.use(bodyParser.json());

conn.on('connect', function() {
  cagir();

  // As soon as we connect, we log it
});


 var cagir=function(){
  fs.writeFile('komutlar.html', "", function (err) {
    if (err) throw err;
})
 };


conn.on('data', function(data) {


     oku();


     if(data!="��������")
      fs.appendFile('komutlar.html', data, function (err) {
        if (err) throw err;
      });





     if (data.indexOf('Password') != -1) {


     }else if (data.indexOf('CiscoLab>') != -1) {


     }
     else if(data.indexOf('CiscoLab#')!= -1)
     {
          if(uzunluk)
          {
              conn.write("terminal length 0"+"\n");
              uzunluk=false;
          }




     }
  });
  var html;

  //////////////////////////////////////////////////////////////////////////////

  var oku=function(callback)
  {
 html=fs.readFileSync('./komutlar.html','utf8');
    if(html.search("User Access Verification")!="-1")
    {
      cagir();
    }
    if(html.search("CiscoLab#terminal length 0")!="-1")
    {
      cagir();
    }

  }
  app.post('/gonderdim',function(req,res){
    var komut=req.body.command;
    conn.write(komut+"\n");

  oku();
    res.send(html);
    cagir();
})

app.post('/komutyolla',function(req,res) {

 oku();
 res.send(html);
 })
 app.post('/komutgonder',function(req,res) {
   var gelen=req.body.komut;
   komutyolla(cihazip,telnetsifre,gelen,konsolsifre,function(err,result){
     res.send("true");
   });

  })


//---------------------------------------------------------------------------------------------------------

var PORT=process.env.PORT ||3000;
 app.use(express.static(__dirname));

 app.listen(PORT,function(){


 });
 app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  });
