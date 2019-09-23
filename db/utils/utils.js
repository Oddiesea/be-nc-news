const _ = require('lodash')

exports.formatDates = list => {
    const listCopy = _.cloneDeep(list);
    listCopy.forEach(element => {
                let timestamp = new Date(element.created_at)
                let formattedDate = timestamp.toJSON().toString();
                formattedDate = formattedDate.replace('T', ' ').slice(0, 19)+'-'+formattedDate.slice(20,22)
                console.log(formattedDate)
              element.created_at = formattedDate;
        });
        return listCopy;
      };

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
