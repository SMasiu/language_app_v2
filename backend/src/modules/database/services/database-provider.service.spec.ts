import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseProviderService } from './database-provider.service';

describe('DatabaseProviderService', () => {
  let service: DatabaseProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseProviderService],
    }).compile();

    service = module.get<DatabaseProviderService>(DatabaseProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
