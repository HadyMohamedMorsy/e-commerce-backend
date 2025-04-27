import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("blogs")
export class Blog extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  order: number;

  @Column({ name: "video_type" })
  videoType: string;

  @Column()
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

  @Column({ type: "text" })
  description: string;

  @Column({ name: "short_description", type: "text" })
  shortDescription: string;

  @Column({ name: "meta_title", nullable: true })
  metaTitle: string | null;

  @Column({ name: "meta_description", type: "text" })
  metaDescription: string;

  @Column({ name: "featured_images", type: "simple-array" })
  featuredImages: string[];

  @Column()
  thumb: string;

  @Column({ name: "media_type" })
  mediaType: string;
}
