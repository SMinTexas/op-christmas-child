const jwt = require('jsonwebtoken');
// const models = require('../../models');
const bcrypt = require('bcrypt');

const verifyJWT = (token, secret) => {
    let decoded;
    try {
        return (decoded = jwt.verify(token, secret));
    } catch {
        return { error: "Invalid or broken token." };
    }
};

function checkPassword(passwordToCheck, storedPassword, user) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwordToCheck, storedPassword, async(err, isMatch) => {
            if (err) reject(err);
            else if (isMatch) {
                resolve({
                    token: await jwt.sign({ username: user.username },
                        process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' }),
                    id: user.dataValues.id,
                    email: user.dataValues.email,
                    password: user.dataValues.password,
                    username: user.username
                })
            } else {
                resolve({ error: 'Username or password error. Could not log in.' })
            }
        })
    })
}

module.exports = {
    verifyJWT,
    checkPassword
};