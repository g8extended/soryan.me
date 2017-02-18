var friends = [
	[1,3],
	[0,2,4],
	[1,5],
	[0,4,6],
	[1,3,5,7],
	[2,4,8],
	[3,7],
	[4,6,8],
	[5,7]
];

var empty_pos = 8,
    newpos    = -1,
	expos     = -1,
	curpos    = -1;

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
		$('<div>', {'class', 'pebble'})
			.text(index+1)
			.data('position', value)
			.css({
				'top' : Math.floor(value/3)*size+'em',
				'left' : (value % 3)*size+'em'
			})
			.appendTo(table);
	}
};

function checking()
{
	var checkarr = [];
	$('.wood').find('li').each(function(el){
		$this = $(this);
		checkarr.push($this.data('pos'));
	});

	if (checkarr.join('') == "01234567")
		return true;
	else
		return false;
}


do{
	spacing(arrayShuffle([0,1,2,3,4,5,6,7]));
} while (checking());

$('.wood').on('click', 'li', function(){

	curpos = $(this).data('pos');

	var temp = friends[curpos].indexOf(empty_pos);

	if ( temp != -1)
	{
		newpos = friends[curpos][temp];
		empty_pos = curpos;
		$(this).animate({'top':positions[newpos][0], 'left':positions[newpos][1]},250);
		$(this).data('pos', newpos);
	}
	
	temp = -1;
	
	if (checking())
	{
		alert('GAME OVER...');
		do{
			spacing(arrayShuffle([0,1,2,3,4,5,6,7]));
		} while (checking());
	}
});
