import { IsArray, IsNotEmpty } from "class-validator";
import { Product } from "src/products/products.entity";

export interface IAttribute {
  name: string;
  value: string;
  image: string;
  product: Product;
}

export class AttributeDto {
  @IsArray()
  @IsNotEmpty()
  attributes: IAttribute[];
}
