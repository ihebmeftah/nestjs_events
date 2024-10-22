import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsOptional()
    deviceToken: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsPhoneNumber('TN')
    phone: string;

}
