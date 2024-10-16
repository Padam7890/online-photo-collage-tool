import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Define CollageTemplateType as an enum
export enum CollageTemplateType {
  GRID_2X2 = "grid_2x2",
  HORIZONTAL_3 = "horizontal_3",
  VERTICAL_STACK = "vertical_stack",
  GRID_3X3 = "grid_3x3",
  POLAROID_FRAME = "polaroid_frame",
}

// Create a DTO class for creating a collage maker
export class CreateCollageMakerDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(CollageTemplateType)
  columns: CollageTemplateType;
}
