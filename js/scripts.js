$(function(){
    $("#yolla").on("submit",function(event){
        event.preventDefault();
        var komut =$("#commands");
        var alici=$("#alici");
        var ekran;
         $.ajax({
             url:'/gonderdim',
             method:'POST',
             data:JSON.stringify({command:komut.val()}),
             contentType:'application/json',
             success: function(response){
                //  alici.html("");
                 // alert(response);
                 // alici.append(response);
                 // console.log(JSON.stringify(response));


                 window.setInterval(function(){

                    $("#alicim").trigger('click');

                 },100)


             } ,
             complete:function(){

             }
         })
    })


        $("#cevapla").on("submit",function(event){
            event.preventDefault();
            var komut =$("#commands");
            var alici=$("#alici");
            var ekran;
             $.ajax({
                 url:'/komutyolla',
                 method:'POST',
                 data:JSON.stringify({command:komut.val()}),
                 contentType:'application/json',
                 success: function(response){

                    alici.html("");
                      alici.append("komut:"+response);
                      console.log(JSON.stringify(response));
                      var str=response.search("switchport port-security");
                      if(str=-1)
                      {
                        $("#hata").html("Port Security yapılmamış.");
                        $("#hatan").css("display","flex");
                        $("#hatann").css("display","flex");
                        $("#hatann").css("text-align","center");
                      }
                      else
                      {
                        $("#hata").html("Port Security yapılmış.");
                        $("#hatan").css("display","flex");
                        $("#hatann").css("display","flex");
                        $("#hatann").css("text-align","center");
                      }
                 } ,
                 complete:function(){
                 }
             })
        })


})

function gonder(deger)
{ $(function(){


        var ekran;
        $.ajax({
            url:'/hazirkod',
            method:'POST',
            data:JSON.stringify({command:deger}),
            contentType:'application/json',
            success: function(response){
                window.setInterval(function(){

                 $("#alicim").trigger('click');

                }, 1);

            } ,
            complete:function(){

            }
        })


})
}
