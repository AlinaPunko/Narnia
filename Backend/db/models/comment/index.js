module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        authorId: {
            type: Sequelize.INTEGER
        },
        text: {
            type: Sequelize.STRING
        },
        bookId: {
            type: Sequelize.INTEGER
        }
    });
};
