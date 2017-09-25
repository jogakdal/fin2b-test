var express = require('express');
var passwordValidator = require('password-validator');
var google = require('google')
var request = require('request')

var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('home', {
		title: 'fin2b: main'
	});
});

router.get('/checkpw', function(req, res, next) {
	res.render('checkpw', {
		title: 'fin2b: Password validation',
		valid: 'N/A'
	});
});

router.post('/checkpw', function(req, res, next) {
	var schema = new passwordValidator();
	schema
	.is().min(8) 
	.has().uppercase() 
	.has().lowercase() 
	.has().digits()
	.has().symbols();
	
	var passwd = req.body.password;
	var validate = schema.validate(passwd, { list: true })
	var result = '모든 조건을 만족합니다.'
	if (validate.length != 0) {
		result = '패스워드는 ';
		if (validate[0] == 'min') result = result + '8자 이상이어야 합니다.';
		else if (validate[0] == 'uppercase') result = result + '한 개 이상의 대문자를 가져야 합니다.';
		else if (validate[0] == 'lowercase') result = result + '한 개 이상의 소문자를 가져야 합니다.';
		else if (validate[0] == 'digits') result = result + '한 개 이상의 숫자를 가져야 합니다.';
		else if (validate[0] == 'symbols') result = result + '한 개 이상의 특수기호(!@#$%^&+=)를 가져야 합니다.';
	}
	res.render('checkpw', {
		title: 'fin2b: Password validation',
		valid: result
	});
});

router.get('/google-search', function(req, res, next) {
	res.render('google-search', {
		title: 'fin2b: Google search',
		search_result: ''
	});
});

router.post('/google-search', function(req, http_res, next) {
	google(req.body.keyword, function (err, res) {
		if (err) {
			http_res.render('google-search', {
				title: 'fin2b: Google search',
				search_result: err
			});
		}
		else {  
			http_res.render('google-search', {
				title: 'fin2b: Google search',
				search_result: res.body
			});
		}
	});
});

router.get('/fibonacci', function(req, res, next) {
	res.render('fibonacci', {
		title: 'fin2b: Getting fibonacci sequence'
	});
});

router.post('/fibonacci', function(req, res, next) {
	var value = req.body.number;
	if (value > 1476) {
		res.send({
			result: false, 
			"reason": "Too big number."
		});
	}
	else {
		var calcResult = [];
		
		calcResult[0] = 0;
		calcResult[1] = 1;
		for (i = 2; i <= value; i++) {
			calcResult[i] = calcResult[i-2] + calcResult[i-1]; 
		}
		
		console.log(calcResult[value]); 
		res.send({
			result: true, 
			"calc-result": calcResult[value]
		});
	}
});

router.get('*', function(req, res, next) {
	var redirectURL = 'https://www.google.com' + req.originalUrl;
	res.redirect(redirectURL);
});

module.exports = router;
