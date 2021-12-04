import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Producer } from 'kafkajs';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private order: typeof Order,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.order.create(createOrderDto);
    this.kafkaProducer.send({
      topic: 'payments',
      messages: [{ key: 'payments', value: JSON.stringify(order) }]
    })
    return order;
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
