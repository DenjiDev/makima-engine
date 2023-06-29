import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
const tracer = require('./tracer')

const loggerInstance = new Logger('Bootstrap')

async function bootstrap() {
  await tracer.start();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_URL],
        queue: 'engine_queue',
        queueOptions: {
          durable: false,
        },
        noAck: false
      }
    },
  );


  await app.listen();
  loggerInstance.log(`Makima Engine MS running!`)
}

bootstrap().catch((error) => loggerInstance.error(error))

