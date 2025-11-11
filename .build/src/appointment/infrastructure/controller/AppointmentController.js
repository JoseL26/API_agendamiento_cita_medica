"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
class AppointmentController {
    constructor(registerAppointment) {
        this.registerAppointment = registerAppointment;
    }
    async register(data) {
        console.log('Registering appointment with data:', data);
        const respuesta = await this.registerAppointment.execute(data);
        return respuesta;
    }
    async listByInsuredId(insuredId) {
        console.log('Listing appointments for insuredId:', insuredId);
        const respuesta = this.registerAppointment.findByInsuredId(insuredId);
        return respuesta;
    }
}
exports.AppointmentController = AppointmentController;
