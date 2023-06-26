import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { EngineController } from './engine.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MAKIMA',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL],
          queue: 'engine_queue',
          queueOptions: {
            durable: false
          }
        }
      },
    ]),

  ],
  controllers: [EngineController],
  providers: [EngineService]
})
export class EngineModule { }
