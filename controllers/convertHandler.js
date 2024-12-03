function ConvertHandler() {
  
  // Obtiene el número de la entrada
  this.getNum = function(input) {
    let result;
    const regex = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?/; // Captura el número antes de la unidad, con fracciones y decimales
    const match = input.match(regex);
    
    if (match && match[0]) {
      // Si hay una fracción, la manejamos
      if (match[0].includes('/')) {
        const fractionParts = match[0].split('/');
        result = parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
      } else {
        result = parseFloat(match[0]);
      }
    }
    
    // Si no hay número, retornamos 1 como predeterminado
    if (isNaN(result)) {
      result = 1;
    }
    
    return result;
  };
  
  // Obtiene la unidad de la entrada
  this.getUnit = function(input) {
    let result;
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    // Buscamos la unidad en el input
    for (let i = 0; i < units.length; i++) {
      if (input.toLowerCase().includes(units[i])) {
        result = units[i];
        break;
      }
    }
    
    // Si no hay unidad válida, retornamos error
    if (!result) {
      result = undefined;
    }
    
    return result;
  };
  
  // Devuelve la unidad de retorno correspondiente
  this.getReturnUnit = function(initUnit) {
    let result;
    const unitConversions = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    result = unitConversions[initUnit];
    return result;
  };

  // Devuelve la unidad escrita de forma completa
  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitNames[unit];
  };
  
  // Convierte el número de acuerdo a la unidad
  this.convert = function(initNum, initUnit) {
    let result;
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    
    return result;
  };
  
  // Devuelve la cadena que describe la conversión
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpellOut = this.spellOutUnit(initUnit);
    const returnUnitSpellOut = this.spellOutUnit(returnUnit);
    
    return `${initNum} ${initUnitSpellOut} converts to ${returnNum} ${returnUnitSpellOut}`;
  };
  
}

module.exports = ConvertHandler;
