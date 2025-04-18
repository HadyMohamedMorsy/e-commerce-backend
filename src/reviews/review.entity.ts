import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("reviews")
export class Review {
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

  @Column({ name: "creator_name" })
  creatorName: string;

  @Column({ name: "creator_image" })
  creatorImage: string;

  @Column({ type: "simple-array" })
  media: string[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
