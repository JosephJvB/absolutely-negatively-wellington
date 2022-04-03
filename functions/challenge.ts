import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HttpFailure, HttpSuccess } from "../models/http";
import { createHmac } from "crypto";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.httpMethod)
        if (event.httpMethod != 'GET') {
            return new HttpFailure(
                'Invalid httpMethod: ' + event.httpMethod,
                400)
        }
        const token = event.queryStringParameters.crc_token
        const hmac = createHmac('sha256', process.env.twitterApiKeySecret)
        hmac.update(token)
        const resToken = hmac.digest('base64')
        return new HttpSuccess({
            response_token: resToken
        })
    } catch (e) {
        console.error(e)
        console.error('Challenge.handler failed')
        return new HttpFailure(e, 500)
    }
}