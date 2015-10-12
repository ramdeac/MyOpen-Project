var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	sendgrid  = require('sendgrid')(apiKeyId, apikeyPassword);


app.use(bodyParser());

//Routes
var router = express.Router();


//Api base router
app.use('/api/v1', router);


//
app.get('/', function (req, res) {
	res.send("This API is retrun a html index!");
});

//Test router API
router.get('/', function (req, res) {	
	res.json({message : 'Market Prêmios, node webapi is working'});	
});


//api to send emial
router.post('/email/send', function (req, res) {

	res.json(req.body);

	sendgrid.send({
		  to:       'teste@teste.com.br',
		  from:     'noreply@teste.com.br',
		  subject:  '[MP0001] - '+ req.body.name + 'quero saber quando o site tive pronto!',
		  text:     'Meu e-mail é ' + req.body.email,
	}, function(err, json) {
		  if (err) { return console.error(err); }
		  console.log(json);
	});

})


app.listen(3000);
console.log('Api is running on port 3000');