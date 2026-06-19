import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTabelas1781786959186 implements MigrationInterface {
    name = 'CreateTabelas1781786959186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "motoristas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "numCT" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "cnh" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bed77c88836201231df1d9314e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entregas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "peso" numeric NOT NULL, "veiculo" character varying NOT NULL, "erval" character varying NOT NULL, "tipo" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "motorista_id" uuid, CONSTRAINT "PK_b0bdf868c69c227aefd59085282" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usersTokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_27690788e557af1972507a70d59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entregas" ADD CONSTRAINT "FK_3035d00b4426f59f67756b23cd5" FOREIGN KEY ("motorista_id") REFERENCES "motoristas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entregas" DROP CONSTRAINT "FK_3035d00b4426f59f67756b23cd5"`);
        await queryRunner.query(`DROP TABLE "usersTokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "entregas"`);
        await queryRunner.query(`DROP TABLE "motoristas"`);
    }

}
