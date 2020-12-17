// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLPcgnI77nA16bPfl_X_KcDnPZP-if7mM",
    authDomain: "services-dev-web.firebaseapp.com",
    databaseURL: "https://services-dev-web.firebaseio.com",
    projectId: "services-dev-web",
    storageBucket: "services-dev-web.appspot.com",
    messagingSenderId: "418594940160"
};
firebase.initializeApp(config);

// Define o banco de dados que será usado.
var dbExpensesRef = firebase.database().ref('expenses/').orderByChild('username');

var bodyElement = document.getElementById('body');

var category = !getParam('category') ? 'null' : getParam('category');
var month = !getParam('month') ? 0 : getParam('month');
var year = !getParam('year') ? 0 : getParam('year');
var day = !getParam('day') ? 0 : getParam('day');

// Listar todos as entradas do banco e retorna o gasto diario
dbExpensesRef.on('value', function(snapshot) {
  var i = 0;
  var dataResponse = 0;
	snapshot.forEach(function(child) {
    var data = child.val();

    if (category!='null' && category != data.category) data.price = 0;

    if (day >= 1 && day != data.day) data.price = 0;

    if (year >= 1 && year != data.year) data.price = 0;

    if (month >= 1 && month != data.month) data.price = 0;

    if (month >= 1 && month != data.month) data.price = 0;

    dataResponse += data.price;

	});

  document.write(dataResponse);

}, function (errorObject) {
    document.write(0);
});

// Monitorando evento de inserção no banco.
// dbExpensesRef.on('child_added', function(data) {
// 	console.log(data.val());
// });

// Monitorando evento de atualização no banco.
// dbExpensesRef.on('child_changed', function(data) {
// 	console.log(data.val());
// });

// Monitorando evento de remoção no banco.
// dbExpensesRef.on('child_removed', function(data) {
// 	console.log(data.val());
// });

function getParam( parameter ) {
    var url = location.href;
    parameter = parameter.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+parameter+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? false : results[1];
}
