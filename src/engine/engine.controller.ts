import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { EngineService } from './engine.service';

@Controller()
export class EngineController {
    constructor(private readonly engineService: EngineService) {

    }
    @EventPattern('engine')
    async handlePredictEvent(@Payload() data: any, @Ctx() context: RmqContext) {
        const dataToSend = JSON.parse(data)
        this.engineService.predict(dataToSend.data)
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }

}