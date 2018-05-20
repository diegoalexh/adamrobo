const mongoose= require('mongoose')
const Schema = mongoose.Schema;
const patientSchema = new Schema ({
	name: String,
	email: String,
	image_ref: String,
	cv_result:[],
	created:  { type: Date, default: Date.now }

});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;