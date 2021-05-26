import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사
  app.useGlobalPipes(new ValidationPipe({
    // 화이트리스트만 저장
    whitelist: true,
    // 화이트리스트가 아니면 HrrpException 즉, request 자체를 막아버림
    forbidNonWhitelisted:true,
    // Request URL은 항상 string인데 사용자가 원하는 타입으로 변경해줌
    transform: true,
  }))
  await app.listen(3000);
}
bootstrap();
