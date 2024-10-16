import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollageMakerModule } from './domain/collage-maker/collage-maker.module';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DomainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'public'), // Adjust this path if necessary
      serveRoot:"/images"
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
