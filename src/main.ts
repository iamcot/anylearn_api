import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "@/app.module";
import { logger } from "@/common/middleware/logger.middleware";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // logger: console
    });

    app.useGlobalPipes(new ValidationPipe({ }));

    const configService = app.get(ConfigService);
    const port = configService.get('port');
    await app.listen(port);
}

bootstrap();