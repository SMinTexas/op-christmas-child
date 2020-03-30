'use strict';
module.exports = (sequelize, DataTypes) => {
    const Inventories = sequelize.define('Inventories', {
        userid: DataTypes.INTEGER,
        category: DataTypes.STRING,
        item_name: DataTypes.STRING,
        gender: DataTypes.STRING,
        age_range: DataTypes.STRING,
        description: DataTypes.STRING,
        count: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        best_price: DataTypes.FLOAT,
        last_purchase_dt: DataTypes.DATE,
        notes: DataTypes.TEXT
    }, {});
    Inventories.associate = function(models) {
        // associations can be defined here
    };
    return Inventories;
};