const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

/* 

Your article data is currently in the incorrect format and will violate your SQL schema. 

You will need to write and test the provided formatDate utility function to be able insert your article data.

Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
*/
exports.seed = function(connection) {
  return connection.migrate.rollback().then(
    ()=> connection.migrate.latest()).then(()=>{

      const topicsInsertions = connection('topics').insert(topicData, '*');
      const usersInsertions = connection('users').insert(userData, '*');
      
      return Promise.all([topicsInsertions, usersInsertions])
        .then((enteredRows) => {
          console.log(`inserted ${enteredRows[0].length} into the topics table\ninserted ${enteredRows[1].length} into the users table`)

          const formattedArticleData = formatDates(articleData);
          
          return connection('articles').insert(formattedArticleData, '*')
        })
        .then(articleRows => {
          console.log(`inserted ${articleRows.length} into the articles table`);
          
          
    
          /* 
    
          Your comment data is currently in the incorrect format and will violate your SQL schema. 
    
          Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
          
          You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
          */
    
        //   const articleRef = makeRefObj(articleRows);
        //   const formattedComments = formatComments(commentData, articleRef);
        //   return connection('comments').insert(formattedComments);
        // }).then(commentRows => {
        //   console.log(`inserted ${article.rows} into articles table`);
        })
    })

  

};
