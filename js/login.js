function logowanie(){

    var password = document.getElementById("passwordLogin").value;
    var email = document.getElementById("emailLogin").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
         .then(function() {
             window.location = 'travels.html';
         })
         .catch(function(error){
             window.alert(error.code);
             window.alert(error.message);

        });
}
