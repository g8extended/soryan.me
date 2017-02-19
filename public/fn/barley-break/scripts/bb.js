(function($){

	$.bb = {
		screens : {}
	};

	function checking() {
		var checkarr = [];
		$('#table').find('.pebble').each(function(el){
			$this = $(this);
			checkarr.push($this.data('position'));
		});

		if (checkarr.join('') == "01234567")
			return true;
		else
			return false;
	}

	$.extend($.bb.screens, {
		'splashScreen' : {
			'run' : function(){
				$.bb.showScreen('splashScreen');

				$('#bbg').on('click', '#splashScreen', function(){
					$.bb.screens.menuScreen.run();
				});
			}
		},

		'menuScreen' : {
			'run' : function(){
				$.bb.showScreen('menuScreen');

				$('#menuScreen')
					.on('click', '#startbutton', function(){
						$.bb.screens.gameScreen.run();
					})
					.on('click', '#highscorebutton', function(){
						//$.bb.screens.highscorebutton.run();
					})
					.on('click', '#exitbutton', function(){
						$.bb.screens.splashScreen.run();
					});
			}
		},

		'gameScreen' : {
			'run' : function(){
				$.bb.showScreen('gameScreen');

				var size = 1.6,
					empty_pos = 15,
					startArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
				    friends = [
						[1,4],
						[0,2,5],
						[1,3,6],
						[2,7],
						[0,5,8],
						[1,4,6,9],
						[2,5,7,10],
						[3,6,11],
						[4,9,12],
						[5,8,10,13],
						[6,9,11,14],
						[7,10,15],
						[8,13],
						[9,12,14],
						[10,13,15],
						[11,14]
					];

				function arrayShuffle(oldArray) {
					var newArray = oldArray.slice(),
				 	    len = newArray.length,
					    i = len;
					 while (i--) {
					 	var p = parseInt(Math.random()*len);
						var t = newArray[i];
				  		newArray[i] = newArray[p];
					  	newArray[p] = t;
				 	}
					return newArray;
				};

				function spacing(table, newpositions, size)
				{
					$.each(newpositions, function(index, value) {
						$('<div>', {'class' : 'pebble'})
							.append($('<span>', {'text':(index+1)}))
							.data('position', value)
							.css({
								'top' : Math.floor(value/4)*size+'em',
								'left' : (value % 4)*size+'em'
							})
							.appendTo(table);
					});
				};

				spacing($('#table'), arrayShuffle(startArray), 1.6);

				$('#table').on('click', '.pebble', function(){

					var curpos = $(this).data('position'),
					    friend = friends[curpos].indexOf(empty_pos);

					if ( friend != -1)
					{
						var newpos = friends[curpos][friend];
						empty_pos = curpos;
						$(this)
							.animate({
								'top': Math.floor(newpos/4)*size+'em',
								'left':(newpos % 4)*size+'em'
							})
						    .data('position', newpos);
					}

					friend = -1;

					if (checking())
					{
						alert('GAME OVER...');
						do{
							spacing(arrayShuffle([0,1,2,3,4,5,6,7]));
						} while (checking());
					}
				});
			}
		}

	});

	$.extend($.bb, {
		showScreen : function (screenName)
		{
			$('.bbgs.active').removeClass('active');
			$('#'+screenName).addClass('active');
		},

		letsStart : function()
		{
			$.bb.screens.splashScreen.run();
		}
	});


	$.bb.letsStart();





})(jQuery)