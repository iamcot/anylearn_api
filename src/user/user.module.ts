import { Module } from '@nestjs/common';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { BullModule } from '@nestjs/bullmq';
import { UserProcessor } from '@/user/user.processor';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
        name: 'user',
    })
    ],
    controllers: [UserController],
    providers: [UserService, UserProcessor],
    exports: [UserService],
})
export class UserModule {}
