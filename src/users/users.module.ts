import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EventeModule } from 'src/evente/evente.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => EventeModule),
    FileUploadModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
