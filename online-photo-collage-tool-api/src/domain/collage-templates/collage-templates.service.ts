import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import sharp, { Metadata } from 'sharp';
import { Express } from 'express';


@Injectable()
export class CollageTemplatesService {
  // Function to add a border to an image
  async addBorderToImage(
    imageBuffer: Buffer, 
    borderSize: number = 10,
    borderColor: string = '#ffffff',
  ): Promise<Buffer> {
    const { width, height }: Metadata = await sharp(imageBuffer).metadata();

    return sharp({
      create: {
        width: (width || 0) + borderSize * 2,
        height: (height || 0) + borderSize * 2,
        channels: 4,
        background: borderColor,
      },
    })
      .composite([{ input: imageBuffer, top: borderSize, left: borderSize }])
      .png()
      .toBuffer();
  }

  // Template: Grid (2x2)
  private async createGrid2x2(
    images: Array<Buffer>, // Accept Buffer types
  ): Promise<Buffer> {
    const canvas = sharp({
      create: { width: 800, height: 800, channels: 4, background: 'white' },
    });

    const compositedImages = images.map((buffer, index) => ({
      input: buffer,
      top: Math.floor(index / 2) * 400,
      left: (index % 2) * 400,
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: Horizontal 3 Images
  private async createHorizontal3(
    images: Array<Buffer>, // Accept Buffer types
  ): Promise<Buffer> {
    const canvas = sharp({
      create: { width: 1200, height: 400, channels: 4, background: 'white' },
    });

    const compositedImages = images.map((buffer, index) => ({
      input: buffer,
      top: 0,
      left: index * 400,
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: Vertical Stack
  private async createVerticalStack(
    images: Array<Buffer>, // Accept Buffer types
  ): Promise<Buffer> {
    const canvas = sharp({
      create: { width: 400, height: 1200, channels: 4, background: 'white' },
    });

    const compositedImages = images.map((buffer, index) => ({
      input: buffer,
      top: index * 400,
      left: 0,
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: 3x3 Grid
  private async create3x3Grid(
    images: Array<Buffer>, // Accept Buffer types
  ): Promise<Buffer> {
    const canvas = sharp({
      create: { width: 900, height: 900, channels: 4, background: 'white' },
    });

    const compositedImages = images.map((buffer, index) => ({
      input: buffer,
      top: Math.floor(index / 3) * 300,
      left: (index % 3) * 300,
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: Polaroid-like Frame
  private async createPolaroidFrame(
    image: Buffer, // Accept Buffer type for the image
  ): Promise<Buffer> {
    const frame = sharp(join(__dirname, ".." , "..", "..","public", 'polaroid-frame.png'));
    const photo = sharp(image).resize(300, 300); // Accept Buffer type for photo
    return frame
      .composite([{ input: await photo.toBuffer(), top: 100, left: 50 }])
      .png()
      .toBuffer();
  }

  // Generate collage based on the selected template
  async generateCollage(
    templateType: string,
    files: Array<Express.Multer.File>,
  ): Promise<Buffer> {
    const borderedImages = await Promise.all(
      files.map((file) => this.addBorderToImage(file.buffer)), // Pass file.buffer
    );

    switch (templateType) {
      case 'grid-2x2':
        return this.createGrid2x2(borderedImages);
      case 'horizontal-3':
        return this.createHorizontal3(borderedImages); 
      case 'vertical-stack':
        return this.createVerticalStack(borderedImages); 
      case '3x3-grid':
        return this.create3x3Grid(borderedImages); 
      case 'polaroid-frame':
        return this.createPolaroidFrame(borderedImages[0]); 
      default:
        throw new BadRequestException('Invalid template type');
    }
  }
}
