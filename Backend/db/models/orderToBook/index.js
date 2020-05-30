module.exports = (Sequelize, sequelize) => {
    return sequelize.define('OrderToBook', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        bookId: {
            type: Sequelize.INTEGER
        },
        orderId: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });
};
