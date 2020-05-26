const { isUndefined } = require('lodash');

exports.isDummy = (listPersonalization, typePersonalization) => {
    if (isUndefined(listPersonalization) || listPersonalization === '') return false
    if (listPersonalization === 'XYZ') return true
    const dummy = listPersonalization.indexOf(typePersonalization)
    return !(dummy > -1)
  }