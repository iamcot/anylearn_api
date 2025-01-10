import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserModule } from '@/user/user.module';

dotenv.config();

@Module(
  {
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        poolSize: parseInt(process.env.DB_CONNECTION_LIMIT as string),
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: parseInt(process.env.DB_PORT as string),
        database: process.env.DB_NAME,
        entities: [],
        synchronize: false,
        logging: true
      }),
      UserModule,
    ],
  })
export class AppModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply();
  }
}
