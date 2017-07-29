const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 3000));


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// error handling middleware
app.use(function(err, req, res, next){
console.log(err); // to see properties of message in our console
res.status(422).send({error: err.message});
});

app.get('/', function(req,res){
	res.render('index');
})

app.get('/:date', function(req,res){
	var date = {
		unix:0001,
		natural:"September 11, 1991"
	}

	var arr = req.params.date.split(/[ ,%]+/);

	//if length is 1 and is a number then probaby a unix timestamp
	if (arr.length === 1 && isNaN(arr[0]) === false) {
		var natural = formatDate(new Date(parseInt(arr[0])));
		res.json({unix:arr[0], natural:natural})
	}  
	else if (arr.length === 3 && validMonth(arr[0]) && validDay(arr[1]) && validYear(arr[2])) {
		var date = new Date(jsUcfirst(arr[0]) + ' ' +  arr[1] + ', ' + arr[2]);
		var milli = date.getTime();

		res.json({unix:milli,natural:jsUcfirst(arr[0]) + ' ' +  arr[1] + ', ' + arr[2]})
	} 
	else {
		res.json({unix:null,natural:null})
	}
})


//Helper functions
function jsUcfirst(string) 
{
	var string = string.toLowerCase();
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function validMonth(input) {
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December", "Jan", 
		"Feb", "Mar", "Apr", "Aug", 
		"Sept", "Oct", "Nov", "Dec"
		];

	if (isNaN(input) && monthNames.includes(jsUcfirst(input))) {
		return true;
	}	
	return false;
}

function validDay(input) {
	if (!isNaN(input) && input.length <= 2) {
		return true;
	}
	return false;
} 

function validYear(input) {
	if (!isNaN(input) && input.length === 4) {
		return true;
	}
	return false;
}

function formatDate(date) {
	var monthNames = [
	"January", "February", "March",
	"April", "May", "June", "July",
	"August", "September", "October",
	"November", "December"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return monthNames[monthIndex] + ' ' +  day + ', ' + year;
}



// listen for requests
app.listen(process.env.port || app.get('port'), () => {
console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});