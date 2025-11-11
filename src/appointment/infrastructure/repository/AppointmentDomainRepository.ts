import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../../domain/repository/AppointmentRepository";
import { Appointment } from "../../domain/entities/Appointment";

@Injectable()
export class AppointmentDomainRepository  implements AppointmentRepository{
    public async save(appointment: Appointment): Promise<any> {
    console.log('mostrar appointment:', appointment)  
    return { payload: 'respuesta'};
    }

    public async findByInsuredId(insuredId: string): Promise<object> {
        return { payload: 'respuesta de findByInsuredId'};
    }
}