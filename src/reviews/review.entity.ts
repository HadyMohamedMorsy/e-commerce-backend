import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reviews")
export class Review extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: "is_approved", type: "tinyint" })
  isApproved: number;

  @Column({ type: "text" })
  comment: string;

  @Column({ type: "decimal", precision: 3, scale: 1 })
  rate: number;

  @Column({ name: "is_liked", type: "tinyint" })
  isLiked: 0 | 1;

  @Column({ name: "likes_count" })
  likesCount: number;

  @Column({ type: "simple-array" })
  media: string[];
}
