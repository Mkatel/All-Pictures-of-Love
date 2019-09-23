const User = require('./user')

const Author = require('./author')
const Picture = require('./picture')
const Folder = require('./folder')
const Category = require('./category')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Picture.belongsTo(Author)
Picture.belongsTo(Folder)
Picture.belongsTo(Category)

Folder.belongsTo(Author)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Picture,
  Category,
  Folder,
  Author
}
