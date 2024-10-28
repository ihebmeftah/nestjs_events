import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateEventeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    subtitle: string;

    @IsString()
    @IsNotEmpty()
    desc: string;

    @IsNumber()
    capacity: number;

    @IsString()
    @IsNotEmpty()
    location: string

    @IsArray()
    @IsOptional()
    tags: string[]

    @IsUUID()
    userId: UUID;
}
