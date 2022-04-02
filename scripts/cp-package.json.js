const fs = require('fs')

fs.writeFileSync(
    __dirname + '/../dist/package.json',
    JSON.stringify(require('../package.json'))
)