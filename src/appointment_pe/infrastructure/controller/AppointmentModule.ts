import { Module } from '@nestjs/common';
import { AppointmentController } from './AppointmentController';

@Module({
  controllers: [AppointmentController],
  providers: [],
})
export class AppointmentModule {}