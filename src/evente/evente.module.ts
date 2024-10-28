import { Module } from '@nestjs/common';
import { EventeService } from './evente.service';
import { EventeController } from './evente.controller';

@Module({
  controllers: [EventeController],
  providers: [EventeService],
})
export class EventeModule {}
