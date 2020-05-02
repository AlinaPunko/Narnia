const bookToAuthor = require('../../db').BookToAuthor;
const book = require('../../db').Book;

module.exports = {
    getAll: () => {
        return bookToAuthor.findAll({
            include: [{
                model: book
            }]
        })
            .then(bookToAuthors => bookToAuthors)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return bookToAuthor.findAll({ raw: true, where: { id: id } })
            .then(BookToAuthor => BookToAuthor)
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (theBookToAuthor) => {
        bookToAuthor.create(theBookToAuthor)
            .then((newBookToAuthor) => { console.log(newBookToAuthor) })
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (bookToAuthor) => {
        bookToAuthor.update(bookToAuthor, {
            where: { id: bookToAuthor.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (bookToAuthor) => {
        bookToAuthor.destroy({
            where: { Id: bookToAuthor.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
