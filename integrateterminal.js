
var fs = require('fs');
var server = http.createServer(app);
var uzunluk=true;
var olustur=true;
var net = require('net');
var conn = net.connect(23, '192.168.60.201');
var inspect = require('util').inspect;

conn.setEncoding('utf-8');

app.use(bodyParser.json());

conn.on('connect', function() {
  console.log('connected to the server');
  cagir();

  // As soon as we connect, we log it
});


 var cagir=function(){
  fs.writeFile('komutlar.html', "", function (err) {
    if (err) throw err;
})
 };


conn.on('data', function(data) {

     console.log('' + data.trim());
     oku();


     if(data!="��������")
      fs.appendFile('komutlar.html', data, function (err) {
        if (err) throw err;
      });





     if (data.indexOf('Password') != -1) {


       //conn.write(user+'\n');
       // Here comes second as the telnet server will send me 'username'
       // We write the user that we will use to authenticate
     }else if (data.indexOf('CiscoLab>') != -1) {


      //conn.write(enable+'\n');
       // After writing the user name, it enters here since it will ask for password.
       // Then, we write the password
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
////////////////////////////////////////////////////////////////////////
  app.post('/giris',function(req,res){
    var komut=req.body.sifre;
    conn.write(komut+"\n"+"enable"+"\n"+komut+"\n");

    oku();
    pass=komut;
    res.send(html);
  });
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
