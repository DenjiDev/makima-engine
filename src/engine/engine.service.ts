import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Tensor2D } from '@tensorflow/tfjs-node';
import { respondOptions } from './models/option/options';
import { genericTensor } from './models/tensor/generic.tensor';
import { cosineSimilarity, countWords } from './utils';





@Injectable()
export class EngineService {
  blogPostsTensor: Promise<Tensor2D>
  private options: any[]
  constructor() {
    this.options = respondOptions.map((option) => option.message)
    this.blogPostsTensor = genericTensor(this.options);
  }

  async predict(data: { message: { body: string }, client: any }) {
    const { message } = data
    const query = message.body.split(" ").slice(1).join(" ")
    let MAX_RESULTS = 1;

    MAX_RESULTS = countWords(query) > 1 ? MAX_RESULTS : 2
    const userInputTensor = await genericTensor(query)

    const inputVector = await userInputTensor.array();
    const dataVector = await (await this.blogPostsTensor).array();

    const userQueryVector = inputVector[0];

    const predictions = dataVector.map((dataEntry, dataEntryIndex) => {

      const similarity = cosineSimilarity(userQueryVector, dataEntry);
      return {
        similarity,
        result: this.options[dataEntryIndex],
        index: dataEntryIndex
      }

    }).sort((a, b) => b.similarity - a.similarity).slice(0, MAX_RESULTS);

    return predictions
  }


}


