"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AppointmentDomainService_1 = require("../../domain/service/AppointmentDomainService");
const AppointmentController_1 = require("../controller/AppointmentController");
const AppointmentDomainRepository_1 = require("../repository/AppointmentDomainRepository");
const Appointmentservice_1 = require("../../application/service/Appointmentservice");
const client_sns_1 = require("@aws-sdk/client-sns");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const repository = new AppointmentDomainRepository_1.AppointmentDomainRepository();
const domainService = new AppointmentDomainService_1.AppointmentDomainService(repository);
const service = new Appointmentservice_1.AppointmentService(domainService);
const controller = new AppointmentController_1.AppointmentController(service);
const sns = new client_sns_1.SNSClient({ region: process.env.AWS_REGION || 'us-east-1' });
const dynamo = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const handler = async (event, context, callback) => {
    console.log('Event received:', event);
    if (event.Records) {
        for (const record of event.Records) {
            const detail = JSON.parse(record.body);
            // Se espera que detail tenga insuredId y scheduleId
            await dynamo.send(new client_dynamodb_1.UpdateItemCommand({
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
    if (event.httpMethod) {
        const httpEvent = event;
        if (httpEvent.httpMethod === 'POST' && httpEvent.path === '/appointment') {
            const body = JSON.parse(httpEvent.body || '{}');
            const result = await controller.register(body);
            // Publicar en SNS con el atributo countryISO
            await sns.send(new client_sns_1.PublishCommand({
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
exports.handler = handler;
