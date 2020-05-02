const db = require('../../db').Order;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(orders => { return orders })
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (order) => {
        db.create(order)
            .catch(err => {
                console.log(err.toString());
            });
    },
    update: (order) => {
        db.update(order, {
            where: { id: order.id }
        }).then(isUpdatedArray => {
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (order) => {
        db.destroy({
            where: { id: order.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
