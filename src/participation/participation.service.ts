import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from './entities/participation.entity';
import { UsersService } from 'src/users/users.service';
import { EventeService } from 'src/evente/evente.service';
import { CreateParticipationDto } from './dto/create-participaiton.dto';
import { UUID } from 'crypto';

@Injectable()
export class ParticipationService {

    constructor(
        @InjectRepository(Participation)
        private readonly participationRepository: Repository<Participation>,
        private readonly userService: UsersService,
        private readonly eventeService: EventeService
    ) { }

    async createParticipation(createParticipationDto: CreateParticipationDto): Promise<Participation> {
        const user = await this.userService.findOneById(createParticipationDto.userId);
        const event = await this.eventeService.findOneById(createParticipationDto.eventId);
        const participation = await this.participationRepository.create(createParticipationDto);
        participation.user = user;
        participation.event = event;
        return await this.participationRepository.save(participation);
    }

    async getParticipationsOfEvent(eventId: UUID): Promise<Participation[]> {
        const event = await this.eventeService.findOneById(eventId);
        return await this.participationRepository.find({
            where: {
                status: "participate",
                event: {
                    id: eventId
                }
            },
            relations: {
                user: true
            },

        });
    }
}
