import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy"

export interface ICorsHeaders {
    "Content-Type": string
    "Allow": string
    "Access-Control-Allow-Headers": string
    "Access-Control-Allow-Methods": string
    "Access-Control-Allow-Origin": string
  }
  export const CorsHeaders: ICorsHeaders = {
    "Content-Type": "application/json",
    "Allow": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
  }
  // node_modules/@types/aws-lambda/trigger/api-gateway-proxy.d.ts
export abstract class HttpResponse implements APIGatewayProxyResult {
    statusCode: number
    body: string
    headers?: {
      [header: string]: boolean | number | string
  } | undefined
    constructor(statusCode: number, body: string, headers = {}) {
      this.statusCode = statusCode
      this.body = body
      this.headers = {...CorsHeaders, ...headers}
    }
  }
  export class HttpSuccess<T> extends HttpResponse {
  constructor(data?: T) {
      let dataString = ''
      if (data) {
          dataString = typeof data == 'string'
            ? data
            : JSON.stringify(data)
      }
      super(200, dataString)
    }
  }
  export class HttpFailure extends HttpResponse {
    constructor(body?: string, code = 400) {
      super(code, body)
    }
  }