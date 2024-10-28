import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventeService } from './evente.service';
import { CreateEventeDto } from './dto/create-evente.dto';
import { UpdateEventeDto } from './dto/update-evente.dto';

@Controller('evente')
export class EventeController {
  constructor(private readonly eventeService: EventeService) {}

  @Post()
  create(@Body() createEventeDto: CreateEventeDto) {
    return this.eventeService.create(createEventeDto);
  }

  @Get()
  findAll() {
    return this.eventeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventeDto: UpdateEventeDto) {
    return this.eventeService.update(+id, updateEventeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventeService.remove(+id);
  }
}
