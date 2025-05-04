import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { OrderDto } from "./dtos/create.dto";
import { PatchOrderDto } from "./dtos/patch.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: OrderDto, @Req() req: Request) {
    return this.service.create({
      ...createDto,
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchOrderDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
