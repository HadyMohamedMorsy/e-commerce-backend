import { User } from "src/users/user.entity";
import { CreateDateColumn, DeleteDateColumn, ManyToOne, UpdateDateColumn } from "typeorm";

export abstract class BaseMemberEntity {
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User)
  createdBy: User;
}
