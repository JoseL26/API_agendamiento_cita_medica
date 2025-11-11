"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentClService = void 0;
class AppointmentClService {
    constructor(domainService) {
        this.domainService = domainService;
    }
    async execute(appointment) {
        return this.domainService.registerAppointment(appointment);
    }
}
exports.AppointmentClService = AppointmentClService;
