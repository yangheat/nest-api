import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  // 웹사이트 방문
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcom to my Movie API');
  });
  
  describe('/movies', () => {
    // 전체 조회
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    
    // 생성
    it('POST 201', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test Title',
        year: 2021,
        genres: ['test']
      })
      .expect(201);
    });

    // 잘못된 어보로 생성
    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test Title',
        year: 2021,
        genres: ['test'],
        other: 'thing'
      })
      .expect(400);
    });

    // 모두 삭제
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    });
  });

  describe('/movies/:id', () => {
    // 한 개 조회
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });

    // 존재하지 않는 정보 조회
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    })

    // 업데이트
    it('PATCH', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .send({ title: 'Update Test' })
      .expect(200);
    });

    // 삭제
    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    });
  });
});
