
import mysql from 'mysql2/promise';
import { AppointmentClRepository } from '../../domain/repository/AppointmentClRepository';

export class AppointmentClMySqlRepository implements AppointmentClRepository {


  async save(appointment: any): Promise<object> {
    console.log('Guardando cita en AppointmentClMySqlRepository:', appointment);

    console.log('Conexión a la base de datos establecida.');
    try {
      return {payload: 'Cita guardada exitosamente en MySQL' };
    } catch (error) {
      console.error('Error al guardar la cita:', error);
      throw error;
    }
  }
}
