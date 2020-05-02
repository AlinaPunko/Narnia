module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Author', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        }
    });
};
