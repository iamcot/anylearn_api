import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from '@/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@/common/configuration';

@Module(
  {
    imports: [
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
  })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply();
  }
}
