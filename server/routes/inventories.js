var express = require('express');
const models = require('../models');
const userHelpers = require('../helpers/route-helpers/users-helper');
const inventoryHelpers = require('../helpers/route-helpers/inventory-helper');
const Sequelize = require('sequelize');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/:pageSize/:page', async function(req, res, next) {
    const pageSize = Number(req.params.pageSize)
    const page = Number(req.params.page)
    const decoded = await userHelpers.verifyJWT(req.body.token, process.env.ACCESS_TOKEN_SECRET)

    // models.Inventories.findAll(await inventoryHelpers.buildInventoryQuery(pageSize, page, decoded.userid))
    //     .then(userInventory => {
    //         res.json(userInventory)
    //     })

    models.Inventories.findAll({
        where: { userid: decoded.userid },
        limit: pageSize,
        offset: pageSize * page
    }).then(userInventory => {
        res.json(userInventory)
    })
});

//originally set as router.post
router.get('/dashboard/:id', async(req, res) => {
    let userID = req.params.id

    const decoded = await userHelpers.verifyJWT(
        req.body.token,
        process.env.ACCESS_TOKEN_SECRET
    );
    // const decoded = await userHelpers.verifyJWT(
    //     req.header('Authorization'),
    //     process.env.ACCESS_TOKEN_SECRET
    // );
    // const decoded = await userHelpers.verifyJWT('Authorization', process.env.ACCESS_TOKEN_SECRET);

    //console.log('decoded = ', decoded);
    if (decoded) {
        const allItems = models.Inventories.findAll({
                where: {
                    userid: userID
                },
                attributes: [
                    'category', [Sequelize.fn('sum', Sequelize.col('count')), 'Total']
                ],
                group: ['category'],
                raw: true,
                order: Sequelize.literal('Total DESC')
            })
            //console.log('allItems = ', allItems)
        return res.json(allItems);
    }

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
            //console.log('inventory item already exists')
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

// router.post('/edit', async(req, res) => {
//     let userID = req.body.userid,
//         category = req.body.category,
//         itemName = req.body.itemname,
//         gender = req.body.gender,
//         age = req.body.age,
//         description = req.body.description,
//         count = req.body.count,
//         price = parseFloat(req.body.price),
//         bestPrice = parseFloat(req.body.bestprice),
//         lastPurchase = req.body.lastpurchase,
//         notes = req.body.notes;

//     models.Inventories.findOne({
//         where: {
//             userid: userID,
//             category: category,
//             item_name: itemName,
//             gender: gender,
//             age_range: age,
//             description: description
//         },
//         attributes: [
//             'id',
//             'userid',
//             'category',
//             'item_name',
//             'gender',
//             'age_range',
//             'description',
//             'count',
//             'price',
//             'best_price',
//             'last_purchase_dt',
//             'notes'
//         ]
//     }).then(inventory => {
//         if (inventory) {
//             console.log('inventory item already exists')
//             res.status(500).json({
//                 success: false,
//                 message: 'This item already exists'
//             });
//         } else {
//             models.Inventories.create({
//                 userid: userID,
//                 category: category,
//                 item_name: itemName,
//                 gender: gender,
//                 age_range: age,
//                 description: description,
//                 count: isNaN(count) ? 0 : count,
//                 price: isNaN(price) ? 0 : price,
//                 best_price: isNaN(bestPrice) ? 0 : bestPrice,
//                 last_purchase_dt: lastPurchase.length == 0 ? null : lastPurchase,
//                 notes: notes,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             }).then(result => {
//                 res.status(200).json({
//                     id: result.id,
//                     success: true,
//                     message: 'Item added to inventory list'
//                 })
//             });
//         }
//     })
// });

module.exports = router;