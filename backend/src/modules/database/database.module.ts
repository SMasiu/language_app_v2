import { Module } from '@nestjs/common'
import { DatabaseService } from './services/database.service'
import { DatabaseProviderService } from './services/database-provider.service'
import { LanguageModule } from '../language/language.module'

@Module({
  providers: [DatabaseService, DatabaseProviderService],
  exports: [DatabaseService],
  imports: [LanguageModule]
})
export class DatabaseModule {}
