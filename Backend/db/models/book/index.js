
module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Book', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING(1000)
        },
        image: {
            type: Sequelize.TEXT
        },
        pagesNumber: {
            type: Sequelize.INTEGER
        },
        publishYear: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DOUBLE
        }
    });
};
