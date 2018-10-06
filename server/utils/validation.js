const isString = str => !!(str && typeof str === 'string' && str.trim().length > 0);

module.exports = {
  isString,
};