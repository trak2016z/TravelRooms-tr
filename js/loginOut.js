function loginOut(){

    firebase.auth().signOut()
        .then(function() {
            console.log('Signed Out');
        })
        .catch(function (error) {
            console.error('Sign Out Error', error);
        });
}







