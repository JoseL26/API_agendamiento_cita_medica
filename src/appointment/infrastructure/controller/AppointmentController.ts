import { AppointmentService } from '../../application/service/Appointmentservice';
import { Appointment } from '../../domain/entities/Appointment';

export class 
AppointmentController {
  private readonly registerAppointment: AppointmentService;

  constructor(registerAppointment: AppointmentService) {
    this.registerAppointment= registerAppointment;
  }

  async register(data: Appointment) : Promise<object> {
     console.log('Registrando appointment con data:', data);
    const respuesta= await this.registerAppointment.execute(data);
    return respuesta;
  }

  async listByInsuredId(insuredId: string): Promise<object> {
    console.log('Listando appointments para insuredId:', insuredId);
    const respuesta= this.registerAppointment.findByInsuredId(insuredId);
    return respuesta;
  }
}