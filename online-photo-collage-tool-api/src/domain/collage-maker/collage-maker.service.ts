import { Injectable } from '@nestjs/common';
import { CreateCollageMakerDto } from './dto/create-collage-maker.dto';
import { UpdateCollageMakerDto } from './dto/update-collage-maker.dto';
import * as sharp from 'sharp';
import path from 'path';
import { buffer } from 'stream/consumers';
import fs from 'fs';
import { CloudinaryService } from 'lib/cloudinary/cloudinary.service';

@Injectable()
export class CollageMakerService {
  constructor(private cloudService: CloudinaryService) {}
  async create(
    createCollageMakerDto: CreateCollageMakerDto,
    files: Array<Express.Multer.File>,
  ) {
    const singleImageWidth = 400; 
    const singleImageHeight = 400; 
    const totalWidth = singleImageWidth * files.length; // Collage width
    const totalHeight = singleImageHeight; // Collage height (fixed for now)

    // Resize images and prepare them for compositing
    const resizedImages = await Promise.all(
      files.map(async (file, index) => ({
        input: await sharp(file.buffer)
          .resize(singleImageWidth, singleImageHeight) // Resize each image
          .toBuffer(),
        top: 0,
        left: index * singleImageWidth, // Position horizontally
      })),
    );

    // Generate the collage
    const collageBuffer = await sharp({
      create: {
        width: totalWidth,
        height: totalHeight,
        
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }, 
      },
    })
      .composite(resizedImages)
      .png()
      .toBuffer();

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
