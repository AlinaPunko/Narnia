const db = require('../../db').User;

module.exports = {
    getAll: () => {
        return db.findAll({ raw: true })
            .then(users => { return users })
            .catch(err => {
                console.log(err.toString());
            });
    },
    getById: (id) => {
        return db.findAll({ raw: true, where: { id: id } })
            .then(users => users)
            .catch(err => {
                console.log(err.toString());
            });
    },
    getByEmail: (email) => {
        return db.findAll({ raw: true, where: { email: email } })
            .then(users => users)
            .catch(err => {
                console.log(err.toString());
            });
    },
    add: (user) => {
        return db.create(user)
            .catch(err => {
                console.log(err.toString());
                return { error: err.toString() }
            });
    },
    update: (user) => {
        console.log('user' + user);
        return db.update(user, {
            where: { id: user.id }
        }).then(isUpdatedArray => {
            console.log('isUpdatedArray ' + isUpdatedArray);
            if (!isUpdatedArray[0]) {
                return JSON.stringify({ error: 'No such records have been found' });
            }
        }).catch(err => {
            return JSON.stringify({ error: err.toString() })
        });
    },
    delete: (user) => {
        db.destroy({
            where: { id: user.id }
        }).then(isDeleted => {
            if (!isDeleted) {
                return (JSON.stringify({ error: 'No such records have been found' }));
            }
        }).catch(err => {
            return (JSON.stringify({ error: err.toString() }));
        });
    }
};
