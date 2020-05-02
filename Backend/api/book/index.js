const db = require('../../db').Book;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(books => books)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(book => book)
            .catch(err => {
                console.log(err.toString());
                return err.toString();
            });
    },
    add: (book) => {
        return db.create(book)
            .then((newbook) => {
                console.log(newbook)
                return newbook;
            })
            .catch(err => {
                console.log(err.toString());
                return err.toString();
            });
    },
    update: (book) => {
        db.update(book, {
            where: { id: book.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (book) => {
        db.destroy({
            where: { id: book.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return ({ message: 'No such records have been found' });
            }
        }).catch(err => {
            return ({ message: err.toString() });
        });
    }
};
