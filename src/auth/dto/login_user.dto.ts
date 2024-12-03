import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
    @ApiProperty(
        {
            type: String,
            description: 'Write your email',
            example: 'DhH0O@example.com',
            required: true,
            nullable: false
        }
    )
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty(
        {
            type: String,
            description: 'Write your password',
            required: true,
            nullable: false,
        }
    )
    @IsString()
    @IsNotEmpty()
    password: string;

}
