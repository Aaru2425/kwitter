
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
document.getElementById("user_name").innerHTML="welcome"+username+"!"
function addroom(){
      roomname=document.getElementById("roomname").value
      firebase.database().ref("/").child(roomname).update({
            purpose:"addingroomname"
      })
      localStorage.setItem("room_name",roomname)
      window.location="kwitter_page.html"
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
console.log("roomname-"+Room_names)
row="<div class='room_name'id="+Room_names+"onclick='redirecttoroomname(this.id)'>#"+Room_names+"</div><hr>"
document.getElementById("output").innerHTML+=row
      });});}
getData();
function redirecttoroomname(name){
      console.log(name)
      localStorage.setItem("room_name",name)
      window.location="kwitter_page.html"
}
function logout(){
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location="index.html"
}