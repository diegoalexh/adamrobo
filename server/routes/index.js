var express = require('express');
var router = express.Router();
var patientService = require('../PatientService')
var Gridfs = require('gridfs-stream');
var multiparty = require('connect-multiparty')();

router.get('/patients', function(req, res, next) {
  patientService.get(req,res);
});
router.post('/patient', function(req, res, next) {
  patientService.create(req,res);
});
router.put('/patient', function(req, res, next) {
  patientService.update(req,res);
});
router.delete('/patient/:id', function(req, res, next) {
  patientService.destroy(req,res);
});

router.post('/upload/:id', multiparty, function(req, res){
	patientService.storeImage(req,res);
});

module.exports = router;