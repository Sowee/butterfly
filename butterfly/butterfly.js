(function($)
{
    $.fn.butterfly=function(options)
    {
    	var defauts=
		{
			"defaultNameClass": "",
			"butterflyAnimation": "none", // none / hiddenAnimation / lineAnimation
			"smartTransition": true // true or false
		};

        var parametres=$.extend(defauts, options); 

        return this.each(function()
        {
        	// Variable
			var elementButterfly = $(this).wrap('<div class="butterfly-wrap"></div>');
			var outerHeightButterfly = $(elementButterfly).outerHeight(true); // Hauteur total de lelement
			var offsetButterfly = $(elementButterfly).offset().top; // Position de l'element sticky
			var butterflyWrap = $('.butterfly-wrap').css({
				'position': 'relative',
				'height': outerHeightButterfly+'px',
				'width': '100%',
				'overflow': 'hidden'
			}); // Application du style wrap-butterfly
			var watchScrollButterfly = $(document).scrollTop(); // Variable pour detection du scroll qui remonte

			var hiddenSmartCanBeFixed = false; // Gere les different etat de l'animation hidden
	
			// Play only 1 times
			var butterflyLaunchFunctionOne = true; // 0
			var butterflyLaunchFunctionTwo = true; // 2 - 4 - 3
			var butterflyLaunchFunctionThree = true; // 5 - 6
			var butterflyLaunchFunctionFour = true; // 1 			

			// function			
			function butterflyIsNotFlying()
			{
				$(elementButterfly).css({
					'position': '',
					'top': '',
					'left': '',
					'right': '',
					'margin-top': '',
					'height': '',
					'padding-top': '',
					'padding-bottom': ''
				});

				if(parametres.butterflyAnimation === "lineAnimation")
				{
					$(elementButterfly).css({'overflow': ''});
				}

				if(parametres.smartTransition === true)
				{
					if(parametres.butterflyAnimation === "hiddenAnimation")
					{
						activationCssTransition('all','0');
					}
					else
					{
						activationCssTransition('all','0');
					}
				}
			}

			function butterflyIsFlying(top, height)
			{
				$(elementButterfly).css({
					'position': 'fixed',
					'top': top,
					'left': '0px',
					'right': '0px',
					'margin-top': '0px',
					'height': height,
					'padding-top': '',
					'padding-bottom': ''
				});

				if(parametres.butterflyAnimation === "lineAnimation")
				{
					$(elementButterfly).css({'overflow': 'hidden'});
				}
				
				if(parametres.smartTransition === true)
				{
					if(parametres.butterflyAnimation === "hiddenAnimation")
					{
						activationCssTransition('all','0.4');
					}
					else if (parametres.butterflyAnimation === "lineAnimation")
					{
						activationCssTransition('height','0.4');
					}
					else
					{
						activationCssTransition('all','0');
					}
				}
			}
		
			function activationCssTransition(propriete, time){
				$(elementButterfly).css({
					'transition' : propriete+' '+time+'s ease-in-out'
				});
			}
		
			// gestion du responsive
			function butterflyResponsive()
			{
				butterflyIsNotFlying(); // on reinitialise pour connaitre la position initial de l'element
				outerHeightButterfly = $(elementButterfly).outerHeight(true); // Hauteur total de lelement
				offsetButterfly = $(elementButterfly).offset().top; // Position de l'element sticky
				
				// redifinission du css // redefinir en fonction de lanimation choisi
				butterflyWrap = $('.butterfly-wrap').css({
					'position': 'relative',
					'height': outerHeightButterfly+'px',
					'width': '100%',
					'overflow': 'hidden'
				}); // Application du style wrap-butterfly


				// On set l'etat du butterflyElement pour l'afficher au bon endroit
				if(offsetButterfly > $(document).scrollTop())
				{
					butterflyIsNotFlying();
				}
				else
				{
					if(parametres.butterflyAnimation === "hiddenAnimation")
					{
						butterflyIsFlying('-'+outerHeightButterfly+'px','');
					}
					else if(parametres.butterflyAnimation === "lineAnimation")
					{
						butterflyIsFlying('0px','2px');
					}
					else
					{
						butterflyIsFlying('0px','');
					}
				}
				if(parametres.smartTransition === true)
				{
					activationCssTransition('all', 0.0);
				}
			}

			// On set l'etat du butterflyElement pour l'afficher au bon endroit
			if(offsetButterfly > $(document).scrollTop())
			{
				butterflyIsNotFlying();
			}
			else
			{
				butterflyIsFlying();
			}

			$( window ).resize(function(){
				butterflyResponsive();
			});
			
			// gestion du scroll
			$(window).scroll(function(event){	
				
				
				if($(document).scrollTop() > offsetButterfly + outerHeightButterfly)
				{
					if($(document).scrollTop() >= watchScrollButterfly)
					{
						if(butterflyLaunchFunctionFour === true)
						{
							if(parametres.butterflyAnimation === "hiddenAnimation")
							{
								console.log('[01] hidden: FIXED CACHE');
								//butterflyHidden(); // hidden specification
								butterflyIsFlying('-'+outerHeightButterfly+'px','');
							}
							else if(parametres.butterflyAnimation === "lineAnimation")
							{
								console.log("[01] line : FIXED AND HEIGHT : 2px;");
								//butterflyLine();
								butterflyIsFlying('0px','2px');
							}
							else
							{
								console.log("[01] Normal : STILL FIXED ;");
								butterflyIsFlying('0px','');
							}
							butterflyLaunchFunctionOne = true;
							butterflyLaunchFunctionTwo = true;
							butterflyLaunchFunctionThree = true;
							butterflyLaunchFunctionFour = false;
						}
					}
					else
					{
						if(butterflyLaunchFunctionTwo === true)
						{
							console.log("[02] Scroll remonte ; Normal : STILL FIXED ; Hidden : STILL FIXED show;  FIXED AND SHOW (NORMAL HEIGHT);");
							butterflyIsFlying('0px','');

							butterflyLaunchFunctionTwo = false;	
							butterflyLaunchFunctionOne = true;
							butterflyLaunchFunctionThree = true;
							butterflyLaunchFunctionFour = true;

						}
					}
					hiddenSmartCanBeFixed = true;
				}
				else if($(document).scrollTop() > offsetButterfly)
				{
					if($(document).scrollTop() >= watchScrollButterfly && $(document).scrollTop() >= offsetButterfly)
					{
						if(butterflyLaunchFunctionTwo === true)
						{
							if(parametres.butterflyAnimation === "hiddenAnimation")
							{
								if(hiddenSmartCanBeFixed === true)
								{
										console.log('[03] hidden : FIXED cache;');	
										//butterflyHidden();
										butterflyIsFlying('-'+outerHeightButterfly+'px','');
								}
								else
								{
								
										console.log("[04] Hidden : NOT FIXED YET;");
										butterflyIsNotFlying();
								}
							}
							else if(parametres.butterflyAnimation === "lineAnimation")
							{
								console.log('[03] line : FIXED AND HEIGHT : 2px;');
								//butterflyLine();
								butterflyIsFlying('0px','2px');
							}
							else
							{
								console.log('[03] Normal : FIXED');	
								butterflyIsFlying('0px','');
							}
							butterflyLaunchFunctionTwo = false;
							butterflyLaunchFunctionThree = true;
							butterflyLaunchFunctionOne = true;
							butterflyLaunchFunctionFour = true;
						}
					}
					else
					{
						if(butterflyLaunchFunctionThree === true)
						{
							if(parametres.butterflyAnimation === "hiddenAnimation")
							{
								if(hiddenSmartCanBeFixed === true)
								{
										console.log("[05] Hidden : STILL FIXED show; ");
										butterflyIsFlying('0px','');
								}
								else
								{
										console.log("[06] Hidden : NOT FIXED; ");
										butterflyIsNotFlying();
								}
							}
							else
							{
								console.log("[05] Normal : STILL FIXED ; line : FIXED AND SHOW (NORMAL HEIGHT);");
								butterflyIsFlying('0px','');
							}
							butterflyLaunchFunctionThree = false;
							butterflyLaunchFunctionOne = true;
							butterflyLaunchFunctionTwo = true;
							butterflyLaunchFunctionFour = true;
						}
					}
				}
				else
				{
					if(butterflyLaunchFunctionOne === true)
					{
						butterflyIsNotFlying();
						console.log("[0]Scroll au dessus de l'element");
						hiddenSmartCanBeFixed = false;
						butterflyLaunchFunctionOne =  false;
						butterflyLaunchFunctionThree = true;
						butterflyLaunchFunctionTwo = true;
						butterflyLaunchFunctionFour =  true;
					}
				}
		
				watchScrollButterfly = $(document).scrollTop(); // fin du scroll mise a jour du watch
				event.stopPropagation();
				return false;
			});



        });
    };
})(jQuery);