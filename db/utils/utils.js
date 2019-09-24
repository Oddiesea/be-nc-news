const _ = require("lodash");

exports.formatDates = list => {
  const listCopy = _.cloneDeep(list);
  listCopy.forEach(element => {
    let timestamp = new Date(element.created_at);
    element.created_at = timestamp;
  });
  return listCopy;
};

exports.makeRefObj = list => {
  const refObj = {};
  if (list.length === 0) return refObj;
  list.forEach(element => {
    refObj[element.title] = element.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (comments.length === 0 || Object.entries(articleRef).length === 0)
    return [];
  const formattedComments = _.cloneDeep(comments);
  formattedComments.forEach(element => {
    element.author = element.created_by;
    element.article_id = articleRef[element.belongs_to];
    delete element.belongs_to;
    delete element.created_by;
  });
  return formattedComments;
};
