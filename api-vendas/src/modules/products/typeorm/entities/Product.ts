import OrderProducts from "@modules/orders/typeorm/entities/OrderProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(
        () => OrderProducts,
        orders_products => orders_products.product
    )
    orders_products : OrderProducts[];

    @Column()
    name: string;
    @Column('decimal')
    price: number;
    @Column('int')
    quantity: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

}