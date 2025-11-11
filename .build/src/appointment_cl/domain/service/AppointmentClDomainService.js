"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentClDomainService = void 0;
class AppointmentClDomainService {
    constructor(appointDatabaseRepository) {
        this.appointDatabaseRepository = appointDatabaseRepository;
    }
    async registerAppointment(appointment) {
        // Lógica de negocio para registrar una cita en Chile
        return this.appointDatabaseRepository.save(appointment);
    }
}
exports.AppointmentClDomainService = AppointmentClDomainService;
