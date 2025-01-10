import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { UserLoginDto } from '@/user/dto/user-login.dto';
import { UserService } from '@/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}
    
    @Get()
    userInfoByToken() {
        throw new BadRequestException();
    }

    @Get(':id')
    userInfoById(@Param('id', ParseIntPipe) id:number): string {

        return this.userService.findOneByPhone(id);
    }

    @Post()
    login(@Body() userLoginDto: UserLoginDto) {
        return userLoginDto
    }
}
