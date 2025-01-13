import { Module } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";
import { UserModule } from "@/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
    imports: [UserModule, 
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secrect,
            signOptions: {expiresIn: '60s'},
        })
    ],
    exports: [AuthService],
    providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}