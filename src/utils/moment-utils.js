class MomentUtils {

  constructor(moment) {
    if (!moment) {
      throw new Error('Please pass your localized version of moment to MomentUtils');
    }
    this._moment = moment;
  }

  validate_date(date) {
    if (!this._moment(date).isValid()) {
      throw new Error(`Date: ${date} is not valid.`);
    }
  }

  date(date, format = 'll') {
    if (!date) return '';
    this.validate_date(date);
    return this._moment(date).format(format);
  }

  time(date, format = 'LT') {
    return this.date(date, format);
  }

  datetime(date, format = 'LLL') {
    return this.date(date, format);
  }
}

export default MomentUtils;
