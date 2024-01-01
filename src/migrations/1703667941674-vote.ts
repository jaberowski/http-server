import { MigrationInterface, QueryRunner } from "typeorm";

export class Vote1703667941674 implements MigrationInterface {
    name = 'Vote1703667941674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`votes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`programId\` int NOT NULL, \`planId\` int NOT NULL, \`date\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plans\` ADD \`deadLineVote\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_5169384e31d0989699a318f3ca4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_fd1df44b061838451abf80f2204\` FOREIGN KEY (\`programId\`) REFERENCES \`programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`votes\` ADD CONSTRAINT \`FK_037f27199d307dc557ddb15c1c5\` FOREIGN KEY (\`planId\`) REFERENCES \`plans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_037f27199d307dc557ddb15c1c5\``);
        await queryRunner.query(`ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_fd1df44b061838451abf80f2204\``);
        await queryRunner.query(`ALTER TABLE \`votes\` DROP FOREIGN KEY \`FK_5169384e31d0989699a318f3ca4\``);
        await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`deadLineVote\``);
        await queryRunner.query(`DROP TABLE \`votes\``);
    }

}
