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
var date_save = document.getElementById('date_save');

// Define o banco de dados que será usado.
var dbExpensesRef = firebase.database().ref('expenses/').orderByChild('username');

// Date
var date = new Date();
date_save.innerHTML = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

// Dados para salvar no banco de dados.
var dataSave = {
  address: false,
  category: false,
  price: false,
  date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
  hour: date.getHours(),
  minutes: date.getMinutes(),
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear()
}

// Inserção de dados.
function insertDataFireBase(dataSave, callback) {
  var expId = 'EID' + Math.round(new Date().getTime()/1000) + '' + Math.floor((Math.random() * 1000000) + 1);
	firebase.database().ref('expenses/' + expId).set(dataSave, function(error) {
	    if (error) {
        callback('error');
	    } else {
        callback('success');
	    }
	});
}

// Listar todos as entradas do banco.
dbExpensesRef.on('value', function(snapshot) {
	snapshot.forEach(function(child) {
    //console.log(child.val()); // NOW THE CHILDREN PRINT IN ORDER
	});
}, function (errorObject) {
    //console.log(errorObject);
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
					addressElement.value = result.formatted_address;
          dataSave.address = result.formatted_address;
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



$(document).ready(function () {

  $('#price').mask('#.##0,00', {reverse: true});

  $("#categories li").click(function(e){
    var bt = $(this);
    var category = bt.data('category');
    $("#categories li").removeClass('active');
    bt.toggleClass('active');
    dataSave.category = category;
  });

  $("#values li").click(function() {
    var bt = $(this);
    var value = parseFloat(bt.data('value'));
    var price = $("#price");
    var currentPrice = price.val();

    if (currentPrice == undefined || currentPrice == '') {
      currentPrice = 0;
    }
    else {
      currentPrice = parseFloat(currentPrice);
    }

    var calc = currentPrice + value;
    var priceValue = calc.toFixed(2);

    price.val(priceValue);
  });


  $("#save").click(function() {

    var price = $("#price");
    var currentPrice = price.val();

    if(!dataSave.category) {
      $.alert({
          theme: 'dark',
          animation: 'scale',
          closeAnimation: 'scale',
          title: 'Atenção!',
          type: 'red',
          content: 'Categoria não selecionada',
      });
    }
    else if(currentPrice == '0' || currentPrice == '') {
      $.alert({
          theme: 'dark',
          animation: 'scale',
          closeAnimation: 'scale',
          title: 'Atenção!',
          btnClass: 'btn-blue',
          content: 'Campo preço não foi preenchido',
      });
    }
    else {
      $.confirm({
        title: 'Confirmar!',
        content: 'Deseja realmente salvar essa transação?',
        theme: 'dark',
        animation: 'scale',
        closeAnimation: 'scale',
        type: 'dark',
        buttons: {
            confirm: {
              text: 'Salvar',
              action: function(){
                var price = $("#price");
                var currentPrice = price.val();
                dataSave.price = parseFloat(currentPrice);
                insertDataFireBase(dataSave, function(response) {
                  if (response == 'error') {
                    $.confirm({
                      theme: 'dark',
                      animation: 'scale',
                      closeAnimation: 'scale',
                      title: 'Erro!',
                      type: 'red',
                      content: 'Não foi possível salvar a transação!',
                    });
            	    }
                  else {
                    $.confirm({
                      theme: 'dark',
                      animation: 'scale',
                      closeAnimation: 'scale',
                      title: 'Successo!',
                      type: 'green',
                      content: 'Transação salva com sucesso!',
                    });
                    price.val('0');
            	    }
                });
              }
            },
            cancel: {
              text: 'Cancelar'
            },
        }
    });
    }
  });

});
