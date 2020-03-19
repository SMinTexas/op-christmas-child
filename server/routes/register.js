var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/', (req, res) => {
    res.send("Aggies 74 Swamp Kitties 72");
    console.log("Aggies 74 Swamp Kitties 72")
    models.User.findOne({
            where: { username: req.body.username },
            attributes: ['id', 'username']
        })
        .then(async(user) => {
            if (typeof user !== 'object' && !user) res.json({
                message: 'User already exists!',
                existingUser: user
            });
            else {
                console.log(req.body.username);
                console.log(req.body.email);
                console.log(req.body.password);
                models.User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: await bcrypt.hash(req.body.password, 10),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                    .then(user => res.json({
                        message: 'User created'
                    }))
            }
        })
})

module.exports = router;