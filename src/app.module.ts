import { Module, MiddlewareConsumer, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports: [],
  controllers: [AppController, TodosController],
  providers: [AppService, TodosService],
  

})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Apply LoggerMiddleware to all routes
  }
}

