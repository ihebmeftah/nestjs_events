import { Injectable } from '@nestjs/common';
import { CreateEventeDto } from './dto/create-evente.dto';
import { UpdateEventeDto } from './dto/update-evente.dto';

@Injectable()
export class EventeService {
  create(createEventeDto: CreateEventeDto) {
    return 'This action adds a new evente';
  }

  findAll() {
    return `This action returns all evente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evente`;
  }

  update(id: number, updateEventeDto: UpdateEventeDto) {
    return `This action updates a #${id} evente`;
  }

  remove(id: number) {
    return `This action removes a #${id} evente`;
  }
}
