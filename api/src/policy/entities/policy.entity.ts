import { InsuranceType } from "src/core/enums/insuranceType";
import { BaseEntity } from "src/core/helpers/base.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('policy')
export class Policy extends BaseEntity {
  
    @ManyToOne(() => User, user => user.id, {
		onDelete: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({ name: 'issuer_id' })
    public issuedBy: User;
    @Column({ name: 'issuer_id', type: 'bigint', nullable: false })
	public issuerId: string;
  
    @Column({ name: 'type', type: 'enum', enum: InsuranceType, nullable: false })
    public type: InsuranceType;
  
    @Column({  name: 'premium', type: 'decimal', precision: 12, scale: 2, nullable: false  })
    public premium: string;
  
    @Column({  name: 'sumCovered', type: 'decimal', precision: 12, scale: 2, nullable: false  })
    public sumCovered: string; 
  
    @Column({ name: 'issued_at', type: 'timestamp', nullable: true })
    public issuedAt: Date | null;
  
}