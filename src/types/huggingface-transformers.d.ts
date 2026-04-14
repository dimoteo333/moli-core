declare module '@huggingface/transformers' {
  export function pipeline(task: string, model: string): Promise<any>;
  export const env: {
    allowRemoteModels: boolean;
    allowLocalModels: boolean;
    localModelPath?: string;
  };
}
