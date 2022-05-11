var firebaseConfig = {
    apiKey: "AIzaSyByJDtvcq3_mTdNi2xOU4gquw0jObLjKZQ",
    authDomain: "kwitter-b292f.firebaseapp.com",
    databaseURL: "https://kwitter-b292f-default-rtdb.firebaseio.com",
    projectId: "kwitter-b292f",
    storageBucket: "kwitter-b292f.appspot.com",
    messagingSenderId: "893774149866",
    appId: "1:893774149866:web:48717582199ed6244eff93",
    measurementId: "G-GV3ZPHEZ9R"
};
firebase.initializeApp(firebaseConfig);
username=localStorage.getItem("user_name")
roomname=localStorage.getItem("room_name")
function send(){
    msg=document.getElementById("msg").value
    firebase.database().ref(roomname).push({
        name:username,
        message:msg,
        like:0
    })
    document.getElementById("msg").value=""
}
function getData(){
    firebase.database().ref("/"+roomname).on('value',function(snapshot){
        document.getElementById("output").innerHTML=""
        snapshot.forEach(function(childSnapshot){
            childKey=childSnapshot.key
            childData=childSnapshot.val()
            if(childKey!="purpose"){
                firebase_message_id=childKey
                message_data=childData
                console.log(firebase_message_id)
                console.log(message_data)
                name1=message_data['name']
                message=message_data['message']
                like=message_data['like']
                name_with_tag="<h4>"+name1+"<img class='user_tick'src='tick.png'></h4>"
                message_with_tag="<h4 class='message_h4'>"+message+"</h4>"
                like_button="<button class='btn btn-warning'id="+firebase_message_id+"value="+like+"onclick='updateLike(this.id)'>"
                span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>"
                row=name_with_tag+message_with_tag+like_button+span_with_tag
                document.getElementById("output").innerHTML+=row
            }
        })
    })
}getData()
function updatelike(message_id){
    console.log(message_id)
    button_id=message_id
    likes=document.getElementById(button_id).value
    updated_likes=Number(likes)+1
    console.log(updated_likes)
    firebase.database().ref(roomname).child(message_id).update({
        like:updated_likes
    })
}
function logout(){
    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location="index.html"
}