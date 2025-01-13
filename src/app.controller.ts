import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "@/auth/auth.service";

@Controller()
export class AppController {
    constructor(
        private authService: AuthService
    ) {}
    @Get('health.txt')
    healthCheck() {
        return "OK";
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
