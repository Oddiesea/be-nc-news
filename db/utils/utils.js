const _ = require("lodash");

exports.formatDates = list => {
  const listCopy = _.cloneDeep(list);
  listCopy.forEach(element => {
    let timestamp = new Date(element.created_at);
    element.created_at = timestamp;
  });
  return listCopy;
};

exports.makeRefObj = (list, keyName, valueName) => {
  const refObj = {};
  if (!keyName || !valueName) return refObj;
  list.forEach(element => {
    refObj[element[keyName]] = element[valueName];
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
