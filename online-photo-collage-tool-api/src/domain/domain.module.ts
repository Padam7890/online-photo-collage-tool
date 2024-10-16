import { Module } from '@nestjs/common';
import { CollageMakerModule } from './collage-maker/collage-maker.module';

@Module({
    imports:[CollageMakerModule]
})
export class DomainModule {}
