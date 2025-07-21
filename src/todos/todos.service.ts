import { Injectable , NotFoundException, UseFilters} from '@nestjs/common';
import { HttpExceptionFilter } from '../http-exception.filter';
import { PrismaClient } from 'generated/prisma';
const prisma = new PrismaClient();

@Injectable()
@UseFilters(HttpExceptionFilter)
export class TodosService {


    getAll() {
        return prisma.todo.findMany();
    }

    async getById(id: number) {
        const todo = await prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }
    async add(todo: { title: string; completed: boolean }) {
        const newTodo = await prisma.todo.create({ data: todo });
        return { message: 'Todo added', todo: newTodo };
    }

    async delete(id: number) {
        try {
            await prisma.todo.delete({ where: { id } });
            return { message: 'Todo deleted' };
        } catch (error) {
            throw new NotFoundException('Todo not found');
        }
    }

    async update(id: number, updateData: { title?: string; completed?: boolean }) {
        try {
            const todo = await prisma.todo.update({ where: { id }, data: updateData });
            return { message: 'Todo updated', todo };
        } catch (error) {
            throw new NotFoundException('Todo not found');
        }
    }

}
