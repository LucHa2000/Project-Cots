var socket = io("http://localhost:4000");

var receiver = "";
var sender = "";
//listening private emotion
socket.on("new-message-private-emotion", (data) => {
    $(".container-chat").show();
    receiver = data.sender;
    $("#chat-content").append(
        '<div class="message-container-receive"><img class="image-infor-focus text-message message-icon" src ="' +
        data.message +
        '"><h6 class="nameUser">' +
        data.sender +
        "</h6></div>"
    );
});
//listening private message
socket.on("new-message-private", (data) => {
    $(".container-chat").show();
    receiver = data.sender;
    $("#chat-content").append(
        '<div class="message-container-receive"><h1></h1>' +
        data.message +
        '<h6 class="nameUser">' +
        data.sender +
        "</h6></div>"
    );
    //listening focus
    socket.on("server-send-user-write", (data) => {
        $("#notification-focus").html(
            data + ": " + "<div class='dot-flashing'></div>"
        );
    });
    //stop focus
    socket.on("server-send-user-write-stop", () => {
        $("#notification-focus").html("");
    });
});
$(document).ready(() => {
    sender = $("#username").text();
    socket.emit("user-name", $("#username").text());
    $(".container-chat").hide();
    //close box chat when reload
    $(".collection-item").click(function(event) {
        receiver = $(this).text();
        socket.emit("revider", $(this).text());
        $(".container-chat").show();
    });
    //close box chat
    $("#close-boxchat").click(() => {
        $(".container-chat").hide();
    });

    //send message
    $("#send-message").click(() => {
        var message = $("#message-inbox").val();
        socket.emit("content-message", {
            message: message,
            receiver: receiver,
            sender: sender,
        });
        $("#chat-content").append(
            '<div class="message-container"><h1></h1>' +
            message +
            '<h6 class="nameUser">' +
            "You</h6></div>"
        );
        $("#message-inbox").val(" ");

        // scrollTop when send message
        $("#chat-content").animate({ scrollTop: 10000 }, "slow");
        $("#notification-focus").css("bottom: 0;");
    });
    // focusout input , when sender writing
    $("#message-inbox").focusin(() => {
        socket.emit("user-writing", sender);
    });
    // stop focusout input
    $("#message-inbox").focusout(() => {
        socket.emit("user-write-stop");
    });
    //

    $(".image-emotion").click(function(event) {
        var message = $(this).attr("src");
        socket.emit("content-emotion", {
            message: message,
            receiver: receiver,
            sender: sender,
        });
        $("#chat-content").append(
            '<div class="message-container"><img class="image-infor-focus text-message message-icon" src="' +
            message +
            '">' +
            '<h6 class="nameUser">' +
            "You</h6></div>"
        );
    });
});