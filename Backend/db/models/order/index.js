module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        customerId: {
            type: Sequelize.INTEGER
        },
        sum: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        }
    });
};
