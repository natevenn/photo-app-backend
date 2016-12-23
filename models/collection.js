var db = require('../db/knex');

function getCollectionId(imgObj, name) {
   return db('collections').where({name: name})
  .select('id')
  .then( (id) => {
    var collection_id = id[0].id
    imgObj.collection_id = collection_id
    return imgObj
  });
}


module.exports = {
  getCollectionId: getCollectionId
}

