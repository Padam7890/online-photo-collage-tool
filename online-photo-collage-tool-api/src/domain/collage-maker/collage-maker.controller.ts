import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CollageMakerService } from './collage-maker.service';
import { CreateCollageMakerDto } from './dto/create-collage-maker.dto';
import { UpdateCollageMakerDto } from './dto/update-collage-maker.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('collage-maker')
export class CollageMakerController {
  constructor(private readonly collageMakerService: CollageMakerService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createCollageMakerDto: CreateCollageMakerDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const collage = await this.collageMakerService.create(createCollageMakerDto, files);
    console.log(collage);
    return {
      message: 'Collage created successfully.',
      data:{
        imageUrl: collage,
      }
    }
  }

  @Get()
  findAll() {
    return this.collageMakerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collageMakerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollageMakerDto: UpdateCollageMakerDto) {
    return this.collageMakerService.update(+id, updateCollageMakerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collageMakerService.remove(+id);
  }
}
