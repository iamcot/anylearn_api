import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "@/app.module";
import { logger } from "@/common/middleware/logger.middleware";
import { ConfigService } from "@nestjs/config";


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(logger)
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    await app.listen(port);
}

bootstrap();