import { Evente } from 'src/evente/entities/evente.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    feedback: string;
    
    @Column()
    status: "interested" | "not_interested" | "participate";

    @ManyToOne(() => User, (user) => user.participations, { eager: true })
    user: User;

    @ManyToOne(() => Evente, (event) => event.participations, { eager: true })
    event: Evente;
}
