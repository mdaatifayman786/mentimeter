from flask_socketio import SocketIO , emit, send, join_room
from flask import Flask,render_template,request,redirect,url_for,make_response,jsonify
import random
import time
import pandas as pd
#all extra function here
#main = {
#    "sesion_ID_123" : {
 #       "Question_manager":{
  #          "Question_123": {
   #             "question" : "what is your name",
    #            "option": {
     #           "option_1": ["Aatif",1],
      #          "option_2": ["Hazara",2],
       #         "option_3": ["one_sided_crush",3],
        #    }
         #   }
            
            
        #},
        #"user_manger":{
        #    "user_1": "Name of the user"
        #}
    #}
#}
main = {}
copy = {}

def id_generator():
    for _ in range(5):
        yield random.randint(1, 9)


#all extra function end here
app = Flask(__name__)
socket = SocketIO(app)

@app.route('/')
def home():
    global ses_id
    ses_id = ''
    generator = id_generator()
    for value in generator:
        ses_id+= f"{value}"
    response = make_response(render_template('index.html'))

    # Set a cookie in the response
    # sending cookie data to server
    response.set_cookie('username', ses_id)
    main1 = {
    f"{ses_id}":{}
}
    main.update(main1)
    for n in main:
        print(main[n])
        print(n)
    print(main)
    print(main1)
    return response
@app.route("/room",  methods=["POST", "GET"])
def room():
    global teacher_ip, port

    port = request.environ.get('SERVER_PORT')
    teacher_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    print(teacher_ip,port)
    print("working")
    return render_template("teacher.html")

@socket.on("fetching")
def dictdata(data):
    msg = {}
    for n in main:
        if n == data:
            msg = {f"{data}":main[data]}
    socket.emit("fetching",msg)
@socket.on("updating_dict")
def updating(dict):
    main.update(dict)
    print(main)

@socket.on('room')
def joinig(id):
    join_room(id)
    print(f"room is created {id}")
@socket.on('brdcasting')
def recivied(data):
    room  = data[0]
    socket.emit('room_msg', {'message': data}, room=room)
@socket.on("voting_count")
def vote(packet):
    socket.emit("recived_packet",packet)



@app.route('/voting')
def voting():
    global student_ip, student_port
    student_port = request.environ.get('SERVER_PORT')
    student_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    print(student_ip,student_port)

    response = make_response(render_template('student.html'))

    response.set_cookie('username', my_data)
    return response
@app.route("/join", methods=["POST", "GET"])
def checking():
    if request.method == "POST":
        id = request.form.get("room")
        print(id)
        for n in main:
            if n == id:
                global my_data
                my_data = n
                return redirect(url_for("voting"))
    return render_template("student1.html")

@app.route("/ip")
def ip():
    data = [student_ip,student_port,teacher_ip,port,ses_id]
    return jsonify(data)

if __name__ == '__main__':
    socket.run(app=app)