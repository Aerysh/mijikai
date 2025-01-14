import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsModule } from './urls/urls.module';
import { ShortenModule } from './shorten/shorten.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.APP_DEBUG === 'true',
      autoLoadEntities: true,
    }),
    UrlsModule,
    ShortenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
