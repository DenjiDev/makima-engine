import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EngineModule } from './engine/engine.module';

@Module({
  imports: [EngineModule, ConfigModule.forRoot()],
})
export class AppModule { }
