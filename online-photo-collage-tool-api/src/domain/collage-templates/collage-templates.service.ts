import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';

@Injectable()
export class CollageTemplatesService {
  constructor() {}

  // Function to add a border to an image
  private async addBorderToImage(
    imageBuffer: Buffer,
    borderSize: number,
    borderColor: string,
  ): Promise<Buffer> {
    const { width, height } = await sharp(imageBuffer).metadata();

    return sharp({
      create: {
        width: width + 2 * borderSize,
        height: height + 2 * borderSize,
        channels: 4,
        background: borderColor,
      },
    })
      .composite([{ input: imageBuffer, top: borderSize, left: borderSize }])
      .png()
      .toBuffer();
  }

  // Function to resize images
  private async resizeImages(
    images: Array<Express.Multer.File>,
    width: number,
    height: number,
  ): Promise<Buffer[]> {
    return Promise.all(
      images.map((file) =>
        sharp(file.buffer)
          .resize(width, height, { fit: sharp.fit.cover })
          .toBuffer(),
      ),
    );
  }

  // Function to create a blank canvas
  private createCanvas(width: number, height: number, background: string) {
    return sharp({
      create: {
        width,
        height,
        channels: 4,
        background,
      },
    });
  }

  // Function to prepare composited images with borders
  private async prepareImagesWithBorders(
    images: Buffer[],
    borderSize: number,
    borderColor: string,
  ): Promise<Buffer[]> {
    return Promise.all(
      images.map((buffer) =>
        this.addBorderToImage(buffer, borderSize, borderColor),
      ),
    );
  }

  // Generic collage creation function
  private async createCollage(
    images: Array<Express.Multer.File>,
    canvasWidth: number,
    canvasHeight: number,
    borderSize: number,
    layout: (
      width: number,
      height: number,
    ) => { imageWidth: number; imageHeight: number },
  ) {
    const canvas = this.createCanvas(canvasWidth, canvasHeight, 'white');
    const { imageWidth, imageHeight } = layout(canvasWidth, canvasHeight);

    const resizedImages = await this.resizeImages(
      images,
      imageWidth,
      imageHeight,
    );
    const borderedImages = await this.prepareImagesWithBorders(
      resizedImages,
      borderSize,
      'white',
    );

    const compositedImages = borderedImages.map((buffer, index) => ({
      input: buffer,
      top:
        Math.floor(index / (canvasWidth / (imageWidth + borderSize))) *
        (imageHeight + borderSize),
      left:
        (index % (canvasWidth / (imageWidth + borderSize))) *
        (imageWidth + borderSize),
    }));

    return canvas.composite(compositedImages).png().toBuffer();
  }

  // Layout definitions
  private layoutGrid2x2(canvasWidth: number, canvasHeight: number) {
    return {
      imageWidth: (canvasWidth - 3 * 4) / 2,
      imageHeight: canvasHeight - 2 * 4,
    };
  }

  private layoutHorizontal3(canvasWidth: number, canvasHeight: number) {
    const imageWidth = Math.floor((canvasWidth - 4 * 4) / 3);
    const imageHeight = Math.floor(canvasHeight - 2 * 4);
    return { imageWidth, imageHeight };
  }

  private layoutVerticalStack(canvasWidth: number) {
    return { imageWidth: canvasWidth, imageHeight: 400 };
  }

  private gausasainFilter(canvasWidth: number, canvasHeight: number) {
    const radius = Math.min(canvasWidth, canvasHeight) / 2;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const gaussianBlurFilter = sharp({
      create: {
        width: centerX,
        height: centerY,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
        noise: {
          type: 'gaussian',
          sigma: radius / 4,
        },
      },
    });
    return gaussianBlurFilter.png().toBuffer();
  }

  private layout3x3Grid(canvasWidth: number, canvasHeight: number) {
    return {
      imageWidth: Math.floor(canvasWidth / 3 - 4),
      imageHeight: canvasHeight / 2 - 2 * 4,
    };
  }

  // Template: Generate collage based on the selected template
  async generateCollage(
    templateType: string,
    files: Array<Express.Multer.File>,
  ): Promise<Buffer> {
    switch (templateType) {
      case 'grid_2x2':
        return this.createCollage(files, 800, 800, 4, this.layoutGrid2x2);
      case 'horizontal_3':
        return this.createCollage(files, 1200, 400, 4, this.layoutHorizontal3);
      case 'vertical_stack':
        return this.createCollage(
          files,
          400,
          1200,
          4,
          this.layoutVerticalStack,
        );
      case '3x3_grid':
        return this.createCollage(files, 900, 900, 4, this.layout3x3Grid);
      case 'polaroid_frame':
        return this.createPolaroidFrame(files[0].buffer);
      case 'gaussian_blur':
        return this.gausasainFilter(800, 800);
      default:
        throw new BadRequestException('Invalid template type');
    }
  }

  // Template: Polaroid-like Frame
  private async createPolaroidFrame(image: Buffer): Promise<Buffer> {
    const frame = sharp(
      join(__dirname, '..', '..', '..', '..', 'public', 'polaroid-frame.png'),
    );
    const photo = await sharp(image)
      .resize(400, 400, { fit: sharp.fit.cover })
      .toBuffer();

    return frame
      .composite([{ input: photo, top: 60, left: 200 }])
      .png()
      .toBuffer();
  }
}
