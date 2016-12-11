
function registerUser() {
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function() {
                window.location = 'homePage.html';
            })
            .catch(function (error) {
                window.alert(error.message); //
        });
}








