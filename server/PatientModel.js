const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const patientSchema = new Schema ({
	name: String,
	score: Number,
	image: String,
	created:  { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;