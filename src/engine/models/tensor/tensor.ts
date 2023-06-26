require("@tensorflow/tfjs-node")
import { load } from "@tensorflow-models/universal-sentence-encoder"


export const model = async () => await load()