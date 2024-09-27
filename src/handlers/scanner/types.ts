import type { Context, APIGatewayProxyEventV2, APIGatewayProxyEventHeaders } from 'aws-lambda';

export interface ManagementContext {
  headers: APIGatewayProxyEventHeaders;
  functionName: string;
  event: APIGatewayProxyEventV2;
  context: Context;
  query: string;
}
