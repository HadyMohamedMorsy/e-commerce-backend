import { Category } from "src/categories/category.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("blogs")
export class Blog extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", default: 1, unique: true })
  order: number;

  @Column({ nullable: true })
  video: string;

  @Column({ type: "int", default: 0 })
  views: number;

  @Column({ name: "is_featured", type: "boolean", default: false })
  isFeatured: boolean;

  @Column({ name: "is_published", type: "boolean", default: false })
  isPublished: boolean;

  @Column({ name: "start_date", type: "timestamp" })
  startDate: string;

  @Column({ name: "end_date", type: "timestamp", nullable: true })
  endDate: string | null;

  @Column()
  title: string;

  @Column({ name: "sub_title" })
  subTitle: string;

  @Column({ name: "post_type" })
  postType: string;

  @Column()
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ name: "short_description", type: "text", nullable: true })
  shortDescription: string;

  @Column({ name: "meta_title", nullable: true })
  metaTitle: string | null;

  @Column({ name: "meta_description", type: "text", nullable: true })
  metaDescription: string;

  @Column({ name: "featured_images", type: "simple-array", nullable: true })
  featuredImages: string[];

  @Column({ nullable: true })
  thumb: string;

  @Column({ name: "media_type", nullable: true })
  mediaType: string;

  @ManyToMany(() => Category, category => category.blogs)
  @JoinTable({ name: "blog_categories" })
  categories: Category[];

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
