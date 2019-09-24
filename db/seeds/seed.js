const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(connection) {
  return connection.migrate.rollback().then(
    ()=> connection.migrate.latest()).then(()=>{

      const topicsInsertions = connection('topics').insert(topicData, '*');
      const usersInsertions = connection('users').insert(userData, '*');
      
      return Promise.all([topicsInsertions, usersInsertions])
        .then((enteredRows) => {
          console.log(`inserted ${enteredRows[0].length} into the topics table\ninserted ${enteredRows[1].length} into the users table`)
          
          //correct date format then insert into table
          const formattedArticleData = formatDates(articleData);
          
          return connection('articles').insert(formattedArticleData, '*')
        })
        .then(articleRows => {
          console.log(`inserted ${articleRows.length} into the articles table`);
          
          //correct date format
          const formattedCommentData = formatDates(commentData);
          const articlesRef = makeRefObj(articleRows)
          const formattedComments = formatComments(formattedCommentData, articlesRef);

          /* 
    
          Your comment data is currently in the incorrect format and will violate your SQL schema. 
    
          Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
          
          You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
          */
    
      
          return connection('comments').insert(formattedComments);
        }).then(commentRows => {
          console.log(`inserted ${commentRows.length} into comments table`);
        })
    })

  

};
