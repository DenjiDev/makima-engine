import { model } from "./tensor";

export const genericTensor = async (data: any) => {
    const dataToTensor = Array.isArray(data) ? data : [data];
    return (await model()).embed(dataToTensor)
}