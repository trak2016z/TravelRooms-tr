/**
 * Created by Joanna on 2017-01-15.
 */


function refreshUI2(list) {
    var lis = '';
    var sum = list.reduce(function (pv, cv) {
        return pv + parseFloat(cv.price);
    }, 0);
    for (var i = 0; i < list.length; i++) {
        lis += '<tr data-key="' + list[i].key + '"><td>' + list[i].name + '</td>' +
            '<td>' + list[i].price + '</td> </tr>';
    }
    document.getElementById('expensesForEveryone').innerHTML = lis;
    document.getElementById('sumExpenses').innerHTML = sum + " zł";
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
    refreshUI2(list);

});