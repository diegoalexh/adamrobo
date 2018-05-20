const Patient = require('./PatientModel');
const ReadPreference = require('mongodb').ReadPreference;
var db = require('./mongo').connect();
var fs = require('fs');

var gridfs;
var gfs;
db.then(resp=> {
	gridfs = require('mongoose-gridfs')({
	  collection:'files',
	  model:'Attachment',
	  mongooseConnection: resp.db
	});
	//obtain a model
	Attachment = gridfs.model;
})

function get(req,res){
	const docquery = Patient.find({}).read(ReadPreference.NEAREST);
	docquery
	.exec()
	.then(patients =>{
		res.json(patients)
	})
	.catch(err=> {
		res.status(500).send(err);
	});
}
function create(req,res){
	const { name, score, image_ref} = req.body;
	const patient = new Patient({name,score,image_ref})
	patient
	.save()
	.then(() => {
		res.json(patient)
	}).catch(err=>{
		res.status(500).send(err)
	})
}
function update(req,res){
	const {_id, name, score, image_ref} = req.body;

	Patient.findOne({_id})
	.then(patient => {
		patient.name = name;
		patient.score = score;
		patient.image_ref = image_ref;
		patient.save().then(res.json(patient))
	})
	.catch(err => {
		res.status(500).send(err);
	});
}
function destroy(req,res){
	const {_id} = req.params;
	console.log('deleting ', _id);
	Patient.findOneAndRemove({id: _id})
	.then(patient=>{
		res.json(patient);
	})
	.catch(err => {
		res.status(500).send(err);
	});
}

function storeImage(req,res){
		const { image } = req.body;
		let base64Image = image.split(';base64,').pop();
		var filename = 'src/uploads/image.png';
		fs.writeFile(filename, base64Image, {encoding: 'base64'}, function(err, file) {
   			 console.log('File created');
   			 Attachment.write({
					filename:filename,
					},
					fs.createReadStream(filename),
						function(error, savedAttachment){
							 res.json(savedAttachment )
					 	});
		});
		
	
}

function getImage(req,res){
	  const {_id} = req.params;
	  	Attachment.readById(_id, function(error, content){
	  		res.setHeader('Content-Type', 'image/png');
	  		res.send(content)
		});
}


module.exports = {
	get,create, update, destroy,storeImage , getImage
};