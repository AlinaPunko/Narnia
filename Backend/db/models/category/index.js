module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Category', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: Sequelize.STRING
        },
    });
};
