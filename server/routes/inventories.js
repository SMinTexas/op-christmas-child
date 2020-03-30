var express = require('express');
const models = require('../models');
var router = express.Router();

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
            category: req.body.category,
            item_name: req.body.itemname,
            gender: req.body.gender,
            age_range: req.body.age
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
                count: count,
                price: price,
                best_price: bestPrice,
                last_purchase_dt: lastPurchase,
                notes: notes,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then(res.status(200).json({
                success: true,
                message: 'Item added to inventory list'
            }));
        }
    })
});

module.exports = router;