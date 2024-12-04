import { forwardRef, Module } from '@nestjs/common';
import { EventeService } from './evente.service';
import { EventeController } from './evente.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evente } from './entities/evente.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Evente]),
    CategoriesModule,
    FileUploadModule
  ],
  controllers: [EventeController],
  providers: [EventeService],
  exports: [EventeService],
})
export class EventeModule { }
