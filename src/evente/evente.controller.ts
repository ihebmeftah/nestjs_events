import { Controller, Get, Post, Body, Param, UseGuards, ParseUUIDPipe, HttpStatus } from '@nestjs/common';
import { EventeService } from './evente.service';
import { CreateEventeDto } from './dto/create-evente.dto';
import { JwtAuthGuard } from 'src/auth/gurads/auth.guards';
import { UUID } from 'crypto';
import { ApiConflictResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventeController {
  constructor(private readonly eventeService: EventeService) { }

  @Post()
  @ApiOperation({ summary: 'This endpoint update a user info ' })
  @ApiNotFoundResponse({ description: 'User or Category not found' })
  @ApiOkResponse({ description: 'It will return a object created of evenet', })
  create(@Body() createEventeDto: CreateEventeDto) {
    return this.eventeService.create(createEventeDto);
  }

  @Get()
  @ApiOperation({ summary: 'This endpoint for get all list of events' })
  @ApiOkResponse({ description: 'It will return all list of created events', })
  findAll() {
    return this.eventeService.findAll();
  }

  @Get("users/:id")
  @ApiOperation({ summary: 'This endpoint for get all list of events' })
  @ApiOkResponse({ description: 'It will return all list of created events by userId passed in path', })
  findAllByUser(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID
  ) {
    return this.eventeService.findAllbyUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'This endpoint for get event by id' })
  @ApiNotFoundResponse({ description: 'Event with this id in the param not found' })
  @ApiOkResponse({ description: 'It will return object of event by id', })
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID) {
    return this.eventeService.findOneById(id);
  }
}
