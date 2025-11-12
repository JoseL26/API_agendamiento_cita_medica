import { AppointmentPeService } from "../../application/service/AppointmentPeService";

export class AppointmentPeController {
  private readonly registerAppointment: AppointmentPeService;

  constructor(registerAppointment: AppointmentPeService) {
    this.registerAppointment = registerAppointment;
  }

  async register(data: any): Promise<object> {
    const respuesta = await this.registerAppointment.execute(data);
    return respuesta;
  }
}
