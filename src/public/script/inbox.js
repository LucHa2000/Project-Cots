
   var socket = io("http://localhost:5000")
   var userId = "MHzCsoPQkgWM2os8AAAB"
   socket.on('connect', function (data) {
    socket.id= userId;
    socket.connect();
});
   var receiver = ""
   var sender = ""
 
   $(document).ready(()=>{
    // alert( $(".collection-item").text())
  
    
        //close box chat when reload
        $(".container-chat").hide()
          // $(".container-chat").show()
          $(".collection-item").click(function(event){
            socket.emit("user-name",$(this).text())
            socket.emit("user-id",userId)
          })
          //close box chat
          $("#close-boxchat").click(()=>{
            $(".container-chat").hide()
          })
        })
     