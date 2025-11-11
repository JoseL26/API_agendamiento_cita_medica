"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentClMySqlRepository = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
class AppointmentClMySqlRepository {
    async getConnection() {
        return promise_1.default.createConnection({
            host: process.env.RDS_HOST,
            user: process.env.RDS_USER,
            password: process.env.RDS_PASSWORD,
            database: process.env.RDS_DATABASE,
            port: Number(process.env.RDS_PORT || 3306)
        });
    }
    async save(appointment) {
        const conn = await this.getConnection();
        try {
            await conn.execute('INSERT INTO appointments (insuredId, scheduleId, countryISO, status) VALUES (?, ?, ?, ?)', [
                appointment.insuredId,
                appointment.scheduleId,
                appointment.countryISO,
                appointment.status
            ]);
        }
        finally {
            await conn.end();
        }
    }
}
exports.AppointmentClMySqlRepository = AppointmentClMySqlRepository;
