import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { hash } from 'bcrypt';
import { EventeService } from 'src/evente/evente.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => EventeService)) private readonly eventeService: EventeService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.userRepository.exists({
      where: [
        { phone: createUserDto.phone },
        { email: createUserDto.email },
      ],
    });
    if (exist)
      throw new HttpException(
        'The phone number or email already exist',
        HttpStatus.CONFLICT);
    createUserDto.password = await hash(createUserDto.password, 10);
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: UUID): Promise<User> {
    const data = await this.userRepository.findOneBy({ id: id });
    if (data) return data;
    throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND);
  }

  async findOneByEmail(email: string): Promise<User> {
    const data = await this.userRepository.findOneBy({ email: email });
    if (data) return data;
    throw new HttpException('User with this email not found', HttpStatus.NOT_FOUND);
  }

  async getEventsOfUser(id: UUID) {
    const user = await this.findOneById(id);
    return await this.eventeService.findAllbyUser(id);
  }

}
