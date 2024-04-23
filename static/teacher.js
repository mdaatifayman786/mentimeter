var content = document.querySelector('#contentbutton')
var container = document.querySelector('.container')
var menu = document.querySelector('.menu')
var bar = document.querySelector('.contentbar')
var cross = document.querySelector('#tp')
var t = document.querySelector("#title")
var prsent = document.querySelector("#pr")
content.addEventListener("click",function(){
    container.setAttribute("style","margin-left:4vw")
    menu.setAttribute("style","margin-left:1vw")
    bar.setAttribute('style',"display:block")
})
cross.addEventListener("click",function(){
    container.setAttribute("style","margin-left:12vw")
    menu.setAttribute("style","margin-left:16vw")
    bar.setAttribute('style',"display:none")
    console.log("done")
})
var prsent_or_not = false
prsent.addEventListener('click',function(){
  prsent_or_not = true
})




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
var number = document.querySelector('#pendulam')
number.innerHTML = cookieValues['username']


// content part strt
var live_slide = 1
var ses_id = cookieValues['username'];
let dict_t = {};
dict_t= {[ses_id]:{}};
var questionman = {"Question_manager":{}}
dict_t[ses_id]  = {...dict_t[ses_id],...questionman} 
console.log(dict_t)

var question = document.querySelector("#mt")
var option_1 = document.querySelector("#mt1")
var option_2 = document.querySelector("#mt2")
var option_3 = document.querySelector("#mt3")

var question_f = document.querySelector("#et")
var option_1_f = document.querySelector("#et1")
var option_2_f = document.querySelector("#et2")
var option_3_f = document.querySelector("#et3")

question.addEventListener("input",function(){
    var inputValue = question.value;
    var qas = {"question":[inputValue]}
    dict_t[ses_id]["Question_manager"][live_slide] = {...dict_t[ses_id]["Question_manager"][live_slide],...qas}
    
    question_f.innerHTML = inputValue
})
option_1.addEventListener("input",function(){
    var inputValue = option_1.value;
    var op1 = {"option_1":[[inputValue],[0]]}
    dict_t[ses_id]["Question_manager"][live_slide] = {...dict_t[ses_id]["Question_manager"][live_slide],...op1}
    option_1_f.innerHTML = inputValue
})
option_2.addEventListener("input",function(){
    var inputValue = option_2.value;
    var op2 = {"option_2":[[inputValue],[0]]}
    dict_t[ses_id]["Question_manager"][live_slide] = {...dict_t[ses_id]["Question_manager"][live_slide],...op2}
    option_2_f.innerHTML = inputValue
})
option_3.addEventListener("input",function(){
    var inputValue = option_3.value;
    var op3 = {"option_3":[[inputValue],[0]]}
    dict_t[ses_id]["Question_manager"][live_slide] = {...dict_t[ses_id]["Question_manager"][live_slide],...op3}
    option_3_f.innerHTML = inputValue
})

// socket works
var socket = io()
socket.emit("fetching", cookieValues["username"])
socket.on("fetching", (dict)=>{
    console.log(dict)
    dict_t = dict
    console.log(dict_t)
})
console.log(JSON.stringify(dict_t));



var index = 1;

 function dynamically(index) {
   var trip = document.createElement("div");
   trip.classList.add("slidebox");
   trip.innerHTML = `
   <diV class = trim>
     <h3 class="hi">${index}</h3>
     <div class="div">
       <svg xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid meet" width="300" height="300" aria-label="Bar Chart Icon" viewBox="0 0 48 48">
         <rect x="32.73" y="17.04" width="11.4" height="25.25" fill="rgb(211, 213, 215)"></rect>
         <rect x="3.87" y="26.22" width="11.4" height="16.06" fill="rgb(81, 85, 94)"></rect>
         <rect x="18.3" y="4.31" width="11.4" height="37.97" fill="rgb(146, 149, 155)"></rect>
         <rect y="42.28" width="48" height=".99" fill="rgb(37,43,54)"></rect>
       </svg>
       <p>Multiple choice</p>
     </div>
    </div> `;
   return trip;
 }
 
 var box = document.querySelector(".slide");
 var slidebutton = document.querySelector("#newslide");
 
 slidebutton.addEventListener("click", function() {
   var co = dynamically(index);
   box.append(co);
   index++;
 });
 // here the catach
 box.addEventListener("click", function(event) {
   if (event.target.classList.contains("hi")) {
    live_slide = event.target.textContent
    var slideno = {[event.target.textContent]:{}}
    if (!dict_t[ses_id]["Question_manager"]) {
      dict_t[ses_id]["Question_manager"] = {};
    }
    dict_t[ses_id]["Question_manager"][live_slide]={...dict_t[ses_id]["Question_manager"][live_slide],...slideno}
  
    updating(live_slide)
    
    if (prsent_or_not){
      broadcasting(live_slide)
    }
    

    const parent = event.target.nextElementSibling
    parent.setAttribute("style","background-color:red")
     alert("Clicked index: " + event.target.textContent);
     console.log("Clicked index: " + event.target.textContent);
     var selecting = document.querySelector(event.target.classList.contains("hi"))
     var parent_node = selecting.parentnode
     parent_node.setAttribute("style","backgroungd-color:black") 
   }
 });
 setInterval(function() {
  socket.emit("updating_dict",dict_t)
}, 1000);

