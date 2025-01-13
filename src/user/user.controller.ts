import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseArrayPipe, ParseIntPipe, Post, Query, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserLoginDto } from '@/user/dto/user-login.dto';
import { UserService } from '@/user/user.service';
import { RolesGuard } from '@/common/guard/roles.guard';
import { LoggerInterceptor } from '@/common/interceptor/logger.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('user')
@UseGuards(RolesGuard)
@UseInterceptors(LoggerInterceptor)
export class UserController {

    constructor(
        private userService: UserService,
        @InjectQueue('user') private readonly userQueue: Queue,
    ) {}
    
    // @Get()
    // userInfoByToken() {
    //     throw new BadRequestException();
    // }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() userLoginDto: UserLoginDto) {
        const result =  await this.userService.loginByPhone(userLoginDto.phone!, userLoginDto.password!);
        if (result == -1) {
            throw new NotFoundException("User not exists");
        }
        if (result == -2) {
            throw new UnauthorizedException();
        }
        // await this.userQueue.add('update-tree', {
        //     'user': result
        // })
        return result;
    }

    @Get('list')
    // @UseInterceptors(CacheInterceptor)
    async list(
        @Query('ids', new ParseArrayPipe({items: Number, separator: ','})) ids: number[]
    ) {
        console.log(ids);
        await this.userQueue.add('user-list', {
            'ids': ids
        })
        return ids;
    }
    
}
