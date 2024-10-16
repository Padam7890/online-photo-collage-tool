import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { Metadata } from 'sharp';
import * as sharp from 'sharp';
import { CreateCollageMakerDto } from '../collage-maker/dto/create-collage-maker.dto';

@Injectable()
export class CollageTemplatesService {
  // Function to add a border to an image
  async addBorderToImage(
    imageBuffer: Buffer,
    borderSize: number = 14,
    borderColor: string = 'green',
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

  // Function to ensure images are resized to specific dimensions
  private async resizeImage(
    imageBuffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return sharp(imageBuffer)
      .resize(width, height, { fit: sharp.fit.cover })
      .toBuffer();
  }

  // Template: Grid (2x2)
  private async createGrid2x2(images: Array<Buffer>): Promise<Buffer> {
    const canvasSize = 800;
    const imageSize = canvasSize / 2;

    const borderedImages = await Promise.all(
      images.map(async (buffer) => {
        // Resize each image to the desired size minus the border
        const resizedImage = await this.resizeImage(
          buffer,
          imageSize - 20,
          canvasSize - 20,
        );
        // Add border to the resized image
        return await this.addBorderToImage(resizedImage);
      }),
    );

    const canvas = sharp({
      create: {
        width: canvasSize,
        height: canvasSize,
        channels: 4,
        background: 'white',
      },
    });

    const compositedImages = borderedImages.map((buffer, index) => ({
      input: buffer,
      top: Math.floor(index / 2) * imageSize, // 0 or 400
      left: (index % 2) * imageSize, // 0 or 400
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: Horizontal 3 Images
  private async createHorizontal3(images: Array<Buffer>): Promise<Buffer> {
    // Define the canvas dimensions
    const canvasWidth = 1200;
    const canvasHeight = 400;

    // Create a blank canvas
    const canvas = sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: 'white',
      },
    });

    // Resize each image to fit within the canvas, assuming each will occupy a third of the width
    const imageWidth = canvasWidth / 3; // Each image width
    const resizedImages = await Promise.all(
      images.map(async (buffer) => {
        return await sharp(buffer)
          .resize(imageWidth, canvasHeight, { fit: sharp.fit.cover }) // Resize to fit within allocated space
          .toBuffer();
      }),
    );

    // Prepare compositing positions
    const compositedImages = resizedImages.map((buffer, index) => ({
      input: buffer,
      top: 0, // Align all images at the top
      left: index * imageWidth, // Distribute images horizontally
    }));

    // Create and return the final collage image
    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: Vertical Stack
  private async createVerticalStack(images: Array<Buffer>): Promise<Buffer> {
    const canvas = sharp({
      create: { width: 400, height: 1200, channels: 4, background: 'white' },
    });

    const borderedImages = await Promise.all(
      images.map(async (buffer) => {
        const resizedImage = await this.resizeImage(buffer, 400, 400); // Resize to fit
        return await this.addBorderToImage(resizedImage); // Add border
      }),
    );

    const compositedImages = borderedImages.map((buffer, index) => ({
      input: buffer,
      top: index * 400,
      left: 0,
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: 3x3 Grid
  private async create3x3Grid(images: Array<Buffer>): Promise<Buffer> {
    const canvas = sharp({
      create: { width: 900, height: 900, channels: 4, background: 'white' },
    });

    const borderedImages = await Promise.all(
      images.map(async (buffer) => {
        const resizedImage = await this.resizeImage(buffer, 300, 300); // Resize to fit
        return await this.addBorderToImage(resizedImage); // Add border
      }),
    );

    const compositedImages = borderedImages.map((buffer, index) => ({
      input: buffer,
      top: Math.floor(index / 3) * 300,
      left: (index % 3) * 300,
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Template: Polaroid-like Frame
  private async createPolaroidFrame(image: Buffer): Promise<Buffer> {
    const frame = sharp(
      join(__dirname, '..', '..', '..', '..', 'public', 'polaroid-frame.png'),
    );
    const photo = await this.resizeImage(image, 300, 300); // Resize to ensure correct dimension
    return frame
      .composite([{ input: photo, top: 100, left: 50 }])
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

    const convertOSTring = templateType.toString();
    console.log(convertOSTring);
    switch (convertOSTring) {
      case 'grid_2x2':
        return this.createGrid2x2(borderedImages);
      case 'horizontal_3':
        return this.createHorizontal3(borderedImages);
      case 'vertical_stack':
        return this.createVerticalStack(borderedImages);
      case '3x3_grid':
        return this.create3x3Grid(borderedImages);
      case 'polaroid_frame':
        return this.createPolaroidFrame(borderedImages[0]);
      default:
        throw new BadRequestException('Invalid template type');
    }
  }
}
