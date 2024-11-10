import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './mongo/mongo.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(), // to configure .env variable
    UsersModule,
    MongoModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en', // default language
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'), // path to your translations
        watch: true, // watch for changes
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // query resolver
        AcceptLanguageResolver, // resolver for AcceptLanguage
        new HeaderResolver(['x-lang']), // resolver for x-lang header
      ],
    }),
  ],
  providers: [],
})
export class AppModule {}
