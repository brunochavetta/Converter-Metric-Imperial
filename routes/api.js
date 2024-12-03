'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  // Ruta para la conversión de unidades
  app.get('/api/convert', function(req, res) {
    const input = req.query.input; // Obtiene el valor de entrada desde la query string (input)
    
    if (!input) {
      return res.status(400).json({ error: 'No input provided' });
    }
    
    const initNum = convertHandler.getNum(input); // Obtiene el número de la entrada
    const initUnit = convertHandler.getUnit(input); // Obtiene la unidad de la entrada
    
    // Si la unidad es inválida
    if (!initUnit) {
      return res.status(400).json({ error: 'Invalid unit' });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit); // Obtiene la unidad de retorno
    const returnNum = convertHandler.convert(initNum, initUnit); // Realiza la conversión
    
    // Si no se puede convertir
    if (isNaN(returnNum)) {
      return res.status(400).json({ error: 'Invalid number' });
    }

    // Devuelve el resultado de la conversión
    const result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    return res.json({ initNum, initUnit, returnNum, returnUnit, string: result });
  });

};
