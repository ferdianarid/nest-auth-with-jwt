import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) { }

  async CreateUser(data: any): Promise<User> {
    return this._userRepository.save(data)
  }

  async findOneUser(condition: any): Promise<User> {
    return this._userRepository.findOne(condition)
  }
}
