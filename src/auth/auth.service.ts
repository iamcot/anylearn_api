import { UserService } from "@/user/user.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async checkUser(phone: string, password: string): Promise<any> {
        const user = await this.userService.findOneByPhone(phone);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;//exclude password
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { phone: user.phone, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}