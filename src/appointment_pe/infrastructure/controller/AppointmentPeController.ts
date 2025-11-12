import { AppointmentPeService } from "../../application/service/AppointmentPeService";

export class AppointmentPeController {
  private readonly registerAppointment: AppointmentPeService;

  constructor(registerAppointment: AppointmentPeService) {
    this.registerAppointment = registerAppointment;
  }

  async register(data: any): Promise<object> {
    console.log('Registrando appointment en PE con data:', data);
    const respuesta = await this.registerAppointment.execute(data);
    console.log('Respuesta del registro en PE:', respuesta);
    return respuesta;
  }
}
