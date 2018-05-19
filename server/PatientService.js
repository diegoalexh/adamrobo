const Patient = require('./PatientModel');

const ReadPreference = require('mongodb').ReadPreference;


require('./mongo').connect();

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
	const {id, name, score} = req.body;
	const patient = new Patient({id,name,score})
	patient
	.save()
	.then(() => {
		res.json(patient)
	}).catch(err=>{
		res.status(500).send(err)
	})
}
function update(req,res){
	const {id, name, score} = req.body;

	Patient.findOne({id})
	.then(patient => {
		patient.name = name;
		patient.score = score;
		patient.save().then(res.json(patient))
	})
	.catch(err => {
		res.status(500).send(err);
	});
}
function destroy(req,res){
	const {id} = req.params;
	Patient.findOneAndRemove({id})
	.then(patient=>{
		res.json(patient);
	})
	.catch(err => {
		res.status(500).send(err);
	});
}
module.exports = {
	get,create, update, destroy
};