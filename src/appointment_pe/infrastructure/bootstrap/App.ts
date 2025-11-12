
import { SQSEvent } from 'aws-lambda';
import { AppointmentPeMySqlRepository } from '../repository/AppointmentPeMySqlRepository';
import { AppointmentPeDomainService } from '../../domain/service/AppointmentPeDomainService';
import { AppointmentPeService } from '../../application/service/AppointmentPeService';
import { AppointmentPeController } from '../controller/AppointmentPeController';
const repository = new AppointmentPeMySqlRepository();
const domainService = new AppointmentPeDomainService(repository);
const service = new AppointmentPeService(domainService);
const controller = new AppointmentPeController(service);

export const main = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const appointment = JSON.parse(record.body);
    await controller.register(appointment);
  }
  return { statusCode: 200, body: 'Mensajes procesados por appointment_cl' };
};
