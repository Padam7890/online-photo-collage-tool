import { Test, TestingModule } from '@nestjs/testing';
import { CollageMakerController } from './collage-maker.controller';
import { CollageMakerService } from './collage-maker.service';

describe('CollageMakerController', () => {
  let controller: CollageMakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollageMakerController],
      providers: [CollageMakerService],
    }).compile();

    controller = module.get<CollageMakerController>(CollageMakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
