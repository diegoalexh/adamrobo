const Patient = require('./PatientModel');
const ReadPreference = require('mongodb').ReadPreference;
var customVisionApi  = require('./customvision/api');
var db = require('./mongo').connect();
var fs = require('fs');
var gridfs;
var gfs;
var path= require('path')
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
	const { name, email, image_ref} = req.body;
	const patient = new Patient({name,email,image_ref})
	patient
	.save()
	.then(() => {
		res.json(patient)
	}).catch(err=>{
		res.status(500).send(err)
	})
}
function update(req,res){
	const {_id, name, email, image_ref,cv_result} = req.body;
	console.log(cv_result)
	Patient.findOne({_id})
	.then(patient => {
		patient.name = name;
		patient.email = email;
		patient.image_ref = image_ref;
		patient.cv_result = cv_result;
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
		var filename = path.resolve(__dirname, '../uploads/image.png');

		fs.writeFile(filename, base64Image, {encoding: 'base64'}, function(err, file) {
   			 console.log('File created');
   			 Attachment.write({
					filename:filename,
					},
					fs.createReadStream(filename),
						function(error, savedAttachment){
							 res.json(savedAttachment )
							 fs.unlinkSync(filename);
					 	});
		});
	   
		
	
}
function storeImageBlob(res, filePath){
   		Attachment.write({
					filename:filePath,
					},
					fs.createReadStream(filePath),
						function(error, savedAttachment){
							console.log(error)
							 res.json(savedAttachment )
		});
		console.log(filePath)
		fs.unlinkSync(filePath);
		
	
}
function getImage(req,res){
	  const {_id} = req.params;
	  	Attachment.readById(_id, function(error, content){
	  		res.setHeader('Content-Type', 'image/*');
	  		res.send(content)
		});
}
function analyzeImage(req,res) {
		const {_id} = req.params;
		//var url = 'http://medicsupply.net/wp-content/uploads/2016/07/catarata.jpg'
	  	Attachment.readById(_id, function(error, content){
	  		//customVisionApi.analyzeUrl(url).then(r => {				res.json(r)			});
	  		customVisionApi.analyzeData(content).then(r => {		res.json(r)			});
		});
	
}

module.exports = {
	get,create, update, destroy,storeImage , getImage,analyzeImage ,storeImageBlob
};