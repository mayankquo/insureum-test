import { Orgs } from "enums";
import { BaseEntity } from "src/core/helpers/base.entity";
import { Column, Entity } from "typeorm";

@Entity('user')
export class User extends BaseEntity {

    @Column({ length: 250 })
    public email: string;

    @Column({ length: 250 })
    public name: string;

    @Column({ length: 250 })
    public password: string;

    @Column({ length: 250 })
    public org: Orgs;
}