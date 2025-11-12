
import { AppointmentRepository } from "../../domain/repository/AppointmentRepository";
import { Appointment } from "../../domain/entities/Appointment";
import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const APPOINTMENTS_TABLE = process.env.APPOINTMENTS_TABLE || 'AppointmentsTable';
const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
export class AppointmentDomainRepository  implements AppointmentRepository{
    public async save(appointment: Appointment): Promise<any> {
        await dynamo.send(new PutItemCommand({
            TableName: APPOINTMENTS_TABLE,
            Item: {
              insuredId: { S: appointment.insuredId },
              scheduleId: { N: appointment.scheduleId.toString() },
              countryISO: { S: appointment.countryISO },
              status: { S: 'pending' },
            }
          }));
    return { payload: 'registro exitoso'};
    }

    public async findByInsuredId(insuredId: string): Promise<object> {
        const result = await dynamo.send(new QueryCommand({
            TableName: APPOINTMENTS_TABLE,
            KeyConditionExpression: 'insuredId = :id',
            ExpressionAttributeValues: {
              ':id': { S: insuredId }
            }
          }));
          return (result.Items || []).map(item => ({
            insuredId: item.insuredId.S!,
            scheduleId: Number(item.scheduleId.N),
            countryISO: item.countryISO.S!,
            status: item.status.S!
          }));
    }
}