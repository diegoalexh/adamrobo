const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const patientSchema = new Schema ({
	name: String,
	score: Number

});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;