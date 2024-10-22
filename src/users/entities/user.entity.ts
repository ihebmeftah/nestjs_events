import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';
import { TimeStampBase } from 'src/generics/db/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User extends TimeStampBase {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true })
    phone: string;
    @Column({ nullable: true })
    deviceToken: string;
    @Column()
    @Exclude()
    password: string;
}
