var express = require('express');
const models = require('../models');
var router = express.Router();

//This is example code 7 April 2020
// async function getEmployees() {
//     var employeeList = await Employee.findAll().then(function(result) {
//         console.log(result.length);
//         console.log(result[0].employeeName);
//         return result;
//     });
//     employeeList[0].employeeName;
// }

router.post('/overall-count', async(req, res) => {
    let userID = req.body.userid;

    models.Inventories.findAll({
        where: {
            userid: userID
        },
        attributes: ['category', [sequelize.fn('sum', sequelize.col('count')), 'Total']],
        group: ['category'],
        raw: true,
        order: sequelize.literal('Total DESC')
    })
});

module.exports = router;