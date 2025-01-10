import { Controller, Get } from '@nestjs/common';

@Controller('health.txt')
export class HealthController {
    @Get()
    index(): string {
        return "OK";
    }
}
