import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePhoneColumn1744826118060 implements MigrationInterface {
    name = 'RemovePhoneColumn1744826118060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
