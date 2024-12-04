import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateEventeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty(
        {
            type: String,
            description: 'Write your event title',
            example: 'Event title',
            required: true
        }
    )
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty(
        {
            type: String,
            description: 'Write your event subtitle',
            example: 'Event subtitle',
            nullable: true,
            required: false
        }
    )
    subtitle: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty(
        {
            type: String,
            description: 'Write your event subtitle',
            example: 'This event about something',
            required: true
        }
    )
    desc: string;

    @IsNumberString()
    @ApiProperty(
        {
            type: String,
            description: 'Write your event capacity',
            example: '100',
            required: false,
            nullable: true
        }
    )
    capacity: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty(
        {
            type: String,
            description: 'Write your event location',
            example: 'Tunisia City',
            required: true,
            nullable: false
        }
    )
    location: string

    @IsArray()
    @IsOptional()
    @ApiProperty(
        {
            type: String,
            description: 'Write your event tags',
            example: '["tag1", "tag2"]',
            required: false,
        }
    )
    tags: string[]

    @IsString()
    @IsOptional()
    @ApiProperty()
    file: string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty(
        {
            type: String,
            description: 'Write your user id',
            example: '43143-43143-43143',
            required: true,
        }
    )
    userId: UUID;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty(
        {
            type: String,
            description: 'Write your category id',
            example: '43143-43143-43143',
            required: true,
        }
    )
    categoryId: UUID;
}
