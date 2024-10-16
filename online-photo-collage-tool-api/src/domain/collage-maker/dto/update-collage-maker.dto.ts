import { PartialType } from '@nestjs/mapped-types';
import { CreateCollageMakerDto } from './create-collage-maker.dto';

export class UpdateCollageMakerDto extends PartialType(CreateCollageMakerDto) {}
