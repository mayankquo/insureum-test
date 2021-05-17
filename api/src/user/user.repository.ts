import { BaseRepository } from 'src/core/helpers/base.repository';
import { EntityRepository } from 'typeorm';
import { UserDto } from './dtos';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
    
  public getUserById(userId: string): Promise<User | null> {
    return this.get({ where: { id: userId } });
  }

  public create(inputs: UserDto): Promise<User | null> {
    return this.save(inputs);
  }
}
