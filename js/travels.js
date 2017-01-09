var favTravel = new Firebase('https://blog-dbcf4.firebaseio.com/');

function saveToList(event) {
    if (event.which == 13 || event.keyCode == 13) {
        var placeTravel = document.getElementById('placeTravel').value.trim();
        if (placeTravel.length > 0) {
            saveToFB(placeTravel);
        }
        document.getElementById('placeTravel').value = '';
        return false;
    }
}

function saveToFB(placeTravel) {
    favTravel.push({
        name: placeTravel,
        expensess: []
    });
}

function showListAllRooms(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].name + '</td>' +
            '<td>' + genLinks(list[i].key, list[i].name) + '</td></tr>';
    }
    document.getElementById('allRooms').innerHTML = lis;
}

function refreshUI(list) {
    var lis = '';
    for (var i = 0; i < list.length; i++) {
        lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].name + '</td>' +
            '<td>' + genLinks(list[i].key, list[i].name) + '</td>' +
            '<td>' + genLinks2(list[i].key, list[i].name) + '</td></tr>';
    }
    document.getElementById('travelsBody').innerHTML = lis;
}



function genLinks2(key, travel) {
    var links = '';
    links += '<button type="text" onclick="javascript:del(\'' + key + '\',\'' + travel + '\')">Usuń</button>'; //zamienic i wywolac nie linkami a przyciskami
    return links;
}

function genLinks(key) {
    var links = '';
    links += '<button type="button" onclick="window.location.href=\'travelsDetails.html?id=' + key + '\'">Szczegóły</button>';
    return links;
}

function del(key, travel) {
    var response = confirm("Na pewno usunąć\"" + travel + "\" z listy?");
    if (response == true) {
        var deleteTravel = buildEndPoint(key);
        deleteTravel.remove();
    }
}

function buildEndPoint(key) {
    return new Firebase('https://blog-dbcf4.firebaseio.com/' + key);
}

favTravel.on("value", function (snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    refreshUI(list);
});

favTravel.on("value", function (snapshot) {
    var data = snapshot.val();
    var list = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                list.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    showListAllRooms(list);
});

