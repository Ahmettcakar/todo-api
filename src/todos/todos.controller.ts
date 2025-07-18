import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SimpleAuthGuard } from 'src/simple-auth.guard';
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
        const newTodo = this.todosService.add(createTodoDto);
        return { message: 'Todo added', todo: newTodo };
    }

    @Get(':id')
    getTodoById(@Param('id') id: number) {
        const todo = this.todosService.getById(id);
        if (!todo) {
            return { message: 'Todo not found' };
        }
        return todo;
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        const deleted = this.todosService.delete(id);
        if (!deleted) {
            return { message: 'Todo not found' };
        }
        return { message: 'Todo deleted' };
    }

    @Patch(':id')
    updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto ) {
        const todo = this.todosService.update(id, updateTodoDto);
        if (!todo) {
            return { message: 'Todo not found' };
        }
        return { message: 'Todo updated', todo };
    }


}
