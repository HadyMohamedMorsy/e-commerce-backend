import { IsArray, IsNotEmpty } from "class-validator";
import { Product } from "src/products/products.entity";

export interface IAttribute {
  id?: number;
  name: string;
  value: string;
  image: string;
  images: string[];
  priceChange: number;
  quantity: number;
  product: Product;
}

export class AttributeDto {
  @IsArray()
  @IsNotEmpty()
  attributes: IAttribute[];
}
