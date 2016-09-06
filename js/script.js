 window.addEventListener( 'load', function() {

    //altura do documento
    var docHeight = document.documentElement.offsetHeight;

    //posicao do scroll
    var scrolled = window.scrollY / ( docHeight - window.innerHeight );
  
    //evento scroll
    window.addEventListener( 'scroll', function() {
     
	    //normaliza a posição entre 0 e 1
	    var scrolled = window.scrollY / ( docHeight - window.innerHeight );

	    //inicia a animação com o scroll
	    animate(scrolled);
    
    }, false);

    //evento resize
    window.addEventListener( 'resize', function() {
    	
    	main.height(window.innerHeight);

    }, false);

    //variaveis
    var saveScroll = 0;

    //elementos
    var main = $("#main");
    var character = $("#character");

    //céu
    var sol = $("#sun");
    var lua = $("#moon");
    var textureMain = $("#texture-main");

    //menu
    var lineMenu = $("#path-line-hover");
    var btNav2 = $("#bt-nav-2");
    var btNav3 = $("#bt-nav-3");
    var btNav4 = $("#bt-nav-4");

    var btNav1Vert = $("#bt-nav-1-vert");
    var btNav2Vert = $("#bt-nav-2-vert");
    var btNav3Vert = $("#bt-nav-3-vert");
    var btNav4Vert = $("#bt-nav-4-vert");
	//animação bg color
	var rColor = 92;
	var gColor = 185;
	var bColor = 204;

	var rColor2 = 217;
	var gColor2 = 224;
	var bColor2 = 195;

	//acoes iniciais
	main.height(window.innerHeight);

	//FUNCOES
	var calcDescSpeed = function(number, sPos, reduc, typeVar){
		if(typeVar=='int'){
			return parseInt(number-((sPos*reduc)*number));
		}else{
			return number-((sPos*reduc)*number);
		}
	}

	var calcDesc = function(number, sPos, typeVar){
		if(typeVar=='int'){
			return parseInt(number-(sPos*number));
		}else{
			return (number-(sPos*number));
		}
	}

	var calcAscSpeed = function(number, sPos, reduc, typeVar){
		if(typeVar=='int'){
			return parseInt(((sPos*reduc)*number));
		}else{
			return (sPos*number);
		}
	}

	var calcAsc = function(number, sPos, typeVar){
		if(typeVar=='int'){
			return parseInt((sPos*number));
		}else{
			return (sPos*number);
		}
	}

	var calcFrames = function(number, sPos, speed){
		calcInt = parseInt((sPos*speed)*100);
		return calcInt*number;
	}

	var directionScroll = function(sScroll, sPos){
		if(sPos>=sScroll){
			return 'down';
		}else if(sPos<sScroll){
			return 'up';
		}
	}


	function animate(sPos){

		//verifica a direção do scroll
		dirScroll = directionScroll(saveScroll, sPos);

		//animação background color main
		colorBgCalc = 'rgba('+calcDesc(rColor, sPos, 'int')+', '+calcDescSpeed(gColor, sPos, 0.8, 'int')+', '+calcDescSpeed(bColor, sPos, 0.8, 'int')+', 1)';
		colorBgCalc2 = 'rgba('+calcDesc(rColor2, sPos, 'int')+', '+calcDesc(gColor2, sPos, 'int')+', '+calcDesc(bColor2, sPos, 'int')+', 1)';

		main.css({ 
		  'background' : ''+colorBgCalc+'',
		  'background' : '-moz-linear-gradient(top, '+colorBgCalc+' 0%,'+colorBgCalc2+' 100%)',
		  'background' : '-webkit-gradient(left top, left bottom, color-stop(0%, '+colorBgCalc+'), color-stop(100%,'+colorBgCalc2+'))',
		  'background' : '-webkit-linear-gradient(top, '+colorBgCalc+' 0%,'+colorBgCalc2+' 100%)',
		  'background' : '-o-linear-gradient(top, '+colorBgCalc+' 0%,'+colorBgCalc2+' 100%)',
		  'background' : '-ms-linear-gradient(top, '+colorBgCalc+' 0%,'+colorBgCalc2+' 100%)',
		  'background' : 'linear-gradient(to bottom, '+colorBgCalc+' 0%,'+colorBgCalc2+' 100%)'
		});

		character.css({ 
		  'background-color' : 'rgba('+calcDesc(184, sPos, 'int')+', '+calcDesc(210, sPos, 'int')+', '+calcDesc(186, sPos, 'int')+', 1)'
		});

		//animação textura
		textureMain.css({ 'opacity' : ((calcDescSpeed(100, sPos, 1.4, 'decimal'))/100) });

		//animação sol
		sol.css({ 
			'opacity' : ((calcDescSpeed(100, sPos, 1.7, 'decimal'))/100), 
			'backgroundPosition' : 'center ' + calcAsc(1800, sPos, 'decimal') + 'px ', 
			'width' : calcDescSpeed(30, sPos, 0.5, 'decimal') + '%', 
			'margin-left' : (100-calcDescSpeed(30, sPos, 0.5, 'decimal'))/2 + '%', 
			'margin-right' : (100-calcDescSpeed(30, sPos, 0.5, 'decimal'))/2 + '%', 
		});

		//animação lua
		lua.css({ 
			'opacity' : ((calcAscSpeed(100, sPos, 1.7, 'decimal'))/100), 
			'backgroundPosition' : 'center ' + calcDesc(1800, sPos, 'decimal') + 'px ', 
			'width' : calcAscSpeed(30, sPos, 0.5, 'decimal') + '%', 
			'margin-left' : (100-calcAscSpeed(30, sPos, 0.5, 'decimal'))/2 + '%', 
			'margin-right' : (100-calcAscSpeed(30, sPos, 0.5, 'decimal'))/2 + '%', 
		});
		
		//animação personagem
		if(dirScroll=='down'){ 
			directionFunc = 1; 
			character.css({'backgroundPosition':'center '+calcFrames(-75, sPos, 4)+'px'});
		}else if(dirScroll=='up'){ 
			directionFunc = -1; 
			character.css({'backgroundPosition':'center '+calcFrames(75, sPos, 4)+'px'});
		}

		character.css({
			"-moz-transform": "scaleX("+directionFunc+")",
			"-o-transform": "scaleX("+directionFunc+")",
			"-webkit-transform": "scaleX("+directionFunc+")",
			"transform": "scaleX("+directionFunc+")",
			"filter": "FlipH",
			"-ms-filter": "FlipH"
		});

		//animação menu
		lineMenu.attr("x2", calcAsc(390, sPos, 1, 'decimal'));
		
		if(sPos<=0.09){ $("#container-menu-vert > ul > li").removeClass("active"); btNav1Vert.toggleClass('active'); }
		if(sPos>=0.30){ btNav2.css({'background': '#dd666c'}); $("#container-menu-vert > ul > li").removeClass("active"); btNav2Vert.toggleClass('active'); } else { btNav2.css({'background': '#cacaca'}); }
		if(sPos>=0.62){ btNav3.css({'background': '#dd666c'}); $("#container-menu-vert > ul > li").removeClass("active"); btNav3Vert.toggleClass('active'); } else { btNav3.css({'background': '#cacaca'}); }
		if(sPos>=0.99){ btNav4.css({'background': '#dd666c'}); $("#container-menu-vert > ul > li").removeClass("active"); btNav4Vert.toggleClass('active'); } else { btNav4.css({'background': '#cacaca'}); }

		//salva a ultima posicao do scroll
		saveScroll=sPos;

	}

	//inicia a animação quando a pagina é carregada
	animate(scrolled);

	//funcoes de navegação
	$(".nav-pages").click(function(){
		
		var id = $(this).attr('id');
		if(id!=undefined){
			$("#container-menu-vert > ul > li").removeClass("active");
			$("#"+id+"-vert").toggleClass('active');
		}

		page = $(this).data('page');
		$(window).scrollTo( page , 700);

	});

	
	//efeito botao menu vertical e menu
	$('#button-menu-vert').click(function(){
		$(this).toggleClass('open');
		//menu view
		$("#container-menu-vert").toggleClass('open-menu-vert');
		//main
		$("#main").toggleClass('active');
	});

	//active menu vertical item
	$("#container-menu-vert > ul > li").click(function(){
		$("#container-menu-vert > ul > li").removeClass("active");
		$(this).toggleClass('active');
	});
	

}, false);
