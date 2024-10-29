import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventeDto } from './dto/create-evente.dto';
import { UpdateEventeDto } from './dto/update-evente.dto';
import { Evente } from './entities/evente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EventeService {
  constructor(
    @InjectRepository(Evente) private readonly eventeRepository: Repository<Evente>,
    @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService
  ) { }
  async create(createEventeDto: CreateEventeDto): Promise<Evente> {
    const user = await this.userService.findOneById(createEventeDto.userId);
    const event = await this.eventeRepository.create(createEventeDto)
    event.createdBy = user;
    return await this.eventeRepository.save(event);
  }

  async findAll(): Promise<Evente[]> {
    return await this.eventeRepository.find();
  }

  async findAllbyUser(id: UUID): Promise<Evente[]> {
    return await this.eventeRepository.find({
      where: {
        createdBy: {
          id: id
        }
      }
    });
  }

  async findOneById(id: UUID) {
    const event = await this.eventeRepository.findOneBy({ id });
    if (event) return event;
    throw new HttpException('Event with this id not found', HttpStatus.NOT_FOUND);
  }

}
