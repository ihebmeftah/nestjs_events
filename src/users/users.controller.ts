import { Controller, Get, Body, Param, ParseUUIDPipe, HttpStatus, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { JwtAuthGuard } from '../auth/gurads/auth.guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConflictResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Patch(':id')
  @ApiOperation({ summary: 'This endpoint update a user info ' })
  @ApiConflictResponse({ description: 'Email or phone already exists' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ description: 'It will return a success message', })
  @ApiForbiddenResponse({ description: 'It will return a failed message', })
  update(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
    @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.update(id, UpdateUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'This endpoint get all users' })
  @ApiOkResponse({ description: 'It will return a list of users', })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id/events")
  @ApiOperation({ summary: 'This endpoint get All events of one user (by id)' })
  @ApiOkResponse({ description: 'It will return a list of events of user ', })
  @ApiNotFoundResponse({ description: 'User not found' })
  getEventsOfUser(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
  ) {
    return this.usersService.getEventsOfUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'This endpoint get one user by id' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ description: 'It will return a Object of user ', })
  findOneById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
  ) {
    return this.usersService.findOneById(id);
  }

}