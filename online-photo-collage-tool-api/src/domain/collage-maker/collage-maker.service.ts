import { Injectable } from '@nestjs/common';
import { CreateCollageMakerDto } from './dto/create-collage-maker.dto';
import { UpdateCollageMakerDto } from './dto/update-collage-maker.dto';

@Injectable()
export class CollageMakerService {
  create(createCollageMakerDto: CreateCollageMakerDto) {
    return 'This action adds a new collageMaker';
  }

  findAll() {
    return `This action returns all collageMaker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collageMaker`;
  }

  update(id: number, updateCollageMakerDto: UpdateCollageMakerDto) {
    return `This action updates a #${id} collageMaker`;
  }

  remove(id: number) {
    return `This action removes a #${id} collageMaker`;
  }
}
