import { Injectable } from '@nestjs/common';
import { RegisterAppointment } from '../application/registerAppointment';
import { DynamoRepository } from '../infrastructure/dynamoRepository';

@Injectable()
export class AppointmentController {
  private registerAppointment: RegisterAppointment;

  constructor() {
    const dynamoRepository = new DynamoRepository();
    this.registerAppointment = new RegisterAppointment(dynamoRepository);
  }

  async register(data: any) {
    return this.registerAppointment.execute(data);
  }

  async listByInsuredId(insuredId: string) {
    const dynamoRepository = new DynamoRepository();
    return dynamoRepository.findByInsuredId(insuredId);
  }
}