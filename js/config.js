var local = localStorage.getItem("session");
if (local === "undefined" || local === null) {

    window.location.href = "../index.html";
}

var config = {
    apiKey: "AIzaSyAzQt8zTPXaL2RT48Z_oLDucPCndXXxmDw",
    authDomain: "gtslogic.firebaseapp.com",
    databaseURL: "https://gtslogic.firebaseio.com",
    projectId: "gtslogic",
    storageBucket: "gtslogic.appspot.com",
    messagingSenderId: "754828374672"
};
firebase.initializeApp(config);
let database = firebase.database();

var userId = localStorage.getItem("session");
// alert(userId);
firebase.database().ref('users/data/' + userId).once('value')
    .then(function (snapshot) {
        $("#result").text(snapshot.val().name);
    });

function logout() {
    localStorage.removeItem("session");
    window.location.href = "index.html";
}
setInterval(function () {
    //console.log(firebase.firestore.Timestamp);
    firebase.database().ref('users/data/' + userId).once('value')
        .then(function (snapshot) {
            let val = snapshot.val();
            firebase.database().ref().child('users/data/' + userId).set({
                name: val.name,
                lastname: val.lastname,
                position: val.position,
                phone: val.phone,
                role: val.role,
                email: val.email,
                password: val.password,
                online: firebase.database.ServerValue.TIMESTAMP,
                thumbnail: val.thumbnail
            });
        });
}, 1000);