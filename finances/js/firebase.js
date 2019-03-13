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

var addressElement = document.getElementById('address');

// Define o banco de dados que será usado.
var dbExpensesRef = firebase.database().ref('expenses/').orderByChild('username');

// Inserção ou atualização de dados.
function writeUserData(name, email, imageUrl, userID) {
	firebase.database().ref('expenses/' + userID).set({
		username: name,
	    email: email,
	    profile_picture : imageUrl
	}, function(error) {
	    if (error) {
	    	console.error('Error');
	    } else {
	    	console.info('Success');
	    }
	});
}


document.getElementById("addEvent").addEventListener("click", function(){
	var expId = 'EID' + Math.round(new Date().getTime()/1000) + '' + Math.floor((Math.random() * 1000000) + 1);
	// Inserção ou atualização de dados.
	writeUserData(Math.floor((Math.random() * 1000000) + 1), 'sdasd', 'dsfsfdfdf', expId);
});


// Listar todos as entradas do banco.
dbExpensesRef.on('value', function(snapshot) {
	snapshot.forEach(function(child) {
    	console.log(child.val()); // NOW THE CHILDREN PRINT IN ORDER
	});
}, function (errorObject) {
    console.log(errorObject);
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


// Retorna a geolocalização atual do usuário.
function getLocation() {
	addressElement.value = 'Loading...';
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getAddress);
	} 
	else {
		console.log("Geolocation is not supported by this browser.");
		addressElement.value = '';
	}
}

// Retorna as informações de endereço da geolocalização.
function getAddress(position) {
	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({'location': {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)}}, function(results, status) {
		if(status=='OK' && results.length>0) {
			for(var i in results) {
				var result = results[i];
				if(result.formatted_address != undefined) {
					addressElement.value = result.formatted_address
					break;
					return true;
				}
				else {
					addressElement.value = '';
				}
			}
		}
		else {
			addressElement.value = '';
		}
	});
	
	return false;
}