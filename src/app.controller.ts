import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get('health.txt')
    healthCheck() {
        return "OK";
    }
}
