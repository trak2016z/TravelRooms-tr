function buildEndPoint(userID) {
    return new Firebase('https://blog-dbcf4.firebaseio.com/User/' + userID);
}

function saveUserData() {
    var name = document.getElementById('name').value.trim();
    var surname = document.getElementById('surname').value.trim();
    var telephone = document.getElementById('telephone').value.trim();
    var street = document.getElementById('street').value.trim();
    var numberHome = document.getElementById('numberHome').value.trim();
    var city = document.getElementById('city').value.trim();
    var userId = firebase.auth().currentUser.uid;
    if (name.length >= 0 && surname.length >= 0 && telephone.length >= 0 && street.length >= 0 && numberHome.length >= 0 && city.length >= 0) {
        var endPoint = buildEndPoint(userId);
        endPoint.update({
            name: name,
            surname: surname,
            telephone: telephone,
            street: street,
            numberHome: numberHome,
            city: city
        });
    }
    else {
        window.alert("Wprowadzono niepoprawną wartość!");
    }
}


