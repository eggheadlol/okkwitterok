var firebaseConfig = {
      apiKey: "AIzaSyDMvTxDf35txHs7QLXWO_GH7s8wMbiVh-c",
      authDomain: "kwitter-91af3.firebaseapp.com",
      databaseURL: "https://kwitter-91af3-default-rtdb.firebaseio.com",
      projectId: "kwitter-91af3",
      storageBucket: "kwitter-91af3.appspot.com",
      messagingSenderId: "557231547109",
      appId: "1:557231547109:web:59747d7a4495913995ea0c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name = localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML = "welcome " + user_name + "!";


function addroom() {

      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({

            purpose:"addingroomname"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html"

}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
row="<div class='room_name' id="+Room_names+" onclick='redirect(this.id)' >#"+Room_names+"</div> <hr>"

document.getElementById("output").innerHTML+=row;
                  //End code
            });
      });
}
getData();


function redirect(name){

      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html"
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
