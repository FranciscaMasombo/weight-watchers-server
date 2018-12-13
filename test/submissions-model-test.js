
const Submission = require('../models/submissions-model' );


const chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);
let expect = chai.expect;
const server=require('../bin/www');
let _ = require('lodash');

const mongoose=require('mongoose');
const after = require("lodash");
const assert = require("assert");
var db = mongoose.connection;
mongoose.Promise = global.Promise;
const mongodbUri = 'mongodb://test:test123@ds253203.mlab.com:53203/ccwtracker-test';
mongoose.connect(mongodbUri,{useNewUrlParser: true})

//Connectiontothedbbeforetest
   db.once('open',function(){
        console.log('ConnectionhasbeenmadetotheDatabase')
    });
       db.on('error',function(error){
        console.log('ConnectionError',error)
    });

describe('SUBMISSION TESTS',function(){
    beforeEach((done) =>{
       if( Submission != null){
    mongoose.connect(mongodbUri,{useNewUrlParser: true}, function () {
        mongoose.connection.db.dropDatabase();
        done()
    } );
        }else {
    //Submission.deleteMany(); Submission.remove
    Submission.remove(function (err) {
        if (err) {
            done();
        } else {
            var submission1 = new Submission();
            submission1._id = "5be0ac62fb6fc061430eb239";
            submission1.fname = 'Rufaro';
            submission1.lname = 'Frano';
            submission1.email = 'sam.white@gmail.com';
            submission1.number = '89728128939';
            submission1.gender = 'male';
            submission1.age = 21;
            submission1.startWeight = 245;
            submission1.goalWeight = 78;
            submission1.currentWeight = 90;
            submission1.height = 78;
            submission1.location = 'dublin';
            submission1.date = '2018-09-12';
            submission1.note = 'icantwaittogetstarted';
            submission1.save(function (err) {
                if (err)
                    console.log(err);
                else {
                    var submission2 = new Submission();
                    submission2._id = "5be0ac62fb6fc081630eb229";
                    submission2.fname = 'Sarah';
                    submission2.lname = 'Read';
                    submission2.email = 'sam.white@gmail.com';
                    submission2.number = '89728128939';
                    submission2.gender = 'male';
                    submission2.age = 21;
                    submission2.startWeight = 245;
                    submission2.goalWeight = 78;
                    submission2.currentWeight = 90;
                    submission2.height = 78;
                    submission2.location = 'dublin';
                    submission2.date = '2018-09-12';
                    submission2.note = 'icantwaittogetstarted';
                    submission2.save(function (err) {
                        if (err)
                            console.log(err);
                        else {
                            done();
                        }
                    })
                }
            })
        }
    })
}
    });

    describe('Is there anything in the database', ()=> {
        it('Is there anything in the database', function (done) {
            Submission.find().then(function (res) {
                assert(res);
                done()
            })
        })
    })

    describe('POST/add-submission',() =>{
    it('should add a new member',(done) =>{
        var Submission ={
            fname: 'jeff',
            lname: 'stevens',
            email: 'sam.white@gmail.com',
            number: '89728128939',
            gender: 'male',
            age: 21,
            startWeight: 245,
            goalWeight: 78,
            currentWeight: 90,
            height: 78,
            location: 'dublin',
            date: '2018-09-12',
            note: 'icantwaittogetstarted'
        };
        chai.request(server)
            .post('/add-submission')
            .send(Submission)
            .end(function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('The new member has been added');
                done();
            });
    });
    it('should return error new member not added and a 400 error',(done)=>{
        var Submission ={
            'name':'kim',
            'age':21,
            'gender':'male',
            'goalWeight':78,
            'currentWeight':90,
            'height':78,
            'location':'dublin',
            'date':'2018-09-12'
        };
        chai.request(server)
            .post('/add-submission')
            .send(Submission)
            .end(function(err,res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('Please make sure that you have entered all fields');
                done();
            })
    })
    });

    describe('PUT /update-submission/:id',()=>{
        it('should update one submission in database',(done)=>{
            var update ={'lname':'Fran'};
            chai.request(server)
                .put('/update-submission/5be0ac62fb6fc061430eb239')
                .send(update)
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('message').equal('Updated')
                    done()
                })
        })
        })

    describe('Get/listOneSubmission/:id', function () {
    it('should find one submission by id', function (done) {
        chai.request(server)
            .get('/listOneSubmission/5be0ac62fb6fc061430eb239')
            .end(function (err, res) {
                    expect(res.body).to.have.property('message').equal('Member found')
                    done()
            })
    })
    it('should return an error message and a 404 error', function (done) {
        chai.request(server)
            .get('/listSubmissions/00000000080000')
            .end(function (err, res) {
                expect(res).to.have.status(404);

                done()
            })
    })
    })

    describe('DELETE /delete-submission/:id', function () {
        it('should delete ', function (done) {
            chai.request(server)
                .delete('/delete-submission/5be0ac62fb6fc061430eb239')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    it('should return an error message and a 400 error', function (done) {
            chai.request(server)
                .delete('/delete-submission/5be0ac62fb6fc06143')
                .end(function (err, res) {
                    expect(res.body).to.have.property('message').equal('The member has not been deleted ');
                    done();
                });
        }
    );
});

after(()=>{
    Submission.deleteMany({}, (err) => {
        if (err) throw err;
        mongoose.connect(mongodbUri,{useNewUrlParser: true}, function () {
            mongoose.connection.db.dropDatabase();
        } );
    });
})

});
