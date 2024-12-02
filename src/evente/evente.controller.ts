import { Controller, Get, Post, Body, Param, UseGuards, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { EventeService } from './evente.service';
import { CreateEventeDto } from './dto/create-evente.dto';
import { JwtAuthGuard } from 'src/auth/gurads/auth.guards';
import { UUID } from 'crypto';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventeController {
  constructor(private readonly eventeService: EventeService) { }

  @Post()
  create(@Body() createEventeDto: CreateEventeDto) {
    return this.eventeService.create(createEventeDto);
  }

  @Get()
  findAll() {
    return this.eventeService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID) {
    return this.eventeService.findOneById(id);
  }
}
