var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/8marcha', function (req, res) {
	res.sendFile(__dirname + '/public/8marcha.html');
});

app.listen(3001, function () {
  console.log('App listening on port 3001!');
});

