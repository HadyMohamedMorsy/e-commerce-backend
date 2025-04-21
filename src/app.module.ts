import { CacheModule } from "@nestjs/cache-manager";
import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AddressModule } from "./address/address.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import jwtConfig from "./auth/config/jwt.config";
import { CartModule } from "./carts/carts.module";
import { CategoryModule } from "./categories/category.module";
import { SubCategoryModule } from "./categories/sub-categories/sub-category.module";
import { ContactModule } from "./contact/contact.module";
import { FaqModule } from "./faq/faq.module";
import { OrderModule } from "./orders/order.module";
import { ProductModule } from "./products/products.module";
import appConfig from "./shared/config/app.config";
import databaseConfig from "./shared/config/database.config";
import { FilterDateModule } from "./shared/filters/filter-date.module";
import { APIFeaturesService } from "./shared/filters/filter.service";
import { UploadsModule } from "./shared/global-api/uploads/uploads.module";
import { TransformInterceptor } from "./shared/interceptor/transform-response.interceptor";
import { ListModule } from "./shared/list/list.module";
import { LanMiddleware } from "./shared/middleware/lang.middleware";
import { UserMiddleware } from "./shared/middleware/user.middleware";
import enviromentValidation from "./shared/validations/env.validation";
import { UserModule } from "./users/users.module";
import { WishlistsModule } from "./wishlist/wishlists.module";

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    UploadsModule,
    FilterDateModule,
    UserModule,
    CartModule,
    FaqModule,
    OrderModule,
    ContactModule,
    AddressModule,
    ProductModule,
    ListModule,
    WishlistsModule,
    CategoryModule,
    SubCategoryModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    CacheModule.register({
      ttl: 5000,
      max: 10,
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env.development', '.env'],
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        database: configService.get("database.name"),
        username: configService.get("database.user"),
        password: configService.get("database.password"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [
    APIFeaturesService,
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
    // AccessTokenGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanMiddleware).forRoutes("*");
    consumer
      .apply(UserMiddleware)
      .exclude({ path: "auth/login", method: RequestMethod.ALL })
      .forRoutes(
        { path: "*/store", method: RequestMethod.POST },
        { path: "*/update", method: RequestMethod.POST },
      );
  }
}
