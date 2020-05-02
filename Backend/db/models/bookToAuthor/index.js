module.exports = (Sequelize, sequelize) => {
    return sequelize.define('BookToAuthor', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        bookId: {
            type: Sequelize.INTEGER
        },
        authorId: {
            type: Sequelize.INTEGER
        },
    });
};
