
import { SQSEvent } from 'aws-lambda';
import { AppointmentClMySqlRepository } from '../repository/AppointmentClMySqlRepository';
import { AppointmentClDomainService } from '../../domain/service/AppointmentClDomainService';
import { AppointmentClService } from '../../application/service/AppointmentClService';
import { AppointmentClController } from '../controller/AppointmentClController';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const repository = new AppointmentClMySqlRepository();
const domainService = new AppointmentClDomainService(repository);
const service = new AppointmentClService(domainService);
const controller = new AppointmentClController(service);
const eventBridge = new EventBridgeClient({ region: process.env.AWS_REGION || 'us-east-1' });

export const handler = async (event: SQSEvent) => {
	console.log('Evento recibido en appointment_cl:', JSON.stringify(event));
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
	return { statusCode: 200, body: 'Mensajes procesados por appointment_cl' };
};
