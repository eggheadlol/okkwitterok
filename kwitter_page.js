//YOUR FIREBASE LINKS
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
user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send() {

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({

            name: user_name, message: msg, like: 0
      });
      document.getElementById("msg").value = ""

}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name = message_data["name"]
                        message = message_data["message"]
                        like = message_data["like"]

                        name_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>"
                        message_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        like_btn = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='update(this.id)'>"
                        thumbs = "<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button>"

                        document.getElementById("output").innerHTML+= name_tag+message_tag+like_btn+thumbs;
                        //End code
                  }
            });
      });
}
getData();
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function update(message_id){

      button_id=message_id;
      likes=document.getElementById(button_id).value
      updated=Number(likes)+1

 firebase.database().ref(room_name).child(message_id).update({

      like:updated
 });
}