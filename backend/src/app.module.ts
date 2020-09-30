import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { DatabaseModule } from './modules/database/database.module'
import { WordsModule } from './modules/words/words.module'
import { LanguageModule } from './modules/language/language.module'
import { TranslationsModule } from './modules/translations/translations.module'
import { GroupsModule } from './modules/groups/groups.module'
import { TranslateModule } from './modules/translate/translate.module'
import { TestsModule } from './modules/tests/tests.module'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      debug: true, //set false on production
      cors: {
        credentials: true,
        origin: true
      },
      playground: {
        endpoint: '/graphql',
        settings: {
          'request.credentials': 'same-origin'
        }
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    DatabaseModule,
    WordsModule,
    LanguageModule,
    TranslationsModule,
    GroupsModule,
    TranslateModule,
    TestsModule
  ]
})
export class AppModule {}
