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
  });

  it('getAll should return initial todos', () => {
    const todos = service.getAll();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBe(2);
    expect(todos[0]).toEqual({ id: 1, title: 'Todo 1', completed: false });
    expect(todos[1]).toEqual({ id: 2, title: 'Todo 2', completed: true });
  });

  it('getAll should return updated todos after adding a new todo', () => {
    service.add({ title: 'Todo 3', completed: false });
    const todos = service.getAll();
    expect(todos.length).toBe(3);
    expect(todos[2]).toEqual({ id: 3, title: 'Todo 3', completed: false });
  });

  it('getAll should return updated todos after deleting a todo', () => {
    service.delete(1);
    const todos = service.getAll();
    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual({ id: 2, title: 'Todo 2', completed: true });
  });

  it('getAll should return empty array after deleting all todos', () => {
    service.delete(1);
    service.delete(2);
    const todos = service.getAll();
    expect(todos.length).toBe(0);
    expect(todos).toEqual([]);
  });
  it('getById should return the correct todo for existing id', () => {
    const todo = service.getById(1);
    expect(todo).toEqual({ id: 1, title: 'Todo 1', completed: false });
  });
  it('getById should throw NotFoundException for non-existing id', () => {
    expect(() => service.getById(999)).toThrowError('Todo not found');
  });
  it('getById should return newly added todo', () => {
    service.add({ title: 'Todo 3', completed: false });
    const todo = service.getById(3);
    expect(todo).toEqual({ id: 3, title: 'Todo 3', completed: false });
  });
});
