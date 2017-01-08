function saveDate() {
    var from = $('#datepicker_from').datepicker('getDate');
    var to = $('#datepicker_to').datepicker('getDate');

    var key = getQueryVariable("id");
    var endPoint = buildEndPoint(key);
    endPoint.update({data_from: from.valueOf(), data_to: to.valueOf()})


}

function saveToExpensess() {
    var wydatek = document.getElementById('expenses').value.trim();
    var cena = document.getElementById('price').value.trim();

    if (wydatek.length > 0 && cena >= 0) {
        var key = getQueryVariable("id");
        var endPoint = buildEndPoint(key, "expenses");
        endPoint.push({name: wydatek, price: cena})
    }
    else {
        window.alert("Wprowadzono niepoprawną wartość!");
    }

}

function saveToInformation(){
    var information = document.getElementById('informationForRoom').value.trim();
    if (information.length > 0 ) {
        var key = getQueryVariable("id");
        var endPoint = buildEndPoint(key, "informationForRoom");
        endPoint.push({name: information})
    }
    else {
        window.alert("Wprowadzono niepoprawną wartość!");
    }


}


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function refreshUI(list) {
    var lis = '';
    var sum = list.reduce(function (pv, cv) {
        return pv + parseFloat(cv.price);
    }, 0);

    for (var i = 0; i < list.length; i++) {
        lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].name + '</td>' +
            '<td>' + list[i].price + '</td>' +
            '<td>' + genLinks(list[i].key, list[i].name, list[i].price) + '</td></tr>';
    }

    document.getElementById('expensesBody').innerHTML = lis;
    document.getElementById('sumExpenses').innerHTML = sum + " zł";

}

var key = getQueryVariable("id");

function genLinks(key, expenses, price) {
    var links = '';
    links += '<a href="javascript:del(\'' + key + '\',\'' + expenses + '\',\'' + price + '\')">Usuń</a>';
    return links;
}


function del(expensesKey, expenses, price) {
    var response = confirm("Na pewno usunąć\"" + expenses + "\" oraz \"" + price + "\"z listy?");
    if (response == true) {
        var deleteExpenses = buildEndPoint(key, "expenses/" + expensesKey);
        deleteExpenses.remove();
    }
}

buildEndPoint(key, "expenses").on("value", function (snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var name = data[key].name ? data[key].name : '';
            var price = data[key].price ? data[key].price : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    price: price,
                    key: key
                })
            }
        }
    }
    refreshUI(list);
});

buildEndPoint(key, "informationForRoom").on("value", function(snapshot){
    debugger;
    var data = snapshot.val();
    for(var key in data) {
        if(data.hasOwnProperty(key)) {
            var name = data[key].name ? data[key].name: '';
            if(name.trim().length > 0){
                console.log(name);
            }
        }
    }
    document.getElementById('informationDisplay').innerHTML = name;
});

buildEndPoint(key).on("value", function (snapshot) {
    var data = snapshot.val();
    createMap(data.name);
    fillDate(data.data_from, data.data_to);
});

function fillDate(data_from, data_to) {
    data_from = new Date(data_from);
    data_to = new Date(data_to);

    document.getElementById('data_from').innerHTML = data_from.toLocaleDateString();
    document.getElementById('data_to').innerHTML = data_to.toLocaleDateString();
}

function buildEndPoint(key, prop) {
    return new Firebase('https://blog-dbcf4.firebaseio.com/' + key + (prop ? '/' + prop : ''));
}

$(function () {
    $("#datepicker_to, #datepicker_from").datepicker();
});

function createMap(data) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': data
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myOptions = {
                zoom: 8,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("map"), myOptions);

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
    });
}