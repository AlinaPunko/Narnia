module.exports = (Sequelize, sequelize) => {
    return sequelize.define('BookToCategory', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        bookId: {
            type: Sequelize.INTEGER
        },
        categoryId: {
            type: Sequelize.INTEGER
        }
    });
};
