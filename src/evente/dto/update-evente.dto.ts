import { PartialType } from '@nestjs/mapped-types';
import { CreateEventeDto } from './create-evente.dto';

export class UpdateEventeDto extends PartialType(CreateEventeDto) {}
