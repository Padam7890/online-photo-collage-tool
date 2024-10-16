import { Module } from '@nestjs/common';
import { CollageMakerModule } from './collage-maker/collage-maker.module';
import { CollageTemplatesService } from './collage-templates/collage-templates.service';

@Module({
    imports:[CollageMakerModule],
    providers: [CollageTemplatesService]
})
export class DomainModule {}
