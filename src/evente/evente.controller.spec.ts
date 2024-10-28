import { Test, TestingModule } from '@nestjs/testing';
import { EventeController } from './evente.controller';
import { EventeService } from './evente.service';

describe('EventeController', () => {
  let controller: EventeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventeController],
      providers: [EventeService],
    }).compile();

    controller = module.get<EventeController>(EventeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
