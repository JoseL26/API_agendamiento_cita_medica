import { AppointmentPeRepository } from "../repository/AppointmentPeRepository";

export class AppointmentPeDomainService {
    private readonly appointDatabaseRepository: AppointmentPeRepository;
    constructor(appointDatabaseRepository: AppointmentPeRepository) {
        this.appointDatabaseRepository = appointDatabaseRepository;
    }

    public async registerAppointment(appointment: any): Promise<any> {
        return this.appointDatabaseRepository.save(appointment);
    }
}