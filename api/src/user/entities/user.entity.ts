import { UserRole } from 'src/core/enums/userRole';
import { BaseEntity } from 'src/core/helpers/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ name: 'email', length: 250 })
  public email: string;

  @Column({ name: 'name', length: 250 })
  public name: string;

  @Column({ name: 'password', length: 250 })
  public password: string;

  @Column({name: 'role', type: 'enum', enum: UserRole, nullable: false })
  public role: UserRole;

  @Column({name: 'gstin', length: 12, nullable: true })
  public gstin: string | null;
}
