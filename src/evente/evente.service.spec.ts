import { Test, TestingModule } from '@nestjs/testing';
import { EventeService } from './evente.service';

describe('EventeService', () => {
  let service: EventeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventeService],
    }).compile();

    service = module.get<EventeService>(EventeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
