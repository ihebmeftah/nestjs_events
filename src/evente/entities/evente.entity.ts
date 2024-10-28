import { UUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evente {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column()
    title: string;

    @Column({ nullable: true })
    subtitle: string;

    @Column()
    desc: string;

    @Column()
    capacity: number;

    @Column()
    location: string

    @Column({ nullable: true, type: 'simple-array' })
    tags: string[]

    @ManyToOne(() => User, (user) => user.eventes)
    createdBy: User;
}