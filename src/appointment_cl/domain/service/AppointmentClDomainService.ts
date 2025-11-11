import { AppointmentClRepository } from "../repository/AppointmentClRepository";

export class AppointmentClDomainService {
    private readonly appointDatabaseRepository: AppointmentClRepository;
    constructor(appointDatabaseRepository: AppointmentClRepository) {
        this.appointDatabaseRepository = appointDatabaseRepository;
    }

    public async registerAppointment(appointment: any): Promise<any> {
        return this.appointDatabaseRepository.save(appointment);
    }
}