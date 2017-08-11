var request = require('supertest');

var app = require("../app");

describe('app.js - GET /', function(){
  it('Default GET returns 200', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Wait GET returns text wait message', function(done){
    var wait = 50;

    request(app)
      .get('/?wait='+wait)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done);
  });
});

describe('app.js - POST /', function(){
  it('Default POST returns 200', function(done){
    request(app)
      .post('/')
      .expect(200, done);
  });

  it('Text Wait POST returns text wait message', function(done){
    var wait = 50;

    request(app)
      .post('/')
      .send('wait='+wait)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done);
  });

  it('JSON Wait POST returns text wait message', function(done){
    var wait = 50;

    request(app)
      .post('/')
      .send({wait: wait})
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done);
  });
});

describe('app.js - PUT /', function(){
  it('Default PUT returns 200', function(done){
    request(app)
      .put('/')
      .expect(200, done);
  });

  it('Text Wait PUT returns text wait message', function(done){
    var wait = 50;

    request(app)
      .put('/')
      .send('wait='+wait)
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done);
  });

  it('JSON Wait PUT returns text wait message', function(done){
    var wait = 50;

    request(app)
      .put('/')
      .send({wait: wait})
      .expect(200, 'Waited '+wait+'ms to respond.\
        ', done);
  });
});