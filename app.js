var express = require('express');
var bodyParser= require('body-parser');
var mongojs = require("mongojs");
var db= mongojs('print_db', ['jobs']);
port = process.env.PORT || 3000;

var app= express();
var cors=require('cors');

app.use(cors({origin: '*'}));
app.use(bodyParser.json());



app.get('/', function(req, res, next){
	res.send('Hello World');

});

//Get all Items
app.get('/api/jobs', function(req, res, next){
	//res.send('List active print jobs');
	db.jobs.find( function(err, docs){
		if(err)
		{
			res.send(err);
		}
		console.log('Work requests found!');
		res.json(docs);

	});

});

//Fetch Single Item
app.get('/api/jobs/:id', function(req, res, next){
	//res.send('Get one item'+req.params.id);
	db.jobs.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, doc){
		if(err)
		{
			res.send(err);
		}
		console.log('product found!');
		res.json(doc);

	});

});

//fetch an item by p_Name
app.get('/api/jobs/findByName/:p_Name', function(req, res, next){
	//res.send('Get one item'+req.params.id);
	console.log(req.params.p_Name);
	db.jobs.find({p_Name: ''+req.params.p_Name}, function(err, docs){
		if(err)
		{
			res.send(err);
		}
		console.log('product found!');
		res.json(docs);

	});

});
//Fetch an item by student ID
app.get('/api/jobs/findByID/:p_ID', function(req, res, next){
	//res.send('Get one item'+req.params.id);
	console.log(req.params.p_Name);
	db.jobs.find({p_ID: req.params.p_ID}, function(err, docs){
		if(err)
		{
			res.send(err);
		}
		console.log('product found!');
		res.json(docs);

	});

});

//Fetch an item by print compelte status
app.get('/api/jobs/findByFormStatus/:form_Complete', function(req, res, next){
	//res.send('Get one item'+req.params.id);
	console.log(req.params.form_Complete);
	db.jobs.find({form_Complete: 0}, function(err, docs){
		if(err)
		{
			res.send(err);
		}
		//console.log('found an incomplete form');
		console.log(docs);
		res.json(docs);

	});

});



//Submit data to API
app.post('/api/jobs', function(req, res, next){
	//res.send('Add Item');
	db.jobs.insert(req.body, function(err, doc){
	if(err)
	{
		res.send(err);
	}
	console.log('Adding print');
	res.json(doc);
	});
});

//Update an item
app.put('/api/jobs/:id', function(req, res, next){
	//res.send('Update job '+req.params.id);
	db.jobs.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},update:{
		$set:{
			//Name:req.body.Name,
			//ID:req.body.ID,
			//StartTime:req.body.StartTime,

			p_fName: req.body.p_fName,
			p_lName: req.body.p_lName,
			p_ID: req.body.p_ID,
			p_Email: req.body.p_Email,
			p_FileName: req.body.p_FileName,
			p_Phone: req.body.p_Phone,
			p_MakerNameA: req.body.p_MakerNameA,
			p_MakerNameP: req.body.p_MakerNameP,
			p_Date: req.body.p_Date,
			//Time_S: req.body.Time_S,
			//Time_F: req.body.Time_F,
			p_Infill: req.body.p_Infill,
			p_Filament: req.body.p_Filament,
			p_Success: req.body.p_Success,
			Comment: req.body.Comment,
			//more fields in here
		}
	},new: true}, function(err,doc){
		if(err)
		{
			res.send(err);
		}
		console.log('item modified');
		res.json(doc);
	})

});


//Delete an item
app.delete('/api/jobs/:id', function(req, res, next){
	//res.send('Delete: '+req.params.id);
	db.jobs.remove({_id: mongojs.ObjectId(req.params.id)},function(err,doc){
		if(err)
		{
			res.send(err);
		}
		console.log('Removing Product');
		res.json(doc);
	});
});

//Enable cross domain resource utility, essentially making a public API. weeee
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Weird shit to make a public API work
app.listen(port,'0.0.0.0', function(){
	console.log("Server started on port "+ port);
});
