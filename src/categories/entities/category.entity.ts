import { UUID } from "crypto";
import { Evente } from "src/evente/entities/evente.entity";
import { TimeStampBase } from "src/generics/db/timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends TimeStampBase {
    @PrimaryGeneratedColumn("uuid")
    id: UUID
    @Column({ unique: true })
    name: string
    @OneToMany(() => Evente, (evente) => evente.category, { cascade: true })
    eventes: Evente[];
}
