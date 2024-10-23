import { Controller, Get, Post, Body, Request, Param, ParseUUIDPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'crypto';
import { LoginUserDto } from './dto/login_user.dto';
import { JwtAuthGuard } from '../auth/gurads/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
  ) {
    return this.usersService.findOneById(id);
  }

}

