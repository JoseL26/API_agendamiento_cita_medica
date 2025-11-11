"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const registerAppointment_1 = require("../application/registerAppointment");
const dynamoRepository_1 = require("../infrastructure/dynamoRepository");
let AppointmentController = class AppointmentController {
    constructor() {
        const dynamoRepository = new dynamoRepository_1.DynamoRepository();
        this.registerAppointment = new registerAppointment_1.RegisterAppointment(dynamoRepository);
    }
    async register(data) {
        return this.registerAppointment.execute(data);
    }
    async listByInsuredId(insuredId) {
        const dynamoRepository = new dynamoRepository_1.DynamoRepository();
        return dynamoRepository.findByInsuredId(insuredId);
    }
};
exports.AppointmentController = AppointmentController;
exports.AppointmentController = AppointmentController = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppointmentController);
