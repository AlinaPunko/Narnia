module.exports = (Sequelize, sequelize) => {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        hashedPassword: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.TEXT
        },
        role: {
            type: Sequelize.STRING
        }
    });
};
