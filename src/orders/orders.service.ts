import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private order: typeof Order) {}

  create(createOrderDto: CreateOrderDto) {
    return this.order.create(createOrderDto);
  }

  findAll() {
    return this.order.findAll();
  }

  findOne(id: string) {
    return this.order.findByPk(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.order.findByPk(id);
    if (order) {
      return order.update(updateOrderDto);
    }
  }

  async remove(id: string) {
    const order = await this.order.findByPk(id);
    if (order) {
      return order.destroy();
    }
  }
}
