import { Test, TestingModule } from '@nestjs/testing';
import { CollageTemplatesService } from './collage-templates.service';

describe('CollageTemplatesService', () => {
  let service: CollageTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollageTemplatesService],
    }).compile();

    service = module.get<CollageTemplatesService>(CollageTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
