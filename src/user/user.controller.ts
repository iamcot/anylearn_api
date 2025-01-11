import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserLoginDto } from '@/user/dto/user-login.dto';
import { UserService } from '@/user/user.service';
import { RolesGuard } from '@/common/guard/roles.guard';
import { Roles } from '@/common/decorator/roles.decorator';
import { LoggerInterceptor } from '@/common/interceptor/logger.interceptor';
import { User } from './user.entity';

@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(LoggerInterceptor)
export class UserController {

    constructor(private userService: UserService) {}
    
    @Get()
    userInfoByToken() {
        throw new BadRequestException();
    }

    @Post()
    async login(@Body() userLoginDto: UserLoginDto) {
        const result =  await this.userService.loginByPhone(userLoginDto.phone!, userLoginDto.password!);
        if (result == -1) {
            throw new NotFoundException("User not exists");
        }
        if (result == -2) {
            throw new UnauthorizedException();
        }
        return result;
    }
}
