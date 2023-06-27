import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Tensor2D } from '@tensorflow/tfjs-node';
import { respondOptions } from './models/option/options';
import { genericTensor } from './models/tensor/generic.tensor';
import { cosineSimilarity } from './utils';





@Injectable()
export class EngineService {
  answerOptions: Promise<Tensor2D>
  private options: any[]
  constructor(@Inject('MAKIMA') private readonly client: ClientProxy) {
    this.options = respondOptions.map((option) => option.message)
    this.answerOptions = genericTensor(this.options);
    this.client.connect()
  }

  async predict(data: { message: { body: string } }) {
    const { message } = data
    const query = message.body.split(" ").slice(1).join(" ")
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
    this.client.emit('sender', JSON.stringify({ data: { predictions, message } }));
  }


}


