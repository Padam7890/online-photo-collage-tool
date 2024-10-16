import { Module } from '@nestjs/common';
import { CollageMakerService } from './collage-maker.service';
import { CollageMakerController } from './collage-maker.controller';
import { CloudinaryModule } from 'lib/cloudinary/cloudinary.module';
import { CloudinaryService } from 'lib/cloudinary/cloudinary.service';
import { CollageTemplatesService } from '../collage-templates/collage-templates.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [CollageMakerController],
  providers: [CollageMakerService, CloudinaryService, CollageTemplatesService],
})
export class CollageMakerModule {}
