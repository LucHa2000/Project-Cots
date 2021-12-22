var socket = io("http://localhost:4000");

var receiver = "";
var sender = "";
//listening group emotion
socket.on("new-message-group-emotion", (data) => {
    // $("#container-chat-group").show();
    receiver = data.sender;
    $("#chat-content-group").append(
        '<div class="message-container"><img class="image-infor-focus text-message message-icon" src ="' +
        data.message +
        '"><h6 class="nameUser">' +
        data.sender +
        "</h6></div>"
    );
});
//listening joined
socket.on("new-member-joined", (data) => {
    $("#chat-content-group").append(
        '<div class="message-container"><p class="center">' +
        data +
        " joined group !" +
        "</p>"
    );
});
//list member joined group
socket.on("list-member-joined", (data) => {
    $(".member-join-room").html("");
    data.forEach((index) => {
        $(".member-join-room").append(`<p >${index}</p>`);
    });
});
//listening member out group
socket.on("member-out-group", (data) => {
    $(".member-join-room").html("");
    data.forEach((index) => {
        $(".member-join-room").append(`<p >${index}</p>`);
    });
});
//listening group message
socket.on("new-message-group", (data) => {
    receiver = data.sender;
    $("#chat-content-group").append(
        '<div class="message-container"><h1></h1>' +
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
    $("#message-inbox").hide();
    $(".container-chat").hide();
    $("#container-chat-group").hide();
    $(".main-joined-group").hide();
    //member join room
    $(".collection-member-chat-group").click(function(event) {
        socket.emit("new-join", sender);
        // receiver = $(this).text();
        // socket.emit("revider", $(this).text());
        $("#container-chat-private").hide();
        $("#container-chat-group").show();
        $(".main-joined-group").show();
    });
    //send message
    $("#send-message-group").click(() => {
        var message = $("#message-inbox-group").val();
        socket.emit("content-message-group", {
            message: message,
            receiver: receiver,
            sender: sender,
        });
        $("#message-inbox-group").val(" ");
        // scrollTop when send message
        $("#chat-content-group").animate({ scrollTop: 10000 }, "slow");
        $("#notification-focus").css("bottom: 0;");
    });
    //send emotion
    $(".image-emotion-group").click(function(event) {
        var message = $(this).attr("src");
        socket.emit("content-emotion-group", {
            message: message,
            receiver: receiver,
            sender: sender,
        });
    });
});