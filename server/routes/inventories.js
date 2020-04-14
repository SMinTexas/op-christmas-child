var express = require('express');
const models = require('../models');
var router = express.Router();

//This is example code 7 April 2020
// async function getEmployees() {
//     var employeeList = await Employee.findAll().then(function(result) {
//         console.log(result.length)
//         console.log(result[0].employeeName)
//         return result
//     });
//     employeeList[0].employeeName;
// }

router.post('/overall-count', async(req, res) => {
    let userID = req.body.userid;

    models.Inventories.findAll({
        where: {
            userid: userID
        },
        attributes: [
            'category', [sequelize.fn('sum', sequelize.col('count')), 'Total']
        ],
        group: ['category'],
        raw: true,
        order: sequelize.literal('Total DESC')
    })
});

router.post('/add', async(req, res) => {
    let userID = req.body.userid,
        category = req.body.category,
        itemName = req.body.itemname,
        gender = req.body.gender,
        age = req.body.age,
        description = req.body.description,
        count = req.body.count,
        price = parseFloat(req.body.price),
        bestPrice = parseFloat(req.body.bestprice),
        lastPurchase = req.body.lastpurchase,
        notes = req.body.notes;

    models.Inventories.findOne({
        where: {
            userid: userID,
            category: category,
            item_name: itemName,
            gender: gender,
            age_range: age,
            description: description
        },
        attributes: [
            'id',
            'userid',
            'category',
            'item_name',
            'gender',
            'age_range',
            'description',
            'count',
            'price',
            'best_price',
            'last_purchase_dt',
            'notes'
        ]
    }).then(inventory => {
        if (inventory) {
            console.log('inventory item already exists')
            res.status(500).json({
                success: false,
                message: 'This item already exists'
            });
        } else {
            models.Inventories.create({
                userid: userID,
                category: category,
                item_name: itemName,
                gender: gender,
                age_range: age,
                description: description,
                count: isNaN(count) ? 0 : count,
                price: isNaN(price) ? 0 : price,
                best_price: isNaN(bestPrice) ? 0 : bestPrice,
                last_purchase_dt: lastPurchase.length == 0 ? null : lastPurchase,
                notes: notes,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then(result => {
                res.status(200).json({
                    id: result.id,
                    success: true,
                    message: 'Item added to inventory list'
                })
            });
        }
    })
});

module.exports = router;