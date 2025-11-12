import { AppointmentPeDomainService } from "../../domain/service/AppointmentPeDomainService";

export class AppointmentPeService {
    private readonly domainService :AppointmentPeDomainService;
    constructor(domainService: AppointmentPeDomainService) {
        this.domainService = domainService;
    }

    async execute(appointment: any): Promise<any> {
        return this.domainService.registerAppointment(appointment);
    }
}