"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentClController = void 0;
class AppointmentClController {
    constructor(registerAppointment) {
        this.registerAppointment = registerAppointment;
    }
    async register(data) {
        // Aquí deberías implementar la lógica de registro usando AppointmentServiceCL
        // Por ahora, solo retorna el dato recibido para evitar error de compilación
        return { ok: true, data };
    }
}
exports.AppointmentClController = AppointmentClController;
