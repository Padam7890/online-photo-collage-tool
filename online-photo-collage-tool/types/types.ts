export interface collageMakerResponse {
  message: string;
  data: {
    imageUrl: string;
  };
}

export interface collageMakerRequest {
  files: string[];
  columns: string;
}
