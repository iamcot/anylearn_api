import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class UserLoginDto {
    @IsPhoneNumber("VN")
    phone?: string;

    @IsNotEmpty()
    password?: string;
}