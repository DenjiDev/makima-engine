import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EngineModule } from './engine/engine.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    EngineModule,
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
      }
    })
  ],
})
export class AppModule { }
