"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDomainService = void 0;
class AppointmentDomainService {
    constructor(appointDatabaseRepository) {
        this.appointDatabaseRepository = appointDatabaseRepository;
    }
    async registerAppointment(appointment) {
        return this.appointDatabaseRepository.save(appointment);
    }
    async listByInsuredId(insuredId) {
        return this.appointDatabaseRepository.findByInsuredId(insuredId);
    }
}
exports.AppointmentDomainService = AppointmentDomainService;
