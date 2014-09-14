/* Candidates.js
*  ==========================================
*  1. Sets up the MongoDB server
*  2. Creates the RESTful endpoints (GET, POST, PUT, DELETE)
*  */
var express = require('express');
var router = express.Router();

/* Setting up Mongoose ====================== */
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
mongoose.connect('mongodb://localhost/test');

/* Setting up the Mongoose Model ===========  */
var CandidateModel = mongoose.model('Candidate', {
    name: {required: true, type: String},
    email: {required: true, type: String, unique: true }
});

        /* SWITCH THIS ON ONCE TO PUT IN JOHN CASTLE */
        /*var candidate = new CandidateModel({
            name: "John Castle",
            email: "john.castle@email.com"
        });
        candidate.save(function(err, results) {
            if (err) console.log(err);
            else console.log(results);
        });*/

// RESTful Endpoints (CRUD operations)
router.get('/candidates/:id', function(req, res) {
    // Read a single candidate and return it
    CandidateModel.findOne({ _id: req.params.id }, function(err, results){
        if (err) res.json('500', 'Something went wrong with .findOne() ');
        else res.json(results);    // Returns the JSON data back to the client
    });
});

router.get('/candidates', function(req, res) {
    CandidateModel.find(function(err, results) {
        if (err) return res.json('500', 'Something went wrong with .find()');
        else res.json(200, results);
    });
});

router.post('/candidates', function(req, res) {
    (new CandidateModel({
        name: req.body.name,
        email: req.body.email
    })).save(function (err, data){
            if (err) res.json(500, 'Something went wrong with .save() ');
            else res.json(200, data);
        });
});

router.put('/candidates/:id', function(req, res) {
    // Search function to update single candidate
    CandidateModel.findByIdAndUpdate(req.params.id, {name: req.body.name}, {}, function(err, results) {
        if (err) res.json('500', 'Something went wrong with .findByIdAndUpdate');
        else res.json(200, results);
    });
});

router.delete('/candidates/:id', function(req, res) {
    CandidateModel.findByIdAndRemove( req.params.id, function(err, results) {
        if (err) res.json('500', 'Something went wrong with .findByIdAndRemove');
        else res.json(200, results);
    });
});


module.exports = router;

