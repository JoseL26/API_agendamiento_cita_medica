
import { SQSEvent } from 'aws-lambda';
import { AppointmentClMySqlRepository } from '../repository/AppointmentClMySqlRepository';
import { AppointmentClDomainService } from '../../domain/service/AppointmentClDomainService';
import { AppointmentClService } from '../../application/service/AppointmentClService';
import { AppointmentClController } from '../controller/AppointmentClController';

const repository = new AppointmentClMySqlRepository();
const domainService = new AppointmentClDomainService(repository);
const service = new AppointmentClService(domainService);
const controller = new AppointmentClController(service);

export const main = async (event: SQSEvent) => {
	for (const record of event.Records) {
		const appointment = JSON.parse(record.body);
		await controller.register(appointment);
	}
	return { statusCode: 200, body: 'Mensajes procesados por appointment_cl' };
};
