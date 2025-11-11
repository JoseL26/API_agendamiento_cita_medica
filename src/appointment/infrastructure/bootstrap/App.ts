
import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context, SQSEvent } from 'aws-lambda';
import { AppointmentDomainService } from '../../domain/service/AppointmentDomainService';
import { AppointmentController } from '../controller/AppointmentController';
import { AppointmentDomainRepository } from '../repository/AppointmentDomainRepository';
import { AppointmentService } from '../../application/service/Appointmentservice';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const repository = new AppointmentDomainRepository();
const domainService = new AppointmentDomainService(repository);
const service = new AppointmentService(domainService);
const controller = new AppointmentController(service);

const sns = new SNSClient({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const handler = async (
  event: APIGatewayProxyEvent | SQSEvent,
  context: Context,
  callback: Callback) :Promise<APIGatewayProxyResult | void> => {
   console.log('Event received:', event);

   if ((event as SQSEvent).Records) {
    for (const record of (event as SQSEvent).Records) {
      const detail = JSON.parse(record.body);

      await dynamo.send(new UpdateItemCommand({
        TableName: process.env.APPOINTMENTS_TABLE,
        Key: {
          insuredId: { S: detail.insuredId },
          scheduleId: { N: detail.scheduleId.toString() }
        },
        UpdateExpression: 'SET #s = :completed',
        ExpressionAttributeNames: { '#s': 'status' },
        ExpressionAttributeValues: { ':completed': { S: 'completed' } }
      }));
    }
    return;
  }
  if ((event as APIGatewayProxyEvent).httpMethod) {
    const httpEvent = event as APIGatewayProxyEvent;
    if (httpEvent.httpMethod === 'POST' && httpEvent.path === '/appointment') {
      const body = JSON.parse(httpEvent.body || '{}');
      const result = await controller.register(body);

      await sns.send(new PublishCommand({
        TopicArn: process.env.SNS_TOPIC_ARN,
        Message: JSON.stringify(body),
        MessageAttributes: {
          countryISO: {
            DataType: 'String',
            StringValue: body.countryISO
          }
        }
      }));

      return {
        statusCode: 201,
        body: JSON.stringify(result)
      };
    }
    if (httpEvent.httpMethod === 'GET' && httpEvent.path.startsWith('/appointment/')) {
      const insuredId = httpEvent.pathParameters?.insuredId || httpEvent.path.split('/').pop();
      if (!insuredId) {
        return { statusCode: 400, body: 'insuredId is required' };
      }
      const result = await controller.listByInsuredId(insuredId);
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    }
    return { statusCode: 404, body: 'Not found' };
  }
};


