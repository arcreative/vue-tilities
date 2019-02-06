class MomentUtils {

  constructor(moment) {
    if (!moment) {
      throw new Error('Please pass your localized version of moment to DateTimeUtils')
    }
    this._moment = moment
  }

  date(date, format = 'll') {
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
