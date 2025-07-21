import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Todos E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /todos should return all todos', async () => {
    return request(app.getHttpServer())
      .get('/todos')
      .set('x-api-key', '12345')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
      });
  });

  it('POST /todos should add a new todo', async () => {
    return request(app.getHttpServer())
      .post('/todos')
      .set('x-api-key', '12345')
      .send({ title: 'E2E Todo', completed: false })
      .expect(201)
      .expect(res => {
        expect(res.body.todo.title).toBe('E2E Todo');
        expect(res.body.todo.completed).toBe(false);
      });
  });

  it('GET /todos/:id should return a todo', async () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .set('x-api-key', '12345')
      .expect(200)
      .expect(res => {
        expect(res.body.id).toBe(1);
      });
  });

  it('GET /todos/:id with wrong id should return 404', async () => {
    return request(app.getHttpServer())
      .get('/todos/999')
      .set('x-api-key', '12345')
      .expect(404)
      .expect(res => {
        expect(res.body.message).toBe('Todo not found');
      });
  });

  it('GET /todos without x-api-key should return 403', async () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(403)
      .expect(res => {
        expect(res.body.message).toBe('Forbidden resource');
      });
  });
});
