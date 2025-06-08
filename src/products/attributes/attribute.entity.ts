import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { NameType } from "src/shared/enum/global-enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products.entity";

@Entity()
export class Attribute extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: NameType,
    default: NameType.PAPER,
  })
  name: NameType;

  @Column("varchar")
  value: string;

  @Column({ default: null })
  image: string;

  @Column({ type: "json", default: null })
  images: string[];

  @Column({ default: 0, nullable: true })
  priceChange: number;

  @Column({ default: 0, nullable: true })
  quantity: number;

  @ManyToOne(() => Product, product => product.attributes, { onDelete: "CASCADE" })
  product: Product;

  @Column({ default: false })
  isActive: boolean;
}
