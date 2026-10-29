import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  it('GET / returns the welcome message', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('supports todo CRUD operations', async () => {
    const server = app.getHttpServer();
    const created = await request(server)
      .post('/todos')
      .send({ title: 'belajar CI/CD' })
      .expect(201);

    expect(created.body).toEqual({
      id: 1,
      title: 'belajar CI/CD',
      done: false,
    });

    await request(server).get('/todos').expect(200).expect([created.body]);
    await request(server).get('/todos/1').expect(200).expect(created.body);

    await request(server)
      .patch('/todos/1')
      .send({ done: true })
      .expect(200)
      .expect({ id: 1, title: 'belajar CI/CD', done: true });

    await request(server).delete('/todos/1').expect(204);
    await request(server).get('/todos').expect(200).expect([]);
  });

  it('rejects a todo without a title', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({})
      .expect(400);
  });

  it('rejects an invalid done value', async () => {
    await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'belajar CI/CD' })
      .expect(201);

    return request(app.getHttpServer())
      .patch('/todos/1')
      .send({ done: 'true' })
      .expect(400);
  });

  it('returns 404 when a todo does not exist', () => {
    return request(app.getHttpServer()).get('/todos/1').expect(404);
  });

  afterEach(async () => {
    await app.close();
  });
});
