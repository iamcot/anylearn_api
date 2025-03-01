import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExp: false,
            secretOrKey: jwtConstants.secrect,
        });
    }

    async validate(payload: any) {
        return {id: payload.sub, phone: payload.phone, name: payload.name};
    }
}