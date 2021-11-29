
   var socket = io("http://localhost:5000")
 
   var receiver = ""
   var sender = ""
   //listening private message
   socket.on("new-message-private",(data)=>{
    $(".container-chat").show()
    receiver =  data.sender
    $('#chat-content').append('<h6 class="nameUser">'+ data.sender+':'+'<span class="text-message">'+ data.message+'</span></h6>')
    //listening focus
    socket.on('server-send-user-write',(data)=>{
      $('#notification-focus').html(data +": "+"<img class='image-infor-focus' src='../img/img.gif' >")
  })
     //stop focus
     socket.on('server-send-user-write-stop',()=>{
      $('#notification-focus').html('')
  })
  })
   $(document).ready(()=>{
        sender = $("#username").text()
        socket.emit("user-name",$("#username").text())
        $(".container-chat").hide()
        //close box chat when reload
          $(".collection-item").click(function(event){
              receiver =$(this).text()
            socket.emit("revider",$(this).text())
                 $(".container-chat").show()
          })
          //close box chat
          $("#close-boxchat").click(()=>{
              $(".container-chat").hide()
          })
          //send message 
          $('#send-message').click(()=>{
            var message =$('#message-inbox').val()
            socket.emit("content-message",{ 
              message  : message,
              receiver  : receiver,
              sender : sender
            })
            $('#chat-content').append('<h6 class="nameUser">'+"Me"+':'+'<span class="text-message">'+ message+'</span></h6>')
            $('#message-inbox').val(" ") 
            })
            // focusout input , when sender writing 
            $('#message-inbox').focusin(()=>{   
              socket.emit('user-writing', sender)
          })
           // stop focusout input
          $('#message-inbox').focusout(()=>{
            socket.emit('user-write-stop')
        })
        })
     