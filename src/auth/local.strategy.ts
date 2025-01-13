import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'phone'//override default fieldname `username`
        });
    }

    async validate(phone: string, password: string): Promise<any> {
        const user = await this.authService.checkUser(phone, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}