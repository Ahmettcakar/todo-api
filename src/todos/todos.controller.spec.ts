import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  // Mock service
  const mockTodosService = {
    getAll: jest.fn().mockReturnValue([
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]),
    add: jest.fn().mockReturnValue({ message: 'Todo added', todo: { id: 3, title: 'Todo 3', completed: false } }),
    // Diğer fonksiyonlar için de benzer mocklar eklenebilir
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosService, useValue: mockTodosService }
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll should return todos from service', () => {
    expect(controller.getAllTodos()).toEqual([
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]);
    expect(service.getAll).toHaveBeenCalled();
  });
});