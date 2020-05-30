const db = require('../../db').OrderToBook;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(orderToBooks => orderToBooks)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(OrderToBook => OrderToBook)
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (orderToBook) => {
        db.create(orderToBook)
            .then((newOrderToBook) => { console.log(newOrderToBook) })
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (orderToBook) => {
        db.update(orderToBook, {
            where: { id: orderToBook.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (orderToBook) => {
        db.destroy({
            where: { id: orderToBook.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
