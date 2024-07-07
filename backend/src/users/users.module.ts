import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { AuthService } from './auth.service';

@Module({
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  imports: [
      TypeOrmModule.forFeature([
          User,
      ])
  ]
})
export class UsersModule {}
