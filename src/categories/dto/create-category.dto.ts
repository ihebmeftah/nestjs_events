import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty(
        {
            type: String,
            description: 'Write your password',
            required: true,
            nullable: false,
        }
    )
    name: string;
}
