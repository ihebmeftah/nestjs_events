import { Controller, Get, Post, Body, Param, ParseUUIDPipe, HttpStatus, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'crypto';
import { JwtAuthGuard } from '../auth/gurads/auth.guards';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
    @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.update(id, UpdateUserDto);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id/events")
  getEventsOfUser(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
  ) {
    return this.usersService.getEventsOfUser(id);
  }

  @Get(':id')
  findOneById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
  ) {
    return this.usersService.findOneById(id);
  }

}

