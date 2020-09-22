import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DatabaseModule } from './modules/database/database.module';
import { WordsModule } from './modules/words/words.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      debug: true, //set false on production
      cors: {
        credentials: true,
        origin: true,
      },
      playground: {
        endpoint: '/graphql',
        settings: {
          'request.credentials': 'same-origin',
        },
      },
    }),
    DatabaseModule,
    WordsModule,
  ],
})
export class AppModule {}
