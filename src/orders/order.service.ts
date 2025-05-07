import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/products.entity";
import { ProductService } from "src/products/products.service";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { OrderDto } from "./dtos/create.dto";
import { PatchOrderDto } from "./dtos/patch.dto";
import { OrderItem } from "./order-item.entity";
import { Order } from "./order.entity";

@Injectable()
export class OrderService
  extends BaseService<Order, OrderDto, PatchOrderDto>
  implements ICrudService<Order, OrderDto, PatchOrderDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Order)
    repository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductService,
  ) {
    super(repository, apiFeaturesService);
  }

  private async prepareOrderItems(
    order: Order,
    orderItems: OrderDto["orderItems"],
    products: Map<number, Product>,
  ) {
    return orderItems.reduce(
      (acc, item) => {
        const product = products.get(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const orderItem = this.orderItemRepository.create({
          order,
          product,
          quantity: item.quantity,
          price: item.price,
        });

        return {
          orderItems: [...acc.orderItems, orderItem],
          total: acc.total + item.price * item.quantity,
        };
      },
      { orderItems: [], total: 0 },
    );
  }

  override async create(createDto: OrderDto): Promise<Order[]> {
    return this.repository.manager.transaction(async transactionalEntityManager => {
      const order = await transactionalEntityManager.save(Order, {
        ...createDto,
        total: 0,
      });

      const productIds = createDto.orderItems.map(item => item.productId);
      const { data: products } = await this.productService.findAll({ id: productIds });
      const productMap = new Map(products.map(product => [product.id, product]));

      const { orderItems, total } = await this.prepareOrderItems(
        order,
        createDto.orderItems,
        productMap,
      );

      await transactionalEntityManager.save(OrderItem, orderItems);

      const updatedOrder = await transactionalEntityManager.save(Order, {
        ...order,
        total,
      });

      return [updatedOrder];
    });
  }
}
