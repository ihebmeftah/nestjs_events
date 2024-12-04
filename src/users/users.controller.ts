import { Controller, Get, Body, Param, ParseUUIDPipe, HttpStatus, UseGuards, Patch, UseInterceptors, Req, UploadedFile, Put, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UUID } from 'crypto';
import { JwtAuthGuard } from '../auth/gurads/auth.guards';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConflictResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { getModuleSpecificMulterOptions } from 'src/file-upload/ file-upload.config';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly fileUploadService: FileUploadService

  ) { }

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

  @Patch(':id/profilePic')
  @UseInterceptors(FileInterceptor('file', getModuleSpecificMulterOptions('profile')))
  @ApiOperation({ summary: 'This endpoint change user profile picture' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ description: 'It will return a Object of user ' })
  async changeProfilePic(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    const filePath = await this.fileUploadService.uploadFile(file);
    return this.usersService.changeProfilePic(id, filePath);
  }
}