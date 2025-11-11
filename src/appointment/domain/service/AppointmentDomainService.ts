import { AppointmentRepository } from "../repository/AppointmentRepository";
import { Appointment } from "../entities/Appointment";

export class AppointmentDomainService {
    private readonly appointDatabaseRepository: AppointmentRepository;

    constructor(appointDatabaseRepository: AppointmentRepository) {
        this.appointDatabaseRepository = appointDatabaseRepository;
    }

    public async registerAppointment(appointment: Appointment): Promise<any> {
        return  this.appointDatabaseRepository.save(appointment);
    }

    public async listByInsuredId(insuredId: string): Promise<any> {
        return this.appointDatabaseRepository.findByInsuredId(insuredId);
    }
}