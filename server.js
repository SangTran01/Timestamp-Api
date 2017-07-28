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

// app.get('/api/todos', (req, res, next) => {
// 	Todo.find({}).then(function(todos){
// 		res.send(todos);
// 	}).catch(next);
// });

// app.post('/api/todos', (req,res, next) => {
// 	console.log("REQ BODY");
// 	console.log(req.body);
// 	Todo.create(req.body).then((todo) => {
// 		//get object put into app
// 		console.log("Going Back to client");
// 		res.send(todo);
// 	}).catch(next);
// });

// app.put('/api/todos', (req, res, next) => {
// 	console.log('update req body');
// 	console.log(req.body.params);

// 	Todo.findByIdAndUpdate({_id: req.body.params._id}, req.body.params)
// 		.then(function(){
// 			Todo.findOne({_id: req.query.id}).then(function(todo){
// 				res.send(todo);
// 			});
// 		}).catch(next);
// });

// app.delete('/api/todos', (req, res, next) => {
// 	console.log('delete req body');
// 	console.log(req);
// 	Todo.findByIdAndRemove({_id: req.query._id}).then(function(todo){
// 		res.send(todo);
// 	}).catch(next);
// });



// listen for requests
app.listen(process.env.port || app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});