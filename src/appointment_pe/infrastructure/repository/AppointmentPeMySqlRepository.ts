

import { AppointmentPeRepository } from '../../domain/repository/AppointmentPeRepository';

export class AppointmentPeMySqlRepository implements AppointmentPeRepository {

  async save(appointment: any): Promise<object> {
    console.log('Guardando cita en AppointmentPeMySqlRepository:', appointment);
  
    console.log('Conexión a la base de datos establecida.');
    try {
      return {payload: 'Cita guardada exitosamente en MySQL' };
    } catch (error) {
      console.error('Error al guardar la cita:', error);
      throw error;
    }
    }
  }

