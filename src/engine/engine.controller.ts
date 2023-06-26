import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { EngineService } from './engine.service';

@Controller()
export class EngineController {
    constructor(private readonly engineService: EngineService) {

    }
    @EventPattern('engine')
    async handlePredictEvent(data: { message: { body: string }, client: any }) {
        return this.engineService.predict(data)
    }

}