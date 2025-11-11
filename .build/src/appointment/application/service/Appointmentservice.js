"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
class AppointmentService {
    constructor(registerAppointment) {
        this.registerAppointment = registerAppointment;
    }
    async execute(appointment) {
        return this.registerAppointment.registerAppointment(appointment);
    }
    async findByInsuredId(insuredId) {
        return this.registerAppointment.listByInsuredId(insuredId);
    }
}
exports.AppointmentService = AppointmentService;
