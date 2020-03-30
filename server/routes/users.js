var express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
var router = express.Router();
const helpers = require('../helpers/route-helpers/users-helper');

router.post('/login', (req, res) => {
    models.User.findOne({
            where: { username: req.body.username },
            attributes: ['id', 'username', 'email', 'password']
        })
        .then(async user => {
            if (!user) {
                return {
                    success: false,
                    message: 'Incorrect credentials entered. Could not log in.'
                }
            }
            //console.log('User Data:', user.dataValues)
            //if (!user) return { success: false, message: 'Incorrect credentials entered. Could not log in' };
            return helpers.checkPassword(req.body.password, user.password, user);
        })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log('err', err);
            res.statusCode = 500;
            res.json(err);
        })
})

router.post('/register', async(req, res) => {
    let username = req.body.username,
        email = req.body.email,
        password = await bcrypt.hash(req.body.password, 10);

    models.User.findOne({
        where: { username: username, email: email },
        attributes: ['id', 'username', 'email']
    }).then(user => {
        if (user) {
            res.status(500).json({
                success: false,
                message: 'This user already exists'
            });
        } else {
            models.User.create({
                username: username,
                email: email,
                password: password,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then(res.status(200).json({
                success: true,
                message: "User account created"
            }));
        }
    })
});

module.exports = router;