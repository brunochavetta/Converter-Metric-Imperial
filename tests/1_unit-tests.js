const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    test('convertHandler debe leer correctamente una entrada de números enteros', function(){
        let result = convertHandler.getNum('3');
        assert.equal(result, 3);
    });

    test('convertHandler debe leer correctamente una entrada de número decimal', function(){
        let result = convertHandler.getNum('3.5');
        assert.equal(result, 3.5);
    });

    test('convertHandler debe leer correctamente una entrada fraccionada', function(){
        let result = convertHandler.getNum('1/2');
        assert.equal(result, 0.5);
    });

    test('convertHandler debe leer correctamente una entrada fraccionada con un decimal', function(){
        let result = convertHandler.getNum('1.5/2');
        assert.equal(result, 0.75);
    });

    test('convertHandler debe devolver correctamente un error en una doble fracción (es decir, 3/2/3)', function(){
        let result = convertHandler.getNum('3/2/3');
        assert.equal(result, 'Error');
    });

    test('convertHandler debe predeterminar correctamente a una entrada numérica de 1 cuando no se proporciona ninguna entrada numérica', function(){
        let result = convertHandler.getNum('kg');
        assert.equal(result, 1);
    });

    test('convertHandler debe leer correctamente cada unidad de entrada válida', function(){
        let result = convertHandler.getUnit('kg');
        assert.equal(result, 'kg');
    });

    test('convertHandler debe devolver correctamente un error para una unidad de entrada inválida', function(){
        let result = convertHandler.getUnit('invalidUnit');
        assert.equal(result, 'Error');
    });

    test('convertHandler debe devolver la unidad de retorno correcta para cada unidad de entrada válida', function(){
        let result = convertHandler.getReturnUnit('km');
        assert.equal(result, 'mi');
    });

    test('convertHandler debe devolver correctamente la unidad de cadena de "letras" para cada unidad de entrada válida', function(){
        let result = convertHandler.spellOutUnit('mi');
        assert.equal(result, 'miles');
    });

    test('convertHandler debe convertirse correctamente de gal a L', function(){
        let result = convertHandler.convert(3, 'gal');
        assert.equal(result, 11.356);
    });

    test('convertHandler debe convertirse correctamente de L a gal', function(){
        let result = convertHandler.convert(3, 'L');
        assert.equal(result, 0.7925);
    });

    test('convertHandler debe convertirse correctamente de mia a km', function(){
        let result = convertHandler.convert(1, 'mia');
        assert.equal(result, 1.60934);
    });

    test('convertHandler debe convertirse correctamente de km a mia', function(){
        let result = convertHandler.convert(1, 'km');
        assert.equal(result, 0.621371);
    });

    test('convertHandler debe convertirse correctamente de lbs a kg', function(){
        let result = convertHandler.convert(5, 'lbs');
        assert.equal(result, 2.26796);
    });

    test('convertHandler debe convertirse correctamente de kg a lbs', function(){
        let result = convertHandler.convert(5, 'kg');
        assert.equal(result, 11.0231);
    });

});
