"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const AppointmentClMySqlRepository_1 = require("../repository/AppointmentClMySqlRepository");
const AppointmentClDomainService_1 = require("../../domain/service/AppointmentClDomainService");
const AppointmentClService_1 = require("../../application/service/AppointmentClService");
const AppointmentClController_1 = require("../controller/AppointmentClController");
// Instanciación manual de dependencias
const repository = new AppointmentClMySqlRepository_1.AppointmentClMySqlRepository();
const domainService = new AppointmentClDomainService_1.AppointmentClDomainService(repository);
const service = new AppointmentClService_1.AppointmentClService(domainService);
const controller = new AppointmentClController_1.AppointmentClController(service);
const main = async (event) => {
    for (const record of event.Records) {
        const appointment = JSON.parse(record.body);
        await controller.register(appointment);
        // Aquí puedes publicar en EventBridge si es necesario
    }
    return { statusCode: 200, body: 'Mensajes procesados por appointment_cl' };
};
exports.main = main;
