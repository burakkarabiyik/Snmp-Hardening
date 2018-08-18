
$(function()
{



    //--------------------------------------------------------------------------------------------------------------------------
    $("#slick-login").on("submit",function(event){
        event.preventDefault();
        var ip =$("#ip");
        var telnetsifresi=$("#telnetsifresi");
        var konsolsifresi=$("#konsolsifresi");
      //  alert("Cihazla Eşleşiliyor .........");
         $.ajax({
             url:'/giris',
             method:'POST',
             data:JSON.stringify({ip:ip.val(),telnet:telnetsifresi.val(),konsol:konsolsifresi.val()}),
             contentType:'application/json',
             success: function(response){
                
                if(response=='true')
                {
              //  alert("Cihazla Eşleşildi .........");
                  window.location = "./komutyolla";
                }
                else if(response=='nosnmp')
                {
                  alert("SNMP Kullanılmamaktadır");
                      window.location = "./komutyolla";
                }
                else {

                  alert("Cihazla Eşleşme hatalı .........");
                }
             } ,
             complete:function(){

             }
         });

    })




});
