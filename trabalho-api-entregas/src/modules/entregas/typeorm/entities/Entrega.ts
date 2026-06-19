import Motorista from "@modules/motoristas/typeorm/entities/Motorista";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('entregas')
export default class Entrega {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('decimal')
    peso: number;

    @ManyToOne(() => Motorista)
    @JoinColumn({ name: 'motorista_id' })
    motorista: Motorista; 

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