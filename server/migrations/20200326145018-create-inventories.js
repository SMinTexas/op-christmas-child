'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Inventories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userid: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            category: {
                allowNull: false,
                type: Sequelize.STRING
            },
            item_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            gender: {
                allowNull: true,
                type: Sequelize.STRING
            },
            age_range: {
                allowNull: true,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL
            },
            best_price: {
                allowNull: true,
                type: Sequelize.DECIMAL
            },
            last_purchase_dt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            notes: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Inventories');
    }
};