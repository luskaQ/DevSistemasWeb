import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('entregas')
export default class Entrega {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('decimal')
    peso: number;
    @Column()
    motorista: string; //pode ser uma entidade motorista
    @Column()
    veiculo: string; //pode ser uma entidade veiculo
    @Column()
    erval: string; //pode ser uma entidade erval
    @Column()
    tipo: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

}