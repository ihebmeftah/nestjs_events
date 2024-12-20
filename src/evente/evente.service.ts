import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventeDto } from './dto/create-evente.dto';
import { Evente } from './entities/evente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UUID } from 'crypto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class EventeService {
  constructor(
    @InjectRepository(Evente) private readonly eventeRepository: Repository<Evente>,
    @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService,
    private readonly categoryServices: CategoriesService
  ) { }
  async create(createEventeDto: CreateEventeDto): Promise<Evente> {
    const category = await this.categoryServices.findOne(createEventeDto.categoryId);
    const user = await this.userService.findOneById(createEventeDto.userId);
    createEventeDto.capacity = Number(createEventeDto.capacity);
    const event = await this.eventeRepository.create(createEventeDto)
    event.createdBy = user;
    event.category = category;
    return await this.eventeRepository.save(event);
  }

  async findAll(): Promise<Evente[]> {
    return await this.eventeRepository.find({
      relations: {
        category: true
      }
    });
  }


  async findAllbyUser(id: UUID): Promise<Evente[]> {
    await this.userService.findOneById(id);
    return await this.eventeRepository.find({
      where: {
        createdBy: {
          id: id
        }
      },
    });
  }

  async findOneById(id: UUID) {
    const event = await this.eventeRepository.findOneBy({ id });
    if (event) return event;
    throw new HttpException('Event with this id not found', HttpStatus.NOT_FOUND);
  }

}
