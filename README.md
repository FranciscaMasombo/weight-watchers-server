# weight-watchers-server          [![Build Status](https://travis-ci.org/FranciscaMasombo/weight-watchers-server.svg?branch=master)](https://travis-ci.org/FranciscaMasombo/weight-watchers-server)            [![Coverage Status](https://coveralls.io/repos/github/FranciscaMasombo/weight-watchers-server/badge.svg?branch=master)](https://coveralls.io/github/FranciscaMasombo/weight-watchers-server?branch=master)



### Table of contents

<!--ts-->
   * [Contact info](#Contact-info)
   * [Overview](#Overview)
   * [API endpoints](#API-endpoints)
   * [Data storage](#Data-storage)
      * [STDIN](#stdin)
      * [Local files](#local-files)
   * [Testing](#Testing)
     * [Sample Test execution](#Sample-Test-execution)
     * [Continuous Integration and Test results](#Continuous-Integration-and-Test-results)
   * [Code](#Code)
   * [Build Setup](#Build-Setup)
   * [Web Application](#Client)
<!--te-->
### Contact info
Name  : Fran

Email : Frmm97@gmail.com

## Overview
Assignment for Web dev
This is the server for the Client the

## API endpoints
![Screenshot](https://github.com/FranciscaMasombo/weight-watchers-server/blob/master/photos/Capture.PNG)

## Data storage

````bash

let SubmissionSchema =  new mongoose.Schema({
    fname: { type:String, required: true},
    lname: { type:String, required: true},
    email: { type: String, required: true },
    number: { type: String, required: true },
    gender: { type:String, required: true},
    age: { type: Number, min: 16, max: 100, required: true },
    startWeight: { type:Number, required: true },
    goalWeight:{ type:Number, required: true },
    currentWeight:{ type:Number, required: true},
    height:{ type:Number},
    location:{ type:String, required: true },
    date: { type: Date, default: Date.now, },
    note: {type: String, required: true},
    user: {type: UserSchema.ObjectId, ref: 'user'},
},  {collection: 'sub'});

````

## Client

## Testing

    $ npm cross-env NODE_ENV=test nyc --reporter=lcov --reporter=text mocha test/submissions-model-test.js
    $ npm cross-env NODE_ENV=test PORT=4000 nyc mocha test/submissions-model-test.js",
    $ npm nyc report --reporter=text-lcov | coveralls

### Continuous Integration and Test results

#### Build Status         [![Build Status](https://travis-ci.org/FranciscaMasombo/weight-watchers-server.svg?branch=master)](https://travis-ci.org/FranciscaMasombo/weight-watchers-server)

https://travis-ci.org/FranciscaMasombo/weight-watchers-server

```bash
➥  SUBMISSION TESTS
     Is there anything in the database
 Successfully Connected to [ ccwtracker-test ]
 ConnectionhasbeenmadetotheDatabase
       √ Is there anything in the database (117ms)
     POST/add-submission
 POST /add-submission 200 1106.255 ms - 43
       √ should add a new member (1139ms)
 POST /add-submission 401 11.096 ms - 1571
       √ should return error new member not added and a 400 error
     PUT /update-submission/:id
 (node:12004) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
 PUT /update-submission/5be0ac62fb6fc061430eb239 200 569.077 ms - 21
       √ should update one submission in database (575ms)
     Get/listOneSubmission/:id
 GET /listOneSubmission/5be0ac62fb6fc061430eb239 200 327.217 ms - 26
       √ should find one submission by id (332ms)
 GET /listSubmissions/00000000080000 404 20.980 ms - 41
       √ should return an error message and a 404 error
     DELETE /delete-submission/:id
 DELETE /delete-submission/5be0ac62fb6fc061430eb239 200 243.456 ms - 23
       √ should delete  (250ms)
 DELETE /delete-submission/5be0ac62fb6fc06143 200 2.396 ms - 278
       √ should return an error message and a 400 error


   8 passing (5s)

```

#### Coverage     [![Coverage Status](https://coveralls.io/repos/github/FranciscaMasombo/weight-watchers-server/badge.svg?branch=master)](https://coveralls.io/github/FranciscaMasombo/weight-watchers-server?branch=master)
```bash
➥
=============================== Coverage summary ===============================
Statements   : 62.5% ( 120/192 )
Branches     : 21.05% ( 8/38 )
Functions    : 31.43% ( 11/35 )
Lines        : 62.83% ( 120/191 )
================================================================================
The command "npm run coverage" exited with 0.
```
## Code

``` bash
// Custom Routes
//gets
app.get('/listSubmissions', subs.displayAll);
app.get('/listOneSubmission/:id', subs.findSubmissionById);
app.get('/findByLocation/:location', subs.findByLocation);
//posts
app.post('/add-submission',subs.addSubmissions);
//puts
app.put('/update-submission/:id',subs.updateSubmission);
//deletes
app.delete('/delete-submission/:id',subs.deleteSubmission);
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
