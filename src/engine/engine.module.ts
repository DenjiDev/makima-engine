import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';


@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue({
      name: 'engine',
    }),
    BullModule.registerQueue({
      name: 'sender',
    })
  ],
  providers: [EngineService]
})
export class EngineModule { }
