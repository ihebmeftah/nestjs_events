import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateParticipationDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    feedback: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "interested"
    })
    status: "interested" | "not_interested" | "participate";

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: UUID;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventId: UUID;
}
