import { Injectable , NotFoundException, UseFilters} from '@nestjs/common';
import { HttpExceptionFilter } from '../http-exception.filter';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class TodosService {

    private todos = [
        { id: 1, title: 'Todo 1', completed: false },
        { id: 2, title: 'Todo 2', completed: true },
    ];

    getAll() {
        return this.todos;
    }

    getById(id: number) {
        const todo = this.todos.find(t => t.id === Number(id));
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }
    add(todo: { title: string; completed: boolean }) {
        const newTodo = {
            id: this.todos.length + 1,
            ...todo,
        };
        this.todos.push(newTodo);
        return { message: 'Todo added', todo: newTodo };
    }

    delete(id: number) {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(t => t.id !== Number(id));
        if (this.todos.length === initialLength) {
            throw new NotFoundException('Todo not found');
        }
        return { message: 'Todo deleted' };
    }

    update(id: number, updateData: { title?: string; completed?: boolean }) {
        const todo = this.todos.find(t => t.id === Number(id));
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        if (updateData.title !== undefined) todo.title = updateData.title;
        if (updateData.completed !== undefined) todo.completed = updateData.completed;
        return { message: 'Todo updated', todo };
    }

}
