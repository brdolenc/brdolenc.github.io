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


	//terminal simulator
	var data = [
	  // { 
	  //   action: 'type',
	  //   strings: ["loading site..."],
	  //   output: '&nbsp;<span class="green">✓</span> <span class="gray">Images loaded</span><br>&nbsp;<span class="green">✓</span> <span class="gray">JS loaded</span><br>&nbsp;<span class="green">✓</span> <span class="gray">CSS loaded</span><br>&nbsp;<span class="green">✓</span> <span class="gray">Pages loaded</span><br>&nbsp;',
	  //   postDelay: 1000
	  // },
	  { 
	    action: 'type',
	    strings: ["npm install -g fullstack-package"],
	    output: '&nbsp;<span class="green">✓</span> <span class="gray">HTML 5</span><br>&nbsp;<span class="green">✓</span> <span class="gray">CSS 3</span><br>&nbsp;<span class="green">✓</span> <span class="gray">JavaScript</span><br>&nbsp;<span class="green">✓</span> <span class="gray">Jquery</span><br>&nbsp;<span class="green">✓</span> <span class="gray">GULP</span><br>&nbsp;<span class="green">✓</span> <span class="gray">Vue.js</span><br>&nbsp;<span class="green">✓</span> <span class="gray">PHP</span><br>&nbsp;<span class="green">✓</span> <span class="gray">Laravel</span><br>&nbsp;<span class="green">✓</span> <span class="gray">WordPress</span><br>&nbsp;<span class="green">✓</span> <span class="gray">Drupal</span><br>&nbsp;<span class="green">✓</span> <span class="gray">APIs REST/SOAP</span><br>&nbsp;<span class="green">✓</span> <span class="gray">MySQL</span><br>&nbsp;<span class="green">✓</span> <span class="gray">SVN</span><br>&nbsp;<span class="green">✓</span> <span class="gray">GIT</span><br>&nbsp;',
	    postDelay: 3000
	  },
	  { 
	    action: 'type',
	    strings: ["bruno-dolenc --info"],
	    output: '<span class="blue">[ Bruno Dolenc ] </span><span class="gray">Desenvolvedor Full stack, trabalho há mais de 10 anos nessa área, iniciei como designer e logo depois comecei a programar, hoje sou formado em Ciência da computação e coordenador de tecnologia de uma agência digital.</span><br>&nbsp;',
	    postDelay: 1000
	  },
	 { 
	    action: 'type',
	    strings: ["exit"],
	    output: '<span class="gray">wait...</span><br>&nbsp;',
	    postDelay: 1000
	  },
	  
	];

	runScripts(data, 0);
	

}, false);






function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html(''); 
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 40,
            callback: function() {

              
              
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;

              if(pos==3){

              	setTimeout(function() {
	                $(".terminal-window").animate({'margin-top': '-600px'}, 500);
	            }, 10000);

              }else{

	              if(pos < data.length) {
	                setTimeout(function() {
	                  runScripts(data, pos);
	                }, script.postDelay || 3000);
	              }

	          }

            }
          });
          break;
        case 'view':

          break;
    }
}