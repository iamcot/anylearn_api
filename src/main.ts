import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "@/app.module";
import dotenv from "dotenv";
import { logger } from "@/common/middleware/logger.middleware";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(logger)
    await app.listen(process.env.PORT || 80);
}

bootstrap();