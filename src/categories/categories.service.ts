import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,

  ) { }
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    await this.checkExistByName(createCategoryDto.name);
    return await this.categoryRepository.save(createCategoryDto);

  }

  private async checkExistByName(name: string) {
    const exist = await this.categoryRepository.existsBy({ name });
    if (exist) {
      throw new HttpException(`This category with name ${name} existed`, HttpStatus.CONFLICT);
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: UUID): Promise<Category> {
    const oneCategory = await this.categoryRepository.findOneBy({ id })
    if (!oneCategory) {
      throw new HttpException(`This category with id ${id} not existe in db`, HttpStatus.NOT_FOUND);
    }
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: UUID, updateCategoryDto: UpdateCategoryDto) {
    const oldCat = await this.findOne(id);
    await this.checkExistByName(updateCategoryDto.name);
    const newCat = await this.categoryRepository.update(id, updateCategoryDto);
    if (!newCat || newCat.affected < 0) {
      throw new HttpException(`Somthing wrong`, HttpStatus.FORBIDDEN);
    }
    return { msg: "Update done succeffuly" };
  }

  async remove(id: UUID) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return { msg: `This category #${id} removed succefully` };
  }
}
