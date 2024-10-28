import { Module } from '@nestjs/common';
import { EventeService } from './evente.service';
import { EventeController } from './evente.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evente } from './entities/evente.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Evente]),
  ],
  controllers: [EventeController],
  providers: [EventeService],
})
export class EventeModule { }
