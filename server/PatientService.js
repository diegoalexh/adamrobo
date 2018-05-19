const Patient = require('./PatientModel');

const ReadPreference = require('mongodb').ReadPreference;


var db = require('./mongo').connect();

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
	const { name, score, image} = req.body;
	const patient = new Patient({name,score,image})
	patient
	.save()
	.then(() => {
		res.json(patient)
	}).catch(err=>{
		res.status(500).send(err)
	})
}
function update(req,res){
	const {_id, name, score, image} = req.body;

	Patient.findOne({_id})
	.then(patient => {
		patient.name = name;
		patient.score = score;
		patient.image = image;
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
   var mongoDriver = db.mongo;
   console.log(db)
   var gfs = new Gridfs(db, mongoDriver);
   var writestream = gfs.createWriteStream({
     filename: req.files.file.name,
     mode: 'w',
     content_type: req.files.file.mimetype,
     metadata: req.body
   });
   fs.createReadStream(req.files.file.path).pipe(writestream);
   writestream.on('close', function(file) {
      User.findById(req.params.id, function(err, user) {
        // handle error
        user.file = file._id;
        user.save(function(err, updatedUser) {
          // handle error
          return res.json(200, updatedUser)
        })
      });
      fs.unlink(req.files.file.path, function(err) {
        // handle error
        console.log('success!')
      });
   });
}


module.exports = {
	get,create, update, destroy
};