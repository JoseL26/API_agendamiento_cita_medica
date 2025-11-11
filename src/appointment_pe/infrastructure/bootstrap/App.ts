import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';

export const bootstrap = async () => {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  return appContext;
};