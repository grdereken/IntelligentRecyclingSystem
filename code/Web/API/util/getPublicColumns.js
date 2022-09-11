const permisions = require('@config/permisions.js')

function getPublicColumns(knexTable){
    return knexTable
        .select(permisions.publicColumns)
}

module.exports = getPublicColumns