import { PartialType } from '@nestjs/swagger';
import { CreateEventeDto } from './create-evente.dto';

export class UpdateEventeDto extends PartialType(CreateEventeDto) {}
