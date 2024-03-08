import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class OrmUser {
  constructor(id: string, email: string, enterprise?: EnterpriseType) {
    this.id = id;
    this.email = email;
    this.enterprise = enterprise;
  }

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({
    type: 'text',
    enum: ['apple', 'google', 'facebook', 'microsoft', 'tesla', 'amazon'],
    nullable: true,
  })
  enterprise?: EnterpriseType;
}
