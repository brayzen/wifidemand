var mocha = require('mocha')
var chai = require('chai').expect
var Location       = require('../app/models/location');
var Customer       = require('../app/models/customer');
var LocNames       = require('../app/models/locationNames');
var User           = require('../app/models/user');


var reqData = {
  name: "TEST NAME",
  description: "TEST DESCRIPTION",
  target: "TEST TARGET",
  summary: "TEST SUMMARY",
  reqNum: 140,
  options: {opts: ['Test Option 1', 'Test Option 2', 'Test Option 3']}
}
describe('Location', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      console.log(reqData);
      console.log('^^^^^^^^^^^^^^^^')
      new Location(reqData).save(function(err, result){
        if (err) { console.error(err);}
        console.log(result);
        done();
      });
    });
  });
});

describe('LocName', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      console.log(reqData.name);
      console.log('^^^^^^^^^^^^^^^^')
      console.log('^^^^^^^^^^^^^^^^')
      new LocNames(reqData.name).save(function(err, result){
        if (err) {console.log(err);}
        console.log(result);
        done();
      });
    });
  });
});
