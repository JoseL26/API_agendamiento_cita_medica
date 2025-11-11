
import mysql from 'mysql2/promise';
import { AppointmentClRepository } from '../../domain/repository/AppointmentClRepository';

export class AppointmentClMySqlRepository implements AppointmentClRepository {
  private async getConnection() {
    return mysql.createConnection({
      host: process.env.RDS_HOST,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
      port: Number(process.env.RDS_PORT || 3306)
    });
  }

  async save(appointment: any): Promise<void> {
    const conn = await this.getConnection();
    try {
      await conn.execute('INSERT INTO appointments (insuredId, scheduleId, countryISO, status) VALUES (?, ?, ?, ?)', [
        appointment.insuredId,
        appointment.scheduleId,
        appointment.countryISO,
        appointment.status
      ]);
    } finally {
      await conn.end();
    }
  }
}
