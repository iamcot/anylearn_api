import { ClassSerializerInterceptor, 
    Controller, 
    Get, 
    ParseArrayPipe, 
    Post, 
    Query, 
    Req, 
    Request, 
    UseGuards, 
    UseInterceptors 
} from '@nestjs/common';
import { UserLoginDto } from '@/user/dto/user-login.dto';
import { UserService } from '@/user/user.service';
import { RolesGuard } from '@/common/guard/roles.guard';
import { LoggerInterceptor } from '@/common/interceptor/logger.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bullmq';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        @InjectQueue('user') private readonly userQueue: Queue,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    async profile(@Request() req: any) {
        return req.user;
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
