const db = require('../../db').Comment;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(comments => { return comments })
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(comment => comment)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByText: (text) => {
        return db.findAll({ raw: true, where: { text: text } })
            .then(comment => comment)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByBookId: (id) => {
        return db.findAll({ raw: true, where: { bookId: id } })
            .then(comment => comment)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByFullInfo: (authorId, bookId, text) => {
        return db.findAll({ raw: true, where: { bookId: bookId, authorId: authorId, text: text } })
            .then(comment => comment)
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (comment) => {
        return db.create(comment)
            .then(() => true)
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (comment) => {
        db.update(comment, {
            where: { id: comment.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (comment) => {
        db.destroy({
            where: { id: comment.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
