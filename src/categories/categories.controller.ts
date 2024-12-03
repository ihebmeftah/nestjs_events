import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';
import { JwtAuthGuard } from 'src/auth/gurads/auth.guards';
import { ApiOperation, ApiNotFoundResponse, ApiOkResponse, ApiConflictResponse, ApiForbiddenResponse } from '@nestjs/swagger';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiOperation({ summary: 'This endpoint for create a new category ' })
  @ApiConflictResponse({ description: 'Name already exist' })
  @ApiOkResponse({ description: 'It will return a object created of category', })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'This endpoint for create a new category ' })
  @ApiOkResponse({ description: 'It will return all categories created', })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'This endpoint for get category by id' })
  @ApiNotFoundResponse({ description: 'category with this id in the param not found' })
  @ApiOkResponse({ description: 'It will return object of event by id', })
  findOne(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'This endpoint update a category info ' })
  @ApiConflictResponse({ description: 'the name already exists' })
  @ApiNotFoundResponse({ description: 'Category with this id not found' })
  @ApiOkResponse({ description: 'It will return a success message', })
  @ApiForbiddenResponse({ description: 'It will return a failed message', })
  update(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'This endpoint delete a category info ' })
  @ApiNotFoundResponse({ description: 'Category with this id not found' })
  @ApiOkResponse({ description: 'It will return a success message', })
  @ApiForbiddenResponse({ description: 'It will return a failed message', })
  remove(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE },)) id: UUID) {
    return this.categoriesService.remove(id);
  }
}
