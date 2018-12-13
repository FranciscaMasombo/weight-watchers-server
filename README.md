# weight-watchers-server         [![Build Status](https://travis-ci.org/FranciscaMasombo/weight-watchers-server.svg?branch=master)](https://travis-ci.org/FranciscaMasombo/weight-watchers-server)

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

## Data storage

## Client

## Testing

     $ npx cypress run --spec cypress/integration/tests addsubs.spec.js
     $ npx cypress run --spec cypress/integration/tests home.spec.js
     $ mocha test/submissions-model-test.js

### Sample Test execution


```bash
➥ make test
  SUBMISSION TESTS
    Is there anything in the database
Successfully Connected to [ ccwtracker-test ]
ConnectionhasbeenmadetotheDatabase
      ✓ Is there anything in the database (547ms)
    POST/add-submission
POST /add-submission 200 556.721 ms - 43
      ✓ should add a new member (572ms)
POST /add-submission 401 3.758 ms - 1571
      ✓ should return error new member not added and a 400 error
    PUT /update-submission/:id
(node:5587) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
PUT /update-submission/5be0ac62fb6fc061430eb239 200 541.191 ms - 21
      ✓ should update one submission in database (543ms)
    Get/listOneSubmission/:id
GET /listOneSubmission/5be0ac62fb6fc061430eb239 200 536.411 ms - 26
      ✓ should find one submission by id (539ms)
GET /listSubmissions/00000000080000 404 6.104 ms - 5395
      ✓ should return an error message and a 404 error
    DELETE /delete-submission/:id
DELETE /delete-submission/5be0ac62fb6fc061430eb239 200 539.162 ms - 23
      ✓ should delete  (541ms)
DELETE /delete-submission/5be0ac62fb6fc06143 200 1.506 ms - 278
      ✓ should return an error message and a 400 error
  8 passing (7s)
```
### Continuous Integration and Test results

. .https://travis-ci.org/FranciscaMasombo/weight-watchers-client

> A Vue.js project
## Code

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

## Client

