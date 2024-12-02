import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
    @ApiProperty(
        {
            type: String,
            description: 'Write your email',
            example: 'DhH0O@example.com'
        }
    )
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            type: String,
            description: 'Write your password',
        }
    )
    @IsString()
    @IsNotEmpty()
    password: string;

}
