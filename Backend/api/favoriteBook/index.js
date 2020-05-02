const db = require('../../db').FavoriteBook;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(books => books)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { Id: id } })
            .then(book => book)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByUserId: (id) => {
        return db.findAll({ raw: true, where: { userId: id } })
            .then(books => books)
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (book) => {
        db.create(book)
            .then((newBook) => { console.log(newBook) })
            .catch(err => {
                console.log(err.toString());
            });
    },
    delete: (book) => {
        db.destroy({
            where: { bookId: book.bookId, userId: book.userId }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
