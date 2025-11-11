import { INestApplicationContext } from '@nestjs/common';
import { AppointmentController } from '../controller/AppointmentController';
import { AppointmentModule } from '../controller/AppointmentModule';

const HandlerCore = (appContext: INestApplicationContext, action: string) => {
  const appointmentController = appContext.select(AppointmentModule).get(AppointmentController);

  if (appointmentController[action]) {
    return appointmentController;
  }

  throw new Error(`Action ${action} not found in AppointmentController`);
};

export default HandlerCore;