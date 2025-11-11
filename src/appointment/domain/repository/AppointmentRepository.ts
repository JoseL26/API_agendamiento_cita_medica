import { Appointment } from "../entities/Appointment";

export interface AppointmentRepository {
    save(appointment: Appointment): Promise<any>;
    findByInsuredId(insuredId: string): Promise<object>;
}