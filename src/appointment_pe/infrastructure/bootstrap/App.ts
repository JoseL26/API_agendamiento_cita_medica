
import { SQSEvent } from 'aws-lambda';
import { AppointmentPeMySqlRepository } from '../repository/AppointmentPeMySqlRepository';
import { AppointmentPeDomainService } from '../../domain/service/AppointmentPeDomainService';
import { AppointmentPeService } from '../../application/service/AppointmentPeService';
import { AppointmentPeController } from '../controller/AppointmentPeController';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const repository = new AppointmentPeMySqlRepository();
const domainService = new AppointmentPeDomainService(repository);
const service = new AppointmentPeService(domainService);
const controller = new AppointmentPeController(service);
const eventBridge = new EventBridgeClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const handler = async (event: SQSEvent) => {
  console.log('Evento recibido en appointment_pe:', JSON.stringify(event));
  for (const record of event.Records) {
    const appointment = JSON.parse(record.body);
    await controller.register(appointment);
 
    await eventBridge.send(new PutEventsCommand({
      Entries: [
        {
          EventBusName: process.env.EVENT_BUS_NAME,
          Source: 'appointment_pe',
          DetailType: 'AppointmentCompleted',
          Detail: JSON.stringify({ ...appointment, status: 'completed' })
        }
      ]
    }));
  }
  return { statusCode: 200, body: 'Mensajes procesados por appointment_pe' };
};
