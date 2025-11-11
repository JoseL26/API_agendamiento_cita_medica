import { AppointmentClDomainService } from "../../domain/service/AppointmentClDomainService";

export class AppointmentClService {
    private readonly domainService :AppointmentClDomainService;
    constructor(domainService: AppointmentClDomainService) {
        this.domainService = domainService;
    }

    async execute(appointment: any): Promise<any> {
        return this.domainService.registerAppointment(appointment);
    }
}