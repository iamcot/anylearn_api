import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from '@/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@/common/configuration';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from "cache-manager-redis-yet";
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './schedule/taskservice';
import { BullModule } from '@nestjs/bullmq';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from '@/app.controller';

@Module(
  {
    imports: [
      EventEmitterModule.forRoot(),
      BullModule.forRootAsync({
        useFactory: () => ({
          connection: {
            host: 'localhost',
            port: 6379,
          }
        })
      }),
      ScheduleModule.forRoot(),
      CacheModule.registerAsync({
        isGlobal: true,
        useFactory: async () => {
          const store = await redisStore({
            socket: {
              host: 'localhost',
              port: 6379
            }
          });
          return {
            store: store as unknown as CacheStore,
            ttl: 3 //3s
          }
        },
      }),
      ConfigModule.forRoot({
        load: [configuration],
        cache: true
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          poolSize: configService.get('DB_CONNECTION_LIMIT'),
          host: configService.get('DB_HOST'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          port: configService.get('database.port'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
          logging: true
        }),
      }),
      UserModule,
    ],
    providers: [TaskService],
    controllers: [AppController]
  })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply();
  }
}
