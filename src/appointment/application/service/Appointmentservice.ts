import { AppointmentDomainService } from "../../domain/service/AppointmentDomainService";
import { Appointment } from "../../domain/entities/Appointment";

export class AppointmentService {
    private readonly registerAppointment: AppointmentDomainService;
    
    constructor(registerAppointment: AppointmentDomainService) {
        this.registerAppointment = registerAppointment;
    }

    public async execute(appointment: Appointment): Promise<any> {
        return this.registerAppointment.registerAppointment(appointment);
    }

    public async findByInsuredId(insuredId: string): Promise<any> {
        return this.registerAppointment.listByInsuredId(insuredId);
    }
}