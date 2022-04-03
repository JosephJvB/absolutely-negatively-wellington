import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { HttpFailure, HttpSuccess } from "../models/http";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.httpMethod)
        if (event.httpMethod == 'OPTIONS') {
            return new HttpSuccess()
        }
        console.log('body:', event.body)
        // twitter api to like tweet!
        return new HttpSuccess()
    } catch (e) {
        console.error(e)
        console.error('Challenge.handler failed')
        return new HttpFailure(e, 500)
    }
}