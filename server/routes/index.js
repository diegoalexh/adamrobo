var express = require('express');
var router = express.Router();
var patientService = require('../PatientService')

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
router.post('/images',  function(req, res){
  patientService.storeImage(req,res);
});
router.get("/images/:_id", function(req, res){ 
  patientService.getImage(req,res);
 });
router.get("/analyze/image/:_id", function(req, res){ 
  patientService.analyzeImage(req, res);
});

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.array('file', 12), function (req, res, next) {
    console.log(req.files[0].path)
    patientService.storeImageBlob(res, req.files[0].path)
});

module.exports = router;
