import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create({ email, hashedPassword: password, name, age }) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    // DB등록
    const result1 = await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
    return result1;
  }
}