function updating(number){
  var update_question = dict_t[ses_id]["Question_manager"][number]["question"]
  var update_option_1 = dict_t[ses_id]["Question_manager"][number]["option_1"]
  var update_option_2 = dict_t[ses_id]["Question_manager"][number]["option_2"]
  var update_option_3 = dict_t[ses_id]["Question_manager"][number]["option_3"] 
  
  question_f.innerHTML = update_question
  try{
   option_1_f.innerHTML = update_option_1[0]
    option_2_f.innerHTML = update_option_2[0]
    option_3_f.innerHTML = update_option_3[0] 
  }catch (error){
    
  }
  
}

var ip = []
fetch('/ip')
    .then(response => response.json())
    .then(data => {
        console.log('Data received:', data);
        ip = [...data]
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    
    
socket.emit("room",ses_id)

function broadcasting(id){
  var room_data = [ses_id,dict_t[ses_id]["Question_manager"][id]["question"],dict_t[ses_id]["Question_manager"][id]["option_1"],dict_t[ses_id]["Question_manager"][id]["option_2"],dict_t[ses_id]["Question_manager"][id]["option_3"],live_slide]
  socket.emit("brdcasting",room_data)
}

socket.on("recived_packet",(packet)=>{
  bar_machanims(packet,dict_t)
  console.log(`your choice for the ${packet[0]} option clicked is ${packet[1]}`)
})

// chat machnism
var bar1 = document.querySelector(".yellow")
var bar2 = document.querySelector(".green")
var bar3 = document.querySelector(".blue")

function bar_machanims(packet,database){
  
  var option_1_vote = database[ses_id]["Question_manager"][packet[0]]["option_1"][1]
  var option_2_vote = database[ses_id]["Question_manager"][packet[0]]["option_2"][1]
  var option_3_vote = database[ses_id]["Question_manager"][packet[0]]["option_3"][1]
  console.log(option_1_vote[0])
  console.log(option_2_vote[0])
  console.log(option_3_vote[0])
  var list = [database[ses_id]["Question_manager"][packet[0]]["option_1"][1][0],database[ses_id]["Question_manager"][packet[0]]["option_2"][1][0],database[ses_id]["Question_manager"][packet[0]]["option_3"][1][0]]
  if (packet[1]==1){
     dict_t[ses_id]["Question_manager"][packet[0]]["option_1"][1][0] +=1
  }else if(packet[1]==2){
    dict_t[ses_id]["Question_manager"][packet[0]]["option_2"][1][0] +=1
  }else if (packet[1]==3){
    dict_t[ses_id]["Question_manager"][packet[0]]["option_3"][1][0] +=1
  }else{
    alert("something is wrng reciving data")
  }
  var list = [database[ses_id]["Question_manager"][packet[0]]["option_1"][1][0],database[ses_id]["Question_manager"][packet[0]]["option_2"][1][0],database[ses_id]["Question_manager"][packet[0]]["option_3"][1][0]]
  console.log(list)
  var sorted_lst = list.sort((a, b) => b - a);
  console.log("Descending order:",list);
  var maxium = sorted_lst[0]
  var first = option_1_vote[0]
  var middle = option_2_vote[0]
  var last = option_3_vote[0]
  var pxl_size = Math.round(200/maxium)
  var firt_pxl = pxl_size * first
  var second_pxl = pxl_size * middle
  var third_pxl = pxl_size * last
  bar1.style.height = `${firt_pxl}px`;
  bar2.style.height = `${second_pxl}px`;
  bar3.style.height = `${third_pxl}px`;
}
function on_slide_click(num,database){
  var option_1_vote = database[ses_id]["Question_manager"][num]["option_1"]
  var option_2_vote = database[ses_id]["Question_manager"][num]["option_2"]
  var option_3_vote = database[ses_id]["Question_manager"][num]["option_3"]
  var list = [option_1_vote[1],option_2_vote[1],option_3_vote[1]]
  var sorted_lst =list.sort((a, b) => b - a);
  console.log("Descending order:",list);
  var maxium = sorted_lst[0]
  var first = list[0]
  var middle = list[1]
  var last = list[2]
  var pxl_size = 200/maxium
  bar1.setAttribute('style',`height:${first*pxl_size}px`)
  bar2.setAttribute('style',`height:${middle*pxl_size}px`)
  bar3.setAttribute('style',`height:${last*pxl_size}px`)
}
