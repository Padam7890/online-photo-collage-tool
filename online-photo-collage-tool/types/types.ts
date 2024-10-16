export interface collageMakerResponse {
  message: string;
  data: {
    imageUrl: string;
  };
}
export enum CollageTemplateType {
  GRID_2x2 = 'grid-2x2',
  HORIZONTAL_3 = 'horizontal-3',
  VERTICAL_STACK = 'vertical-stack',
  GRID_3x3 = '3x3-grid',
  POLAROID_FRAME = 'polaroid-frame',
}

export interface collageMakerRequest {
  files: string[];
  columns: CollageTemplateType;
}

