const db = require('../../db').BookToCategory;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(bookToCategories => bookToCategories)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(BookToCategory => BookToCategory)
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (bookToCategory) => {
        db.create(bookToCategory)
            .then((newBookToCategory) => { console.log(newBookToCategory) })
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (bookToCategory) => {
        db.update(bookToCategory, {
            where: { id: bookToCategory.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (bookToCategory) => {
        db.destroy({
            where: { Id: bookToCategory.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
