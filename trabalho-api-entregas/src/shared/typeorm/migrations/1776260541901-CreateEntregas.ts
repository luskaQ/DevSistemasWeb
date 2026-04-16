import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntregas1776260541901 implements MigrationInterface {
    name = 'CreateEntregas1776260541901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entregas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "peso" numeric NOT NULL, "motorista" character varying NOT NULL, "veiculo" character varying NOT NULL, "erval" character varying NOT NULL, "tipo" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b0bdf868c69c227aefd59085282" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "entregas"`);
    }

}
