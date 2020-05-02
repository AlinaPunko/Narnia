const db = require('../../db').Author;

module.exports = {
    getAll: async () => {
        return db.findAll({ raw: true })
            .then(authors => { return authors })
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: async (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(author => { return author })
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByName: async (name) => {
        return db.findAll({ raw: true, where: { name: name } })
            .then(author => { return author })
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (author) => {
        db.create(author)
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (author) => {
        db.update(author, {
            where: { id: author.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (author) => {
        db.destroy({
            where: { Id: author.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
