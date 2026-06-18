import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('motoristas')
export default class Motorista {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('decimal')
    nome: string;

    @Column()
    numCT: string;

    @Column()
    telefone: string;

    @Column()
    email: string;
    
    @Column()
    cnh: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}