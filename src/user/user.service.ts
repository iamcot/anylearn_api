import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/user/user.entity';
import bcrypt from "bcryptjs";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ){}

    findOneByPhone(phone: string) {
        return this.userRepo.findOneBy({
            phone: phone
        });    
    }

    async loginByPhone(phone: string, password: string): Promise<number | User> {
        const result =  await this.userRepo.findOneBy({
            phone: phone
        });

        if (!result) {
            return -1;
        }
        const passChecked = await bcrypt.compare(password, result.password);
        if (!passChecked) {
            return -2;
        }
        return result;
    }
}
