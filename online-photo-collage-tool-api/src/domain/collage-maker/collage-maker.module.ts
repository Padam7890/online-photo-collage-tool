import { Module } from '@nestjs/common';
import { CollageMakerService } from './collage-maker.service';
import { CollageMakerController } from './collage-maker.controller';

@Module({
  controllers: [CollageMakerController],
  providers: [CollageMakerService],
})
export class CollageMakerModule {}
