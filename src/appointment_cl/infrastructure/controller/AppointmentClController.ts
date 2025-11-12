import { AppointmentClService } from "../../application/service/AppointmentClService";

export class AppointmentClController {
  private readonly registerAppointment: AppointmentClService;

  constructor(registerAppointment: AppointmentClService) {
    this.registerAppointment = registerAppointment;
  }

  async register(data: any): Promise<object> {
    console.log('Registrando appointment en CL con data:', data);
    const respuesta = await this.registerAppointment.execute(data);
    console.log('Respuesta del registro en CL:', respuesta);
    return respuesta;
  }
}
