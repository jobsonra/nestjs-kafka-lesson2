import { Module } from '@nestjs/common';
import { join } from 'path/posix';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    OrdersModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'database.sqlite'),
      models: [Order],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
