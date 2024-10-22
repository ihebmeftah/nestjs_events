import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto): Promise<User[]> {
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
    await this.userRepository.save(createUserDto);
    return await this.findAll();
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: UUID): Promise<User> {
    const data = await this.userRepository.findOneBy({ id: id });
    if (data) return data;
    throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND);
  }
}
