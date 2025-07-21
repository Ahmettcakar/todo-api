import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  // Prisma Client'ı testte kullanmak için import et
  const { PrismaClient } = require('generated/prisma');
  const prisma = new PrismaClient();
  });

  it('getAll should return initial todos', async () => {
    const todos = await service.getAll();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe('Todo 1');
    expect(todos[1].title).toBe('Todo 2');
  });

  it('getAll should return updated todos after adding a new todo', async () => {
    await service.add({ title: 'Todo 3', completed: false });
    const todos = await service.getAll();
    expect(todos.length).toBe(3);
    expect(todos[2].title).toBe('Todo 3');
    expect(todos[2].completed).toBe(false);
  });

  it('getAll should return updated todos after deleting a todo', async () => {
    await service.delete(1);
    const todos = await service.getAll();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('Todo 2');
    expect(todos[0].completed).toBe(true);
  });

  it('getAll should return empty array after deleting all todos', async () => {
    await service.delete(1);
    await service.delete(2);
    const todos = await service.getAll();
    expect(todos.length).toBe(0);
    expect(todos).toEqual([]);
  });
  it('getById should return the correct todo for existing id', async () => {
    const todo = await service.getById(1);
    expect(todo.title).toBe('Todo 1');
    expect(todo.completed).toBe(false);
  });
  it('getById should throw NotFoundException for non-existing id', async () => {
    await expect(service.getById(999)).rejects.toThrowError('Todo not found');
  });
  it('getById should return newly added todo', async () => {
    await service.add({ title: 'Todo 3', completed: false });
    const todo = await service.getById(3);
    expect(todo.title).toBe('Todo 3');
    expect(todo.completed).toBe(false);
  });
});
