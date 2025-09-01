export interface FortuneRequest {
  name: string;
  birth: string;
}

export interface FortuneResponse {
  status: string;
  data: {
    imageUrl: string;
  };
  message: string;
}
