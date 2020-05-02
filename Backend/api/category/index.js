const db = require('../../db').Category;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(categories => { return categories })
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(category => category)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByCategory: (cat) => {
        return db.findAll({ raw: true, where: { category: cat } })
            .then(category => category)
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (category) => {
        db.update(category, {
            where: { id: category.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (category) => {
        db.destroy({
            where: { Id: category.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
