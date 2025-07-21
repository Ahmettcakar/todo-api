import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, UseFilters, NotFoundException} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SimpleAuthGuard } from '../simple-auth.guard';
import { UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from '../logger.interceptor';

@UseInterceptors(LoggerInterceptor)
@Controller('todos')
export class TodosController {

    constructor(private readonly todosService: TodosService) { }
    @UseGuards(SimpleAuthGuard) // SimpleAuthGuard'i kullanarak koruma ekliyoruz
    @Get()
    getAllTodos() {
        return this.todosService.getAll();
    }
    @Post()
    addTodo(@Body()  createTodoDto: CreateTodoDto) {
        // const newTodo = this.todosService.add(createTodoDto);
        return { message: 'Todo added', todo: createTodoDto };
    }

    @Get(':id')
    getTodoById(@Param('id') id: number) {
        const todo = this.todosService.getById(id);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        const deleted = this.todosService.delete(id);
        if (!deleted) {
            throw new NotFoundException('Todo not found');
        }
        return { message: 'Todo deleted' };
    }

    @Patch(':id')
    updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto ) {
        const todo = this.todosService.update(id, updateTodoDto);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return { message: 'Todo updated', todo };
    }


}
