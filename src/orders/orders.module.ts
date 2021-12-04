import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-group-consumer'
          }
        }
      }]
    )
],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async(kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE']
    }
  ],
})
export class OrdersModule {}
