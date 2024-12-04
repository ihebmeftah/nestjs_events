import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { CreateParticipationDto } from './dto/create-participaiton.dto';
import { UUID } from 'crypto';

@Controller('participation')
export class ParticipationController {
  constructor(private readonly participationService: ParticipationService) { }

  @Post()
  async create(
    @Body() createParticipationDto: CreateParticipationDto
  ) {
    return this.participationService.createParticipation(createParticipationDto);
  }

  @Get('events/:eventId')
  async getParticipationsOfEvent(
    @Param('eventId', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID
  ) {
    return this.participationService.getParticipationsOfEvent(id);
  }
}
