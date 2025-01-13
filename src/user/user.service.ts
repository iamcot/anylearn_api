import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/user/user.entity';
import bcrypt from "bcryptjs";
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserService {

    private logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private eventEmiiter: EventEmitter2
    ) { }

    findOneByPhone(phone: string) {
        return this.userRepo.findOneBy({
            phone: phone
        });
    }

    async loginByPhone(phone: string, password: string): Promise<number | User> {
        const result = await this.userRepo.findOneBy({
            phone: phone
        });

        if (!result) {
            return -1;
        }
        const passChecked = await bcrypt.compare(password, result.password);
        if (!passChecked) {
            return -2;
        }
        this.eventEmiiter.emit('user.login', {
            "userid": result.id
        })
        return result;
    }

    @OnEvent('user.login')
    handleEventUserLogin(payload: any) {
        this.logger.debug("Get Event user.login");
        this.logger.debug(payload);
    }
}
