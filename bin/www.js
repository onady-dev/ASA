const app = require('../')
const syncDB = require('./sync-db');

syncDB().then(_=> {
  console.log('Sync database!')
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
})
