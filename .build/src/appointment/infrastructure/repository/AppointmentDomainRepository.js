"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDomainRepository = void 0;
const common_1 = require("@nestjs/common");
let AppointmentDomainRepository = class AppointmentDomainRepository {
    async save(appointment) {
        console.log('mostrar appointment:', appointment);
        return { payload: 'respuesta' }; // Implementación para guardar la cita en la base de datos
    }
    async findByInsuredId(insuredId) {
        return { payload: 'respuesta de findByInsuredId' };
    }
};
exports.AppointmentDomainRepository = AppointmentDomainRepository;
exports.AppointmentDomainRepository = AppointmentDomainRepository = __decorate([
    (0, common_1.Injectable)()
], AppointmentDomainRepository);
