import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "src/products/products.service";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CartItem } from "./cart-item.entity";
import { Cart } from "./cart.entity";
import { CartDto } from "./dtos/create.dto";
import { PatchCartDto } from "./dtos/patch.dto";

@Injectable()
export class CartService
  extends BaseService<Cart, CartDto, PatchCartDto>
  implements ICrudService<Cart, CartDto, PatchCartDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Cart)
    repository: Repository<Cart>,
    @InjectRepository(CartItem)
    private productService: ProductService,
  ) {
    super(repository, apiFeaturesService);
  }

  override async create(createDto: CartDto) {
    return this.repository.manager.transaction(async manager => {
      const cart = await manager.save(Cart, { total: 0 });

      const productIds = createDto.cartItems.map(item => item.productId);
      const { data: products } = await this.productService.findAll({ id: productIds });

      const cartItems = await Promise.all(
        createDto.cartItems
          .filter(item => products.some(p => p.id === item.productId))
          .map(async item => {
            const product = products.find(p => p.id === item.productId);
            return manager.save(CartItem, {
              cart,
              product,
              quantity: item.quantity,
            });
          }),
      );

      const total = cartItems.reduce(
        (sum, item) => sum + item.product.sku.price * item.quantity,
        0,
      );

      const updatedCart = await manager.save(Cart, {
        ...cart,
        total,
      });

      return updatedCart;
    });
  }
}
