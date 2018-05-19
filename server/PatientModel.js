const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const patientSchema = new Schema ({
	id: { type: Number, required: true, unique: true},
	name: String,
	score: Number



});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;