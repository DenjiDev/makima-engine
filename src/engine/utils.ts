const dotProduct = (vector1: number[], vector2: number[]) => {
    return vector1.reduce((product, current, index) => {
        product += current * vector2[index];
        return product;
    }, 0);
};

const vectorMagnitude = (vector: number[]) => {
    return Math.sqrt(vector.reduce((sum, current) => {
        sum += current * current;
        return sum;
    }, 0));
};

export const cosineSimilarity = (vector1: number[], vector2: number[]) => {
    return dotProduct(vector1, vector2) / (vectorMagnitude(vector1) * vectorMagnitude(vector2));
};

export const countWords = (data: string) => data.split(" ").length;