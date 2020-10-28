import { Test, TestingModule } from '@nestjs/testing';
import { AvatarsController } from './avatars.controller';

describe('Avatars Controller', () => {
  let controller: AvatarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvatarsController],
    }).compile();

    controller = module.get<AvatarsController>(AvatarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
