import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Write your first name',
        example: 'John',
        required: true
    })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'Write your last name',
        example: 'doe',
        required: true

    })
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'Write your email',
        example: 'DhH0O@example.com',
        required: true

    })
    email: string;

    @IsOptional()
    @ApiProperty({
        type: String,
        description: 'it is token from FCM',
        example: 'fcmToken',
        nullable: true,
        required: false
    })
    deviceToken: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'WRite your password',
        example: 'password',
        required: true
    })
    password: string;

    @IsPhoneNumber('TN')
    @ApiProperty({
        type: String,
        description: 'Write your phone',
        example: '+216 20 000 000',
        required: true
    })
    phone: string;

}
