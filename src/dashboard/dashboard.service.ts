import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { Between, Not, Repository } from "typeorm";
import { OrderItem } from "../orders/order-item.entity";
import { Order } from "../orders/order.entity";
import { Product } from "../products/products.entity";
import { Review } from "../reviews/review.entity";
import { OrderStatus } from "../shared/enum/global-enum";
import { User } from "../users/user.entity";

export interface DashboardStats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalReviews: number;
  todayOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrdersPerDay: number;
}

export interface DashboardStatItem {
  title: string;
  value: number;
  icon: string;
  color: string;
  trend: number;
  trendText: string;
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async getDashboardStats(date?: string): Promise<DashboardStatItem[]> {
    const targetDate = date ? moment(date, "YYYY-MM-DD") : moment();
    const startDate = targetDate.clone().startOf("day");
    const endDate = targetDate.clone().add(29, "days").endOf("day"); // 30 days total
    const previousStartDate = startDate.clone().subtract(30, "days");
    const previousEndDate = startDate.clone().subtract(1, "day").endOf("day");

    const [
      totalCustomers,
      totalProducts,
      totalReviews,
      periodOrders,
      completedOrders,
      totalRevenue,
    ] = await Promise.all([
      this.userRepository
        .createQueryBuilder("user")
        .where("DATE(user.createdAt) >= :startDate", {
          startDate: startDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(user.createdAt) <= :endDate", { endDate: endDate.format("YYYY-MM-DD") })
        .getCount(),
      this.productRepository
        .createQueryBuilder("product")
        .where("DATE(product.createdAt) >= :startDate", {
          startDate: startDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(product.createdAt) <= :endDate", { endDate: endDate.format("YYYY-MM-DD") })
        .getCount(),
      this.reviewRepository
        .createQueryBuilder("review")
        .where("DATE(review.createdAt) >= :startDate", {
          startDate: startDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(review.createdAt) <= :endDate", {
          endDate: endDate.format("YYYY-MM-DD"),
        })
        .getCount(),
      this.orderRepository
        .createQueryBuilder("order")
        .where("DATE(order.createdAt) >= :startDate", {
          startDate: startDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(order.createdAt) <= :endDate", {
          endDate: endDate.format("YYYY-MM-DD"),
        })
        .getCount(),
      this.orderRepository
        .createQueryBuilder("order")
        .where("DATE(order.createdAt) >= :startDate", {
          startDate: startDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(order.createdAt) <= :endDate", {
          endDate: endDate.format("YYYY-MM-DD"),
        })
        .andWhere("order.status = :status", { status: OrderStatus.COMPLETED })
        .getCount(),
      this.orderRepository
        .createQueryBuilder("order")
        .where("DATE(order.createdAt) >= :startDate", {
          startDate: startDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(order.createdAt) <= :endDate", {
          endDate: endDate.format("YYYY-MM-DD"),
        })
        .andWhere("order.status = :status", { status: OrderStatus.COMPLETED })
        .select("COALESCE(SUM(order.total), 0)", "total")
        .getRawOne()
        .then(result => parseInt(result.total) || 0),
    ]);

    const [
      previousPeriodOrders,
      previousCompletedOrders,
      previousCustomers,
      previousProducts,
      previousReviews,
      previousRevenue,
    ] = await Promise.all([
      this.orderRepository
        .createQueryBuilder("order")
        .where("DATE(order.createdAt) >= :startDate", {
          startDate: previousStartDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(order.createdAt) <= :endDate", {
          endDate: previousEndDate.format("YYYY-MM-DD"),
        })
        .getCount(),
      this.orderRepository
        .createQueryBuilder("order")
        .where("DATE(order.createdAt) >= :startDate", {
          startDate: previousStartDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(order.createdAt) <= :endDate", {
          endDate: previousEndDate.format("YYYY-MM-DD"),
        })
        .andWhere("order.status = :status", { status: OrderStatus.COMPLETED })
        .getCount(),
      this.userRepository
        .createQueryBuilder("user")
        .where("DATE(user.createdAt) >= :startDate", {
          startDate: previousStartDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(user.createdAt) <= :endDate", {
          endDate: previousEndDate.format("YYYY-MM-DD"),
        })
        .getCount(),
      this.productRepository
        .createQueryBuilder("product")
        .where("DATE(product.createdAt) >= :startDate", {
          startDate: previousStartDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(product.createdAt) <= :endDate", {
          endDate: previousEndDate.format("YYYY-MM-DD"),
        })
        .getCount(),
      this.reviewRepository
        .createQueryBuilder("review")
        .where("DATE(review.createdAt) >= :startDate", {
          startDate: previousStartDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(review.createdAt) <= :endDate", {
          endDate: previousEndDate.format("YYYY-MM-DD"),
        })
        .getCount(),
      this.orderRepository
        .createQueryBuilder("order")
        .where("DATE(order.createdAt) >= :startDate", {
          startDate: previousStartDate.format("YYYY-MM-DD"),
        })
        .andWhere("DATE(order.createdAt) <= :endDate", {
          endDate: previousEndDate.format("YYYY-MM-DD"),
        })
        .andWhere("order.status = :status", { status: OrderStatus.COMPLETED })
        .select("COALESCE(SUM(order.total), 0)", "total")
        .getRawOne()
        .then(result => parseInt(result.total) || 0),
    ]);

    // Calculate trends
    const calculateTrend = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const customersTrend = calculateTrend(totalCustomers, previousCustomers);
    const productsTrend = calculateTrend(totalProducts, previousProducts);
    const ordersTrend = calculateTrend(periodOrders, previousPeriodOrders);
    const completedTrend = calculateTrend(completedOrders, previousCompletedOrders);
    const reviewsTrend = calculateTrend(totalReviews, previousReviews);
    const revenueTrend = calculateTrend(totalRevenue, previousRevenue);

    return [
      {
        title: "Total Customers",
        value: totalCustomers,
        icon: "pi pi-users",
        color: "#3b82f6",
        trend: customersTrend,
        trendText: `${customersTrend}%`,
      },
      {
        title: "Total Products",
        value: totalProducts,
        icon: "pi pi-box",
        color: "#10b981",
        trend: productsTrend,
        trendText: `${productsTrend}%`,
      },
      {
        title: "Total Orders",
        value: periodOrders,
        icon: "pi pi-shopping-cart",
        color: "#f97316",
        trend: ordersTrend,
        trendText: `${ordersTrend}%`,
      },
      {
        title: "Total Reviews",
        value: totalReviews,
        icon: "pi pi-star",
        color: "#8b5cf6",
        trend: reviewsTrend,
        trendText: `${reviewsTrend}%`,
      },
      {
        title: "Completed Orders",
        value: completedOrders,
        icon: "pi pi-check-circle",
        color: "#059669",
        trend: completedTrend,
        trendText: `${completedTrend}%`,
      },
      {
        title: "Total Revenue",
        value: totalRevenue,
        icon: "pi pi-dollar",
        color: "#dc2626",
        trend: revenueTrend,
        trendText: `${revenueTrend}%`,
      },
    ];
  }

  async getRecentOrders(limit: number = 10) {
    const today = moment().startOf("day");
    const tomorrow = moment().endOf("day");

    return await this.orderRepository.find({
      relations: ["createdBy", "orderItems"],
      where: {
        createdAt: Between(today.toDate(), tomorrow.toDate()),
        status: Not(OrderStatus.COMPLETED),
      },
      order: { createdAt: "DESC" },
      take: limit,
    });
  }
}
