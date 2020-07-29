const models = require('../../models')
const Ops = require('sequelize').Op

function buildInventoryQuery(pageSize, page, userId) {
    return new Promise((resolve, reject) => {
        models.Inventories.findAll({
                where: { userid: userId }
            })
            .then(theQuery => {
                let query = {
                    limit: pageSize,
                    offset: pageSize * page,
                }
                resolve(query)
            })
    })
}

module.exports = {
    buildInventoryQuery
}