export interface AppointmentRepository {
    listarPorInsuredId(id: any):Promise<any>;
}