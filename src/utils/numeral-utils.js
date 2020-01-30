class NumeralUtils {

  constructor(numeral) {
    if (!numeral) {
      throw new Error('Please pass your localized version of numeral to NumeralUtils');
    }
    this._numeral = numeral;
  }

  validate_number(number) {
    if (isNaN(this._numeral(number).value())) {
      throw new Error(`Number: ${number} is not valid.`);
    }
  }

  number(number, format = '0,0[.]00') {
    if (!number) return '';
    this.validate_number(number);
    return this._numeral(number).format(format);
  }
}

export default NumeralUtils;
