firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('userAccount').innerHTML = getUserName(user);
    }
    else if (window.location.pathname !== "/Blog-master/Blog-master/homePage.html") {
        window.location.assign("homePage.html");
    }
});

function getUserName(user){
    if(user.displayName != null && user.displayName != "" && user.displayName != undefined){
        return user.displayName;
    }
    else {
        return user.email;
    }
}