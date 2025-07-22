import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from "@nestjs/common";
import { Roles } from "../shared/decorators/roles.decorator";
import { Role } from "../shared/enum/global-enum";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("stats")
  @Roles(Role.SUPER_ADMIN, Role.SALES_DIRECTOR, Role.OPERATIONS_DIRECTOR, Role.STORE_MANAGER)
  async getDashboardStats(@Query("date") date?: string) {
    return {
      data: await this.dashboardService.getDashboardStats(date),
    };
  }

  @Get("recent-orders")
  @Roles(Role.SUPER_ADMIN, Role.SALES_DIRECTOR, Role.OPERATIONS_DIRECTOR, Role.ORDER_MANAGER)
  async getRecentOrders(@Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number) {
    return {
      data: await this.dashboardService.getRecentOrders(limit),
    };
  }
}
