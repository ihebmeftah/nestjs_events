import { UUID } from 'crypto';
import { Category } from 'src/categories/entities/category.entity';
import { Participation } from 'src/participation/entities/participation.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evente {
    @PrimaryGeneratedColumn("uuid")
    id: UUID;

    @Column()
    title: string;

    @Column({ nullable: true })
    file: string;

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

    @ManyToOne(() => Category, (cat) => cat.eventes, { onDelete: 'CASCADE', })
    category: Category;
    
    @OneToMany(() => Participation, (participation) => participation.event)
    participations: Participation[];
}
