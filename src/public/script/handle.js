
var socket = io("http://localhost:5000")
var receiver = ""
var sender = ""
    //client listening sign from server
    socket.on('Server-fail-regsiter',(data)=>{
            alert(data)
    })
    socket.on('Server-success-regsiter',(data)=>{
        $("#username").html(data)
        $(".login").hide(3000)
        $(".chatForm").show(1000)
    })

    socket.on('Server-send-list-users',(data)=>{
        $('.list-group').html("")
        data.forEach((index)=>{
            $('.list-group').append(`<button onclick="onUserSelected('${index}')">${index}</button>`)
        })
    })
    socket.on('server-send-message',(data)=>{
        $('#chatMessage').append('<h6 class="nameUser">'+ data.un+':'+'<span class="text-message">'+ data.txt+'</span></h6>')
    })
    //receive user writing
    socket.on('server-send-user-write',(data)=>{
        $('#notification').html(data +": "+"<img class='image' src='img.gif' >")
    })
    socket.on('server-send-user-write-stop',()=>{
        $('#notification').html('')
    })
    //listening private chat
    socket.on("new-message-private",(data)=>{
        $(".chatFormPrivate").show()
        $('#chatMessage-private').append('<h6 class="nameUser">'+ data.sender+':'+'<span class="text-message">'+ data.message+'</span></h6>')
    })
    //get username when click
    function onUserSelected(data){
        //save receiver
        receiver  = data
        $(".chatFormPrivate").show()
        $(".login").hide()
        $('#username-private').html(receiver)
    }
    $(document).ready(function(){
        alert("hello")
        $(".chatFormPrivate").hide()
        $(".login").show()
        $(".chatForm").hide()
       
      
        $("#register").click(()=>{
            socket.emit("client-send-Username",$('#txtUsername').val());
            //save sender
            sender = $('#txtUsername').val()
        })
        
        //login 
        $('#clientLogout').click(()=>{
            socket.emit('logout')
            $(".chatForm").hide(3000)
            $(".login").show(1000)
        })
        //send message to server
        $('#txtSendMessage').click(()=>{
            socket.emit('user-send-message',$('#message').val())
        })

        $('#message').focusin(()=>{
            
            socket.emit('user-write')
        })
        $('#message').focusout(()=>{
           
            socket.emit('user-write-stop')
          
        })
        //private chat
        //open windown private chat
        $(".list-group-item").click(function(){
            alert($(this).html());
          });
        $("#btnSendMessage-private").click(function(){
            var message = $('#message-private').val()
            // alert(message + "--sender : " + sender +"--receiver : " + receiver)
            socket.emit("send-message-private",{
                message: message,
                sender: sender,
                receiver: receiver
            })
            $('#chatMessage-private').append('<h6 class="nameUser">'+"Me"+':'+'<span class="text-message">'+ message+'</span></h6>')
        })
        
  });

