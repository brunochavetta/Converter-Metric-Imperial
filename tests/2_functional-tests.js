const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function(){

    // Convertir una entrada válida, tales como 10L: GET Solicitud de /api/convert
    test('Convertir una entrada válida, 10L', function(done){
        chai.request(server)
            .get('/api/convert')
            .query({input: '10L'})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L');
                assert.approximately(res.body.returnNum, 2.6417, 0.0001); // Esperado en mi
                assert.equal(res.body.returnUnit, 'mi');
                done();
            });
    });

    // Convertir una entrada inválida, tales como 32g: GET Solicitud de /api/convert
    test('Convertir una entrada inválida, 32g', function(done){
        chai.request(server)
            .get('/api/convert')
            .query({input: '32g'})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'invalid unit');
                done();
            });
    });

    // Convertir un número no válido, tales como 3/7.2/4kg: GET Solicitud de /api/convert
    test('Convertir un número no válido, 3/7.2/4kg', function(done){
        chai.request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kg'})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'invalid number');
                done();
            });
    });

    // Convertir un número no válido Y unidad, tales como 3/7.2/4kilomegagram: GET Solicitud de /api/convert
    test('Convertir un número no válido y unidad, 3/7.2/4kilomegagram', function(done){
        chai.request(server)
            .get('/api/convert')
            .query({input: '3/7.2/4kilomegagram'})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'invalid unit');
                done();
            });
    });

    // Convertir sin número, tales como kg: GET Solicitud de /api/convert
    test('Convertir sin número, kg', function(done){
        chai.request(server)
            .get('/api/convert')
            .query({input: 'kg'})
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1); // Predeterminado a 1
                assert.equal(res.body.initUnit, 'kg');
                assert.approximately(res.body.returnNum, 2.20462, 0.0001); // Esperado en lbs
                assert.equal(res.body.returnUnit, 'lbs');
                done();
            });
    });

});
