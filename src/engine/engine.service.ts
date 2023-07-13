import { Injectable, Logger } from '@nestjs/common';
import { Tensor2D } from '@tensorflow/tfjs-node';
import { respondOptions } from './models/option/options';
import { genericTensor } from './models/tensor/generic.tensor';
import { cosineSimilarity } from './utils';
import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';





@Injectable()
@Processor('engine')
export class EngineService {
  answerOptions: Promise<Tensor2D>
  private options: any[]
  constructor(@InjectQueue('sender') private queue: Queue) {
    this.options = respondOptions.map((option) => option.message)
    this.answerOptions = genericTensor(this.options);
  }

  @Process("predict")
  @OnQueueActive()
  async predict(job: Job) {
    const dataToSend = JSON.parse(job.data)
    const { message } = dataToSend.data
    let query = this.sanitizeQuery(message)
    let MAX_RESULTS = 1;
    const userInputTensor = await genericTensor(query)

    const inputVector = await userInputTensor.array();
    const dataVector = await (await this.answerOptions).array();

    const userQueryVector = inputVector[0];

    const predictions = dataVector.map((dataEntry, dataEntryIndex) => {

      const similarity = cosineSimilarity(userQueryVector, dataEntry);
      return {
        similarity,
        result: this.options[dataEntryIndex],
        index: dataEntryIndex
      }

    }).sort((a, b) => b.similarity - a.similarity).slice(0, MAX_RESULTS);

    Logger.log(predictions)
    this.sendEvent('sender', JSON.stringify({ data: { predictions, message } }))
    Logger.log(`Event sent to sender queue with data: ${JSON.stringify(message)}`)
  }

  sanitizeQuery(message: { body: string }) {
    let query = message?.body?.split(" ").slice(1).join(" ")
    if (query.length === 0) {
      query = "menu"
    }
    return query
  }


  async sendEvent(pattern: string, data: any) {
    try {
      await this.queue.add(pattern, data,
        {
          attempts: 5,
          backoff: 8000,
        })
    } catch (error) {
      Logger.error(error)
    }
  }
}


