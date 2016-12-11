function refreshUI(list) {
    var lis = '';
    for(var i in list) {

        lis += '<option>' + i + '</option>';
    }

    console.log(list);
    document.getElementById('country').innerHTML = lis;
}


buildEndPoint().on("value", function (snapshot) {
    refreshUI(snapshot.val());
});

function buildEndPoint (country) {
    return new Firebase('https://blog-dbcf4.firebaseio.com/Country/' + (country ?( country + '/opinion/'): '' ));
}

function saveToCountry() {
    var country = $( "#country option:selected" ).text();
    var opinion = document.getElementById('opinion').value.trim();
    var userId = firebase.auth().currentUser.uid;
    if (opinion.length >= 0) {
        var endPoint = buildEndPoint(country);
        endPoint.push({opinion: opinion, user: userId})
    }
    else {
        window.alert("Wprowadzono niepoprawną wartość!");
    }

}