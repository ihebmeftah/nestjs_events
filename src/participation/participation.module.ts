import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { EventeModule } from 'src/evente/evente.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Participation]),
    EventeModule,
    UsersModule,
  ],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule { }
