import { Injectable } from '@nestjs/common';
import { CreateCollageMakerDto } from './dto/create-collage-maker.dto';
import { UpdateCollageMakerDto } from './dto/update-collage-maker.dto';
import * as sharp from 'sharp';
import { CloudinaryService } from 'lib/cloudinary/cloudinary.service';
import { CollageTemplatesService } from '../collage-templates/collage-templates.service';

@Injectable()
export class CollageMakerService {
  constructor(
    private cloudService: CloudinaryService,
    private collageTemplate: CollageTemplatesService,
  ) {}
  async create(
    createCollageMakerDto: CreateCollageMakerDto,
    files: Array<Express.Multer.File>,
  ) {
    const collageBuffer = await this.collageTemplate.generateCollage(createCollageMakerDto.columns, files);
    const result = await this.cloudService.uploadImage(collageBuffer);
    const outputPath = result.secure_url;
    return outputPath;
  }

  findAll() {
    return `This action returns all collageMaker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collageMaker`;
  }

  update(id: number, updateCollageMakerDto: UpdateCollageMakerDto) {
    return `This action updates a #${id} collageMaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} collageMaker`;
  }
}
