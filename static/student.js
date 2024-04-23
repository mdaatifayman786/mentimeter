var button1 = document.querySelector('#option_1')
var button2 = document.querySelector('#option_2')
var button3 = document.querySelector('#option_3')
var sumbit = document.querySelector('#sub')
var main_btn = document.querySelectorAll(".option")
var option_clicked = 0
var recivied_api_data = []
var recivide_slide_id = 0
button1.addEventListener('click',function(){
    button1.setAttribute('style','border:3px solid #6E54BD;background-color:#F8F8FE')
    button2.setAttribute('style','background-color:#fff')
    button3.setAttribute('style','background-color:#fff')
    option_clicked = 1
})
button2.addEventListener('click',function(){
    button2.setAttribute('style','border:3px solid #6E54BD;background-color:#F8F8FE')
    button1.setAttribute('style','background-color:#fff')
    button3.setAttribute('style','background-color:#fff')
    option_clicked = 2
})
button3.addEventListener('click',function(){
    button3.setAttribute('style','border:3px solid #6E54BD;background-color:#F8F8FE')
    button2.setAttribute('style','background-color:#fff')
    button1.setAttribute('style','background-color:#fff')
    option_clicked = 3
})

var disply_question = document.querySelector("#ct1")
var disply_option_1 = document.querySelector("#ct2")
var disply_option_3 = document.querySelector("#ct3")
var disply_option_4 = document.querySelector("#ct4")



var allCookies = document.cookie;
        
        // Split cookies into an array
        var cookieArray = allCookies.split('; ');

        // Create an object to store cookie values
        var cookieValues = {};

        // Loop through cookies and extract values
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            var parts = cookie.split('=');
            var name = decodeURIComponent(parts[0]);
            var value = decodeURIComponent(parts.slice(1).join('='));
            cookieValues[name] = value;
        }
        
        // Log cookie values to the console
        console.log('Cookie Values:', cookieValues['username']);
//


const socket = io()

socket.on("room_msg", function(data){
    disply_question.innerHTML = data['message'][1]
    disply_option_1.innerHTML = data['message'][2][0]
    disply_option_3.innerHTML = data['message'][3][0]
    disply_option_4.innerHTML = data['message'][4][0]
    recivide_slide_id = data['message'][5]
    clear_screen()
    console.log(data)
})

joinRoom(cookieValues['username'])

function joinRoom(roomName) {
    socket.emit('room', roomName);
}
sumbit.addEventListener('click',function(){
    var voting_packet = [recivide_slide_id,option_clicked]
    socket.emit('voting_count',voting_packet)
})

function clear_screen(){
    main_btn.forEach(function(element){
        element.style.backgroundColor = '#fff';
        element.style.border = '2px solid rgb(191, 171, 171)';
    })
    option_clicked = 0
}


