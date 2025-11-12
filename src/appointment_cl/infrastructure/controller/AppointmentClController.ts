import { AppointmentClService } from "../../application/service/AppointmentClService";

export class AppointmentClController {
  private readonly registerAppointment: AppointmentClService;

  constructor(registerAppointment: AppointmentClService) {
    this.registerAppointment = registerAppointment;
  }

  async register(data: any): Promise<object> {
    const respuesta = await this.registerAppointment.execute(data);
    return respuesta;
  }
}
