import { MigrationInterface, QueryRunner } from "typeorm";

export class SecoundMigration1759067518923 implements MigrationInterface {
    name = 'SecoundMigration1759067518923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "icon"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "icon" character varying`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "icon" character varying`);
    }

}
