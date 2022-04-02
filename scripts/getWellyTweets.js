require('dotenv').config({
    path: __dirname + '/../.env'
})
const axios = require('axios')
const fs = require('fs')

const dataDir = __dirname + '/data'
const twitterUrl = 'https://api.twitter.com/2'

const wellyAccountName = 'canyoubeatwelly'
const wellyAccountId = '1354921651452878849'

getUsersTweets()
async function getUsersTweets() {
    const allTweets = []
    let i = 1
    try {
        let token = null
        do {
            console.log('loopNum', i++)
            const params = {
                max_results: 100,
            }
            if (token) {
                params.pagination_token = token
            }
            const r = await axios({
                url: twitterUrl + '/users/' + wellyAccountId + '/tweets',
                params,
                headers: {
                    Authorization: 'Bearer ' + process.env.token
                }
            })
            const { meta, data } = r.data
            allTweets.push(...data)
            token = meta.next_token
        } while(!!token)
        console.log('writing', allTweets.length, 'tweets to json')
        fs.writeFileSync(
            dataDir + '/allTweets.json',
            JSON.stringify(allTweets, null, 2)
        )
    } catch (e) {
        if (e.isAxiosError) {
            console.log(e.response.data)
            console.log(e.response.status)
            console.log('axios failed')
        } else {
            console.log(e)
            console.log('failed')
        }
    }
}

async function getUserId() {
    try {
        const r = await axios({
            url: twitterUrl + '/users/by/username/' + wellyAccountName,
            headers: {
                Authorization: 'Bearer ' + process.env.token
            }
        })
        console.log(r.data)
    } catch (e) {
        if (e.isAxiosError) {
            console.log(e.response.data)
            console.log(e.response.status)
            console.log('axios failed')
        } else {
            console.log(e)
            console.log('failed')
        }
    }
}