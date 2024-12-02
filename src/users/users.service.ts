import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { hash } from 'bcrypt';
import { EventeService } from 'src/evente/evente.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async update(id: UUID, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const oldUser = await this.findOneById(id);

    if (updateUserDto.phone) {
      const existphone = await this.userRepository.existsBy({
        phone: updateUserDto.phone,
      })
      if (existphone) {
        throw new HttpException('The phone number already exist', HttpStatus.CONFLICT);
      }
    }

    if (updateUserDto.email) {
      const existemail = await this.userRepository.existsBy({
        email: updateUserDto.email,
      })
      if (existemail) {
        throw new HttpException('The email already exist', HttpStatus.CONFLICT);
      }
    }

    const newUser = await this.userRepository.update(id, updateUserDto);
    if (!newUser || newUser.affected < 0) {
      throw new HttpException(`Somthing wrong`, HttpStatus.FORBIDDEN);
    }
    return { msg: "Update done succeffuly" };
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
