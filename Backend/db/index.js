const Sequelize = require('sequelize');
const config = require('./../config').db.mssql;

const sequelize = new Sequelize(config.database, config.user, config.password, config.options);

const author = require('./models/author')(Sequelize, sequelize);
const category = require('./models/category')(Sequelize, sequelize);
const book = require('./models/book')(Sequelize, sequelize);
const user = require('./models/user')(Sequelize, sequelize);
const bookToCategory = require('./models/bookToCategory')(Sequelize, sequelize);
const bookToAuthor = require('./models/bookToAuthor')(Sequelize, sequelize);
const comment = require('./models/comment')(Sequelize, sequelize);
const orderToBook = require('./models/orderToBook')(Sequelize, sequelize);
const order = require('./models/order')(Sequelize, sequelize);
const favoriteBook = require('./models/favoriteBook')(Sequelize, sequelize);

bookToCategory.belongsTo(book, { foreignKey: 'bookId' });
bookToCategory.belongsTo(category, { foreignKey: 'categoryId' });

orderToBook.belongsTo(book, { foreignKey: 'bookId' });
orderToBook.belongsTo(order, { foreignKey: 'orderId' });

comment.belongsTo(book, { foreignKey: 'bookId' });
comment.belongsTo(user, { foreignKey: 'authorId' });

bookToAuthor.belongsTo(book, { foreignKey: 'bookId' });
bookToAuthor.belongsTo(author, { foreignKey: 'authorId' });

favoriteBook.belongsTo(book, { foreignKey: 'bookId' });
favoriteBook.belongsTo(user, { foreignKey: 'userId' });

order.belongsTo(user, { foreignKey: 'customerId' })

module.exports = {
    Book: book,
    Author: author,
    Category: category,
    User: user,
    BookToAuthor: bookToAuthor,
    BookToCategory: bookToCategory,
    Comment: comment,
    Order: order,
    OrderToBook: orderToBook,
    FavoriteBook: favoriteBook,

    Sequelize: Sequelize,
    sequelize: sequelize
};

// sequelize.sync({ force: true })
//     .then(() => console.log('Db has been synchronizing successfully'))
//     .then(() => {
//         return Promise.all([
//             user.bulkCreate(require('./mockData/users')),
//             category.bulkCreate(require('./mockData/categories')),
//             author.bulkCreate(require('./mockData/authors')),
//             book.bulkCreate(require('./mockData/books')),
//         ]);
//     })
//     .then(() => {
//         return Promise.all([
//             bookToAuthor.bulkCreate(require('./mockData/bookToAuthor')),
//             bookToCategory.bulkCreate(require('./mockData/bookToCategory')),
//             comment.bulkCreate(require('./mockData/comments.json'))
//         ]);
//     })
//     .catch(err => console.log('Error while synchronizing: ' + err.toString()));