import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //create a new nestjs application using root module
  await app.listen(3000); // listen to port 3000
}
bootstrap();
