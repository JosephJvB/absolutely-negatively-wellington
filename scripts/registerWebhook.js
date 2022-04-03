require('dotenv').config({
    path: __dirname + '/../.env'
})
const fs = require('fs')
const axios = require('axios')

const cbUrl = 'https://hlaaizg6m5.execute-api.ap-southeast-2.amazonaws.com/v1/challenge'

// maybe i need to do this client creds token thing first?
// https://stackoverflow.com/questions/43628507/how-to-register-a-webhook-url-in-twitter

void async function () {
    // await getToken()
    await register()
}()

async function getToken() {
    try {
        const authStr = [
            process.env.apiKey,
            process.env.apiKeySecret
        ].join(':')
        const enc = Buffer.from(authStr).toString('base64')
        const r = await axios({
            method: 'post',
            url: 'https://api.twitter.com/1.1/account_activity/webhooks.json',
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                // Authorization: 'Bearer ' + process.env.token
                Authorization: 'Basic ' + enc
            }
        })
        fs.writeFileSync(
            __dirname + '/data/webhookRes.json',
            JSON.stringify(r.data, null, 2)
        )
        console.log('success')
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
async function register() {
    try {
        const r = await axios({
            method: 'post',
            url: 'https://api.twitter.com/1.1/account_activity/webhooks.json',
            params: {
                url: cbUrl
            },
            headers: {
                Authorization: 'Bearer ' + process.env.token
            }
        })
        fs.writeFileSync(
            __dirname + '/data/webhookRes.json',
            JSON.stringify(r.data, null, 2)
        )
        console.log('success')
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