const fs = require('fs')
const WellyTweet = require('../dist/models/wellyTweet').default

const allTweets = require('../scripts/data/allTweets.json')

let cantBeBeat = 0
for (const t of allTweets) {
    const wellyTweet = new WellyTweet(t)
    t.cantBeBeat = wellyTweet.cantBeBeat
    if (t.cantBeBeat) cantBeBeat++
}
console.log(cantBeBeat, '/', allTweets.length, 'cant be beat')
fs.writeFileSync(
    __dirname + '/data/testedTweets.json',
    JSON.stringify(allTweets, null, 2)
)