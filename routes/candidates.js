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
var candidateSchema = mongoose.Schema({
    name: {required: true, type: String},
    email: {required: true, type: String, unique: true }
});
var Candidate = mongoose.model('Candidate', candidateSchema);
// Model name is Candidate, database name will be candidates in MongoDB

        // SWITCH THIS ON ONCE TO PUT IN JOHN CASTLE
        /*var candidate = new CandidateModel({
            name: "John Castle",
            email: "john.castle@email.com"
        });
        candidate.save(function(err, results) {
            if (err) console.log(err);
            else console.log(results);
        });*/


// RESTful Endpoints (CRUD operations)

router.get('/:id', function(req, res) {
    // Read a single candidate and return it
    Candidate.findOne({ _id: req.params.id }, function(err, results){
        if (err) res.json('500', 'Something went wrong with .findOne() ');
        else res.json(results);    // Returns the JSON data back to the client
    });
});

// Uses /candidates (middleware)
router.get('/', function(req, res) {
    Candidate.find(function(err, results) {
        if (err) { return res.json('500', 'Something went wrong with .find()'); }
        else { res.json(200, results); }
    });
});

// Uses /candidates (middleware)
router.post('/', function(req, res) {
    (new Candidate({
        name: req.body.name,
        email: req.body.email
    })).save(function (err, data){
            console.log(data);
            if (err)  { res.json(500, 'Something went wrong with .save()' ); }
            else { res.json(200, data); }
        });
});

// Uses /candidates/:id (middleware)
router.put('/:id', function(req, res) {
    // Search function to update single candidate
    Candidate.findByIdAndUpdate(req.params.id, {name: req.body.name}, {}, function(err, results) {
        if (err) res.json('500', 'Something went wrong with .findByIdAndUpdate');
        else res.json(200, results);
    });
});

// Uses /candidates/:id (middleware)
router.delete('/:id', function(req, res) {
    Candidate.findByIdAndRemove( req.params.id, function(err, results) {
        if (err) res.json('500', 'Something went wrong with .findByIdAndRemove');
        else res.json(200, results);
    });
});


module.exports = router;

