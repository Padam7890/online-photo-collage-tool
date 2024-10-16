import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollageMakerModule } from './domain/collage-maker/collage-maker.module';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DomainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
